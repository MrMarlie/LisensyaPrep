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
