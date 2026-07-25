import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

function mailer() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

export async function POST(req: NextRequest) {
  // Admin auth check
  const cookieStore = cookies();
  const session = cookieStore.get('admin_session');
  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { orderId, action } = await req.json();
  if (!orderId) return NextResponse.json({ error: 'orderId required.' }, { status: 400 });

  const supabase = supabaseAdmin();

  if (action === 'refund') {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'refunded' })
      .eq('order_id', orderId);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, status: 'refunded' });
  }

  // Default: verify and deliver
  const { data: order, error: fetchError } = await supabase
    .from('orders')
    .select('*')
    .eq('order_id', orderId)
    .single();

  if (fetchError || !order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
  if (order.status === 'delivered') return NextResponse.json({ error: 'Already delivered.' }, { status: 400 });

  // Mark as verified first
  await supabase.from('orders').update({ status: 'verified', verified_at: new Date().toISOString() }).eq('order_id', orderId);

  // Resolve PDF URLs and email content based on product
  const product = order.product || 'profed';

  // ── Mock Board products: grant timed ONLINE exam access (no PDF, no promo) ──
  if (product === 'mock-gened' || product === 'mock-profed') {
    const examTitle =
      product === 'mock-gened' ? 'LET Gen Ed Mock Board Exam' : 'LET Prof Ed Mock Board Exam';
    const slug = product === 'mock-gened' ? 'let-gened' : 'let-profed';
    const buyerEmail = (order.email || '').toLowerCase();
    const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://lisensyaprep.com';

    const { error: accessErr } = await supabase
      .from('exam_access')
      .upsert(
        { email: buyerEmail, product, order_id: orderId, status: 'active' },
        { onConflict: 'email,product' },
      );
    if (accessErr) {
      console.error('exam_access grant failed:', accessErr);
      return NextResponse.json({ error: 'Failed to grant exam access.' }, { status: 500 });
    }

    try {
      await mailer().sendMail({
        from: `"LisensyaPrep" <${process.env.EMAIL_USER}>`,
        to: order.email,
        subject: `✅ Your ${examTitle} is unlocked!`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
            <div style="background:#080d1b;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
              <p style="color:#facc15;font-weight:900;font-size:20px;margin:0;">LisensyaPrep</p>
            </div>
            <div style="background:#0f1629;padding:32px;border-radius:0 0 12px 12px;color:#d1d5db;">
              <h1 style="color:#ffffff;font-size:22px;margin-top:0;">Hi ${order.full_name},</h1>
              <p>Your payment is verified and your <strong style="color:#ffffff;">${examTitle}</strong> is now unlocked. 🎉</p>
              <div style="background:#1a150a;border:1px solid #facc1540;border-radius:10px;padding:16px;margin:20px 0;">
                <p style="color:#facc15;font-weight:700;margin:0 0 6px;">How to start (important):</p>
                <ol style="margin:0;padding-left:18px;line-height:1.9;font-size:14px;">
                  <li>Go to <a href="${site}/mock-board/login" style="color:#facc15;">${site}/mock-board/login</a></li>
                  <li>Sign in with <strong style="color:#ffffff;">this exact email (${buyerEmail})</strong> — your access is tied to it</li>
                  <li>Open the link we email you, then hit <strong>Start / Resume Exam</strong></li>
                </ol>
              </div>
              <p style="font-size:14px;line-height:1.7;">It&apos;s a real 150-item, 180-minute timed simulation. No feedback during the test — full rationales unlock the moment you submit. Retake as many times as you want; it reshuffles every attempt.</p>
              <p style="color:#94a3b8;font-size:13px;">Access runs until <strong>October 1, 2026</strong>.</p>
              <a href="${site}/mock-board/${slug}/exam" style="display:inline-block;background:#facc15;color:#111827;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;font-size:15px;margin-top:8px;">Go to my exam →</a>
              <p style="margin:24px 0 0;">Good luck! 💪<br><strong style="color:#ffffff;">LisensyaPrep Team</strong></p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Mock access email failed (access already granted):', emailErr);
    }

    await supabase
      .from('orders')
      .update({ status: 'delivered', delivered_at: new Date().toISOString() })
      .eq('order_id', orderId);

    return NextResponse.json({ success: true, status: 'delivered' });
  }

  // Maps each product to the shared promo counter it counts toward.
  const counterMap: Record<string, string> = {
    profed: 'let-first-100-shared',
    gened: 'let-first-100-shared',
    bundle: 'let-first-100-shared',
    'pnle-mastery': 'pnle-first-100-shared',
    'cle-mastery': 'cle-first-100-shared',
    'agri-mastery': 'agri-first-100-shared',
    'mtle-mastery': 'mtle-first-100-shared',
  };

  // Count this buyer exactly once, only after the order is truly delivered.
  // The early return above guarantees the order was not already delivered,
  // so this runs once per order — no double-counting on delivery retries.
  async function incrementPromoCounter() {
    const promoId = counterMap[product];
    if (!promoId) return;
    const { data: promo } = await supabase
      .from('promo_counters')
      .select('claimed, total_slots, active')
      .eq('id', promoId)
      .single();
    if (promo && promo.active && promo.claimed < promo.total_slots) {
      const newClaimed = promo.claimed + 1;
      await supabase
        .from('promo_counters')
        .update({
          claimed: newClaimed,
          updated_at: new Date().toISOString(),
          active: newClaimed < promo.total_slots,
        })
        .eq('id', promoId);
      await supabase.from('promo_audit_log').insert({
        promo_id: promoId,
        action: 'increment',
        old_value: { claimed: promo.claimed },
        new_value: { claimed: newClaimed },
        performed_by: 'system',
        reason: `Order ${orderId} delivered`,
      });
    }
  }

  // Profession-specific sign-off for the confirmation email, keyed by product.
  const signOffMap: Record<string, string> = {
    profed: 'future teacher',
    gened: 'future teacher',
    bundle: 'future teacher',
    'pnle-mastery': 'future nurse',
    'cle-mastery': 'future criminologist',
    'agri-mastery': 'future agriculturist',
    'mtle-mastery': 'future medical technologist',
  };

  function buildThankYouHtml(name: string): string {
    const signOff = signOffMap[product] || 'future professional';
    return `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
        <div style="background:#080d1b;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
          <p style="color:#facc15;font-weight:900;font-size:20px;margin:0;">LisensyaPrep</p>
        </div>
        <div style="background:#0f1629;padding:32px;border-radius:0 0 12px 12px;color:#d1d5db;">
          <h1 style="color:#ffffff;font-size:22px;margin-top:0;">Hi ${name},</h1>
          <p>Your payment has been verified — thank you for your order! 🎉</p>
          <p>We&apos;ll be reaching out to you shortly to share your materials. Please keep an eye on your inbox (and check your spam folder just in case).</p>
          <p>We&apos;re rooting for you, ${signOff}. 💪</p>
          <hr style="border-color:#ffffff22;margin:24px 0;">
          <p style="margin-bottom:0;">LisensyaPrep Team<br>
            <a href="https://lisensyaprep.com" style="color:#facc15;">lisensyaprep.com</a> |
            <a href="https://www.facebook.com/LisensyaPrep" style="color:#facc15;">Facebook</a>
          </p>
        </div>
      </div>
    `;
  }

  try {
    const transport = mailer();
    await transport.sendMail({
      from: `"LisensyaPrep" <${process.env.EMAIL_USER}>`,
      to: order.email,
      subject: '✅ Your LisensyaPrep order is confirmed!',
      html: buildThankYouHtml(order.full_name),
    });

    // Mark as delivered
    await supabase
      .from('orders')
      .update({ status: 'delivered', delivered_at: new Date().toISOString() })
      .eq('order_id', orderId);

    // Now that delivery succeeded, count the buyer toward the promo (exactly once).
    await incrementPromoCounter();

    return NextResponse.json({ success: true, status: 'delivered' });
  } catch (emailErr) {
    console.error('Delivery email failed:', emailErr);
    return NextResponse.json({ error: 'Failed to send delivery email.' }, { status: 500 });
  }
}
