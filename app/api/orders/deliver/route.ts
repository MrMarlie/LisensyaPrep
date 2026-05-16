import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import nodemailer, { type SendMailOptions } from 'nodemailer';
import path from 'path';
import fs from 'fs';

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

  // Send delivery email with PDF
  try {
    const pdfPath = path.join(process.cwd(), 'private', 'deliverables', 'LET-ProfEd-Mastery-System-2026.pdf');
    const attachments: NonNullable<SendMailOptions['attachments']> = [];

    if (fs.existsSync(pdfPath)) {
      attachments.push({
        filename: 'LET-ProfEd-Mastery-System-2026.pdf',
        path: pdfPath,
        contentType: 'application/pdf',
      });
    }

    const transport = mailer();
    await transport.sendMail({
      from: `"LisensyaPrep" <${process.env.EMAIL_USER}>`,
      to: order.email,
      subject: '🎓 Your LET ProfEd Mastery System is here!',
      attachments,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1f2937;">
          <div style="background:#080d1b;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
            <p style="color:#facc15;font-weight:900;font-size:20px;margin:0;">LisensyaPrep</p>
          </div>
          <div style="background:#0f1629;padding:32px;border-radius:0 0 12px 12px;color:#d1d5db;">
            <h1 style="color:#ffffff;font-size:22px;margin-top:0;">Hi ${order.full_name},</h1>
            <p>Your payment is verified — here&apos;s your reviewer!</p>
            <p style="font-size:18px;">📎 <strong style="color:#ffffff;">Attached: LET-ProfEd-Mastery-System-2026.pdf</strong></p>

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
            <p>7-day refund policy: not happy? Just reply to this email.</p>

            <hr style="border-color:#ffffff22;margin:24px 0;">

            <p>Would you share your honest feedback after a week of use? Just reply to this email.</p>
            <p>You&apos;re going to crush this exam. 💪</p>
            <p style="margin-bottom:0;">Alexis<br>Founder, LisensyaPrep<br>
              <a href="https://lisensyaprep.com" style="color:#facc15;">lisensyaprep.com</a> |
              <a href="https://www.facebook.com/LisensyaPrep" style="color:#facc15;">Facebook</a>
            </p>
          </div>
        </div>
      `,
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
