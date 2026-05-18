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

  // Increment shared First 100 promo counter for LET Mastery products
  const letProducts = ['profed', 'gened', 'bundle'];
  if (letProducts.includes(product) && order.status === 'pending') {
    const { data: promo } = await supabase
      .from('promo_counters')
      .select('claimed, total_slots, active')
      .eq('id', 'let-first-100-shared')
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
        .eq('id', 'let-first-100-shared');
      await supabase.from('promo_audit_log').insert({
        promo_id: 'let-first-100-shared',
        action: 'increment',
        old_value: { claimed: promo.claimed },
        new_value: { claimed: newClaimed },
        performed_by: 'system',
        reason: `Order ${orderId} verified`,
      });
    }
  }
  const profedUrl = process.env.PDF_DOWNLOAD_URL || '';
  const genedUrl = process.env.GEN_ED_PDF_DOWNLOAD_URL || '';

  function buildDeliveryHtml(name: string): string {
    if (product === 'bundle') {
      return `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
          <div style="background:#080d1b;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
            <p style="color:#facc15;font-weight:900;font-size:20px;margin:0;">LisensyaPrep</p>
          </div>
          <div style="background:#0f1629;padding:32px;border-radius:0 0 12px 12px;color:#d1d5db;">
            <h1 style="color:#ffffff;font-size:22px;margin-top:0;">Hi ${name},</h1>
            <p>Salamat for going all-in with the LET Mastery Bundle! Here are your reviewers.</p>
            <div style="background:#facc1520;border:1px solid #facc1540;border-radius:10px;padding:16px;margin:16px 0;text-align:center;">
              <p style="margin:0 0 12px;font-size:16px;font-weight:700;color:#facc15;">📘 LET ProfEd Mastery System</p>
              <a href="${profedUrl}" style="background:#facc15;color:#111827;font-weight:700;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:15px;">DOWNLOAD PROFED PDF →</a>
            </div>
            <div style="background:#4ade8020;border:1px solid #4ade8040;border-radius:10px;padding:16px;margin:16px 0;text-align:center;">
              <p style="margin:0 0 12px;font-size:16px;font-weight:700;color:#4ade80;">📗 LET Gen Ed Mastery System</p>
              <a href="${genedUrl}" style="background:#4ade80;color:#111827;font-weight:700;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:15px;">DOWNLOAD GEN ED PDF →</a>
            </div>
            <p style="font-size:12px;color:#9ca3af;">Links are personal to you. Please do not share them.</p>
            <div style="background:#080d1b;border-radius:10px;padding:16px;margin:20px 0;">
              <p style="margin:0 0 8px;font-weight:700;color:#facc15;">Recommended Study Order</p>
              <ol style="padding-left:20px;margin:0;color:#d1d5db;">
                <li style="margin-bottom:6px;">Start with ProfEd Mastery (foundational teaching theory)</li>
                <li style="margin-bottom:6px;">Move to Gen Ed Mastery (broader academic subjects)</li>
                <li>Take both mock exams in your final 2 weeks</li>
              </ol>
            </div>
            <p>You saved ₱99 with this bundle. Good move.</p>
            <p>We&apos;re rooting for you. Future teacher! 💪</p>
            <p style="margin-bottom:0;">LisensyaPrep Team<br><a href="https://lisensyaprep.com" style="color:#facc15;">lisensyaprep.com</a></p>
          </div>
        </div>
      `;
    }

    if (product === 'gened') {
      return `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
          <div style="background:#080d1b;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
            <p style="color:#facc15;font-weight:900;font-size:20px;margin:0;">LisensyaPrep</p>
          </div>
          <div style="background:#0f1629;padding:32px;border-radius:0 0 12px 12px;color:#d1d5db;">
            <h1 style="color:#ffffff;font-size:22px;margin-top:0;">Hi ${name},</h1>
            <p>Salamat for trusting LisensyaPrep! Your LET Gen Ed Mastery System is ready.</p>
            <div style="background:#4ade8020;border:1px solid #4ade8040;border-radius:10px;padding:16px;margin:16px 0;text-align:center;">
              <p style="margin:0 0 12px;font-size:18px;font-weight:700;color:#4ade80;">📥 Access Your Gen Ed Reviewer</p>
              <a href="${genedUrl}" style="background:#4ade80;color:#111827;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:16px;">OPEN PDF →</a>
              <p style="margin:12px 0 0;font-size:12px;color:#9ca3af;">Link is personal to you. Please do not share it.</p>
            </div>
            <div style="background:#080d1b;border-radius:10px;padding:16px;margin:20px 0;">
              <p style="margin:0 0 8px;font-weight:700;color:#facc15;">What&apos;s Inside</p>
              <ul style="padding-left:20px;margin:0;color:#d1d5db;">
                <li style="margin-bottom:4px;">430+ Gen Ed questions with full rationales</li>
                <li style="margin-bottom:4px;">English, Filipino, Math, Science, Social Sciences</li>
                <li style="margin-bottom:4px;">50-item Mock Exam with rationales</li>
                <li style="margin-bottom:4px;">8-Week Study Schedule</li>
                <li>Quick Reference Cheat Sheet</li>
              </ul>
            </div>
            <p><strong style="color:#ffffff;">Getting Started:</strong></p>
            <ol style="padding-left:20px;">
              <li style="margin-bottom:6px;">Open the PDF and read the &quot;How to Use&quot; section first</li>
              <li style="margin-bottom:6px;">Follow the 8-Week Study Schedule</li>
              <li style="margin-bottom:6px;">Answer every question BEFORE reading the rationale</li>
              <li>Save the Mock Exam for your final prep weeks</li>
            </ol>
            <p><strong style="color:#ffffff;">Important:</strong> This PDF is for your personal use only. Do not share, repost, or resell.</p>
            <hr style="border-color:#ffffff22;margin:24px 0;">
            <p>Good luck on your LET journey, future teacher. 💪</p>
            <p style="margin-bottom:0;">LisensyaPrep Team<br><a href="https://lisensyaprep.com" style="color:#facc15;">lisensyaprep.com</a></p>
          </div>
        </div>
      `;
    }

    // Default: ProfEd
    return `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1f2937;">
        <div style="background:#080d1b;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
          <p style="color:#facc15;font-weight:900;font-size:20px;margin:0;">LisensyaPrep</p>
        </div>
        <div style="background:#0f1629;padding:32px;border-radius:0 0 12px 12px;color:#d1d5db;">
          <h1 style="color:#ffffff;font-size:22px;margin-top:0;">Hi ${name},</h1>
          <p>Your payment is verified — here&apos;s your reviewer!</p>
          <div style="background:#facc1520;border:1px solid #facc1540;border-radius:10px;padding:16px;margin:16px 0;text-align:center;">
            <p style="margin:0 0 12px;font-size:18px;font-weight:700;color:#facc15;">📥 Download Your Reviewer</p>
            <a href="${profedUrl}" style="background:#facc15;color:#111827;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:16px;">DOWNLOAD PDF →</a>
            <p style="margin:12px 0 0;font-size:12px;color:#9ca3af;">Link is personal to you. Please do not share it.</p>
          </div>
          <div style="background:#080d1b;border-radius:10px;padding:16px;margin:20px 0;">
            <p style="margin:0 0 8px;font-weight:700;color:#facc15;">Getting Started</p>
            <ol style="padding-left:20px;margin:0;">
              <li style="margin-bottom:6px;">Start with the Welcome page (Page 4) — how to use this reviewer</li>
              <li style="margin-bottom:6px;">Read the 8-Week Study Schedule (Page 8) — your roadmap</li>
              <li style="margin-bottom:6px;">Focus on Parts 1–3 first — they account for 60% of your score</li>
              <li>Save the Mock Exam (Page 87) for Week 7 — take it timed</li>
            </ol>
          </div>
          <p><strong style="color:#ffffff;">Important:</strong> This PDF is for your personal use only. Please don&apos;t share, repost, or resell.</p>
          <p>This is a digital product. All sales are final once the file has been delivered.</p>
          <hr style="border-color:#ffffff22;margin:24px 0;">
          <p>You&apos;re going to crush this exam. 💪</p>
          <p style="margin-bottom:0;">LisensyaPrep Team<br>
            <a href="https://lisensyaprep.com" style="color:#facc15;">lisensyaprep.com</a> |
            <a href="https://www.facebook.com/LisensyaPrep" style="color:#facc15;">Facebook</a>
          </p>
        </div>
      </div>
    `;
  }

  // Send delivery email with PDF download link
  try {
    const transport = mailer();
    const subject = product === 'bundle'
      ? '🎁 Your LET Mastery Bundle is here!'
      : product === 'gened'
        ? '🎓 Your LET Gen Ed Mastery System is here!'
        : '🎓 Your LET ProfEd Mastery System is here!';

    await transport.sendMail({
      from: `"LisensyaPrep" <${process.env.EMAIL_USER}>`,
      to: order.email,
      subject,
      html: buildDeliveryHtml(order.full_name),
    });

    // Mark as delivered
    await supabase
      .from('orders')
      .update({ status: 'delivered', delivered_at: new Date().toISOString() })
      .eq('order_id', orderId);

    return NextResponse.json({ success: true, status: 'delivered' });
  } catch (emailErr) {
    console.error('Delivery email failed:', emailErr);
    return NextResponse.json({ error: 'Failed to send delivery email.' }, { status: 500 });
  }
}
