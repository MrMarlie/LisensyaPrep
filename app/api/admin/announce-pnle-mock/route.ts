import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const TAG = 'pnle-nursing-starter-pack';
const PRICE = 99;

function supabaseAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}
function mailer() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
}

function buildEmail(name: string): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://lisensyaprep.com';
  const displayName = name || 'future nurse';
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#080d1b;border-radius:12px;overflow:hidden;">
      <div style="background:#080d1b;padding:24px 32px;text-align:center;border-bottom:1px solid #1e293b;">
        <p style="color:#ec4899;font-weight:900;font-size:22px;margin:0;">LisensyaPrep</p>
        <p style="color:#64748b;font-size:13px;margin:4px 0 0;">Your PNLE preparation partner</p>
      </div>
      <div style="padding:32px;color:#d1d5db;">
        <h1 style="color:#ffffff;font-size:22px;margin:0 0 8px;">Hi ${displayName},</h1>
        <p style="margin:0 0 20px;line-height:1.7;">
          You grabbed our free PNLE Nursing Starter Pack — so you get first dibs on this. We just launched the
          <strong style="color:#ffffff;">PNLE Mock Board Exam</strong>: a real, timed PNLE simulation you take online.
        </p>
        <div style="background:#0f1629;border:2px solid #ec4899;border-radius:12px;padding:24px;text-align:center;margin:0 0 24px;">
          <p style="color:#ec4899;font-weight:900;font-size:18px;margin:0 0 6px;">🏥 PNLE Mock Board — all 5 Nursing Practice modules</p>
          <p style="color:#f9a8d4;font-size:14px;margin:0 0 16px;">500 items · 2 hours per module · shuffled every attempt · full rationales</p>
          <p style="color:#ffffff;font-size:28px;font-weight:900;margin:0 0 16px;">₱${PRICE}</p>
          <a href="${site}/mock-board/pnle" style="display:inline-block;background:#ec4899;color:#ffffff;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:16px;">See the mock board →</a>
          <p style="color:#475569;font-size:12px;margin:12px 0 0;">Pay via GCash · unlimited retakes</p>
        </div>
        <p style="color:#ffffff;font-weight:700;margin:0 0 10px;">Why it beats re-reading notes:</p>
        <ul style="padding-left:20px;margin:0 0 20px;line-height:2;font-size:14px;">
          <li>Five live 2-hour countdowns that auto-submit — practise real PRC exam pressure</li>
          <li>Choices reshuffle each time, so you can&apos;t just memorize letters</li>
          <li>Per-module score, a combined general-average verdict, and a rationale for every item</li>
        </ul>
        <div style="background:#1a0a14;border:1px solid #ec489940;border-radius:10px;padding:14px;margin:0 0 20px;">
          <p style="margin:0;font-size:13px;line-height:1.6;color:#f9a8d4;">⏳ Access runs until <strong>September 30, 2026</strong> — grab it before the PNLE.</p>
        </div>
        <p style="margin:0;">Best of luck on your PNLE journey,</p>
        <p style="margin:4px 0 0;"><strong style="color:#ffffff;">LisensyaPrep</strong></p>
        <p style="color:#475569;font-size:12px;margin:20px 0 0;border-top:1px solid #1e293b;padding-top:16px;">
          You received this because you downloaded the PNLE Nursing Starter Pack from LisensyaPrep.<br>
          To stop receiving emails,
          <a href="mailto:${process.env.EMAIL_USER}?subject=Unsubscribe" style="color:#475569;">unsubscribe here</a>.
        </p>
      </div>
    </div>
  `;
}

export async function POST() {
  const cookieStore = cookies();
  const session = cookieStore.get('admin_session');
  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const supabase = supabaseAdmin();
  const { data: leads, error } = await supabase
    .from('waitlist')
    .select('name, email')
    .contains('tags', [TAG]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!leads || leads.length === 0) {
    return NextResponse.json({ success: true, sent: 0, message: 'No PNLE starter pack subscribers found.' });
  }

  const transport = mailer();
  let sent = 0;
  let failed = 0;
  for (const lead of leads) {
    try {
      await transport.sendMail({
        from: `"LisensyaPrep" <${process.env.EMAIL_USER}>`,
        to: lead.email,
        subject: `🏥 NEW: Take a timed PNLE Mock Board (₱${PRICE}) — LisensyaPrep`,
        html: buildEmail(lead.name),
      });
      sent++;
    } catch (err) {
      console.error(`Failed to send to ${lead.email}:`, err);
      failed++;
    }
  }

  return NextResponse.json({
    success: true,
    total: leads.length,
    sent,
    failed,
    message: `Sent ${sent} of ${leads.length} emails.`,
  });
}
