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

function buildAnnouncementEmail(name: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://lisensyaprep.com';
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#080d1b;border-radius:12px;overflow:hidden;">
      <div style="background:#080d1b;padding:24px 32px;text-align:center;border-bottom:1px solid #1e293b;">
        <p style="color:#facc15;font-weight:900;font-size:22px;margin:0;">LisensyaPrep</p>
        <p style="color:#64748b;font-size:13px;margin:4px 0 0;">Your PNLE preparation partner</p>
      </div>
      <div style="padding:32px;color:#d1d5db;">
        <h1 style="color:#ffffff;font-size:22px;margin:0 0 8px;">Hi ${name},</h1>
        <p style="margin:0 0 20px;line-height:1.7;">
          Good news — the <strong style="color:#ffffff;">PNLE Mastery System 2026 is now available!</strong>
          You signed up for the free PNLE Nursing Starter Pack, so we wanted to make sure you heard first.
        </p>

        <div style="background:#0f1629;border:2px solid #ec4899;border-radius:12px;padding:24px;text-align:center;margin:0 0 24px;">
          <p style="color:#ec4899;font-weight:900;font-size:18px;margin:0 0 6px;">🏥 PNLE Mastery System 2026</p>
          <p style="color:#f9a8d4;font-size:14px;margin:0 0 16px;">300+ Questions · All 6 NLE Subjects · Full Rationales</p>
          <p style="color:#ffffff;font-size:28px;font-weight:900;margin:0 0 16px;">₱199</p>
          <a href="${siteUrl}/premium/pnle-mastery/checkout"
             style="display:inline-block;background:#ec4899;color:#ffffff;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;font-size:16px;">
            Get Your Copy Now →
          </a>
          <p style="color:#475569;font-size:12px;margin:12px 0 0;">Pay via GCash · PDF delivered to your email</p>
        </div>

        <p style="color:#ffffff;font-weight:700;margin:0 0 10px;">What&apos;s inside the Mastery System:</p>
        <ul style="padding-left:20px;margin:0 0 20px;line-height:2.2;color:#d1d5db;">
          <li>300+ PNLE questions across all 6 NLE subjects</li>
          <li>Full 100-item Mock Exam (Part 1 Community Health + Part 2 Clinical)</li>
          <li>12-Week PNLE Study Schedule</li>
          <li>High-Yield Drug Cheat Sheet (Pharmacology)</li>
          <li>Community Health Nursing Quick Reference</li>
          <li>Full rationales for every question — no guessing required</li>
        </ul>

        <div style="background:#0f1629;border-radius:10px;padding:16px;margin:0 0 24px;">
          <p style="color:#ffffff;font-weight:700;margin:0 0 8px;">Subject Coverage:</p>
          <ul style="padding-left:20px;margin:0;line-height:2;font-size:14px;">
            <li>🏘️ Community Health Nursing (~60 questions)</li>
            <li>🩺 Medical-Surgical Nursing (~80 questions)</li>
            <li>🤱 Maternal &amp; Child Nursing (~60 questions)</li>
            <li>🧠 Psychiatric Nursing (~50 questions)</li>
            <li>📋 Fundamentals of Nursing (~30 questions)</li>
            <li>👶 Nursing Jurisprudence &amp; Ethics (~20 questions)</li>
          </ul>
        </div>

        <div style="text-align:center;margin:0 0 24px;">
          <a href="${siteUrl}/premium/pnle-mastery/checkout"
             style="display:inline-block;background:#ec4899;color:#ffffff;font-weight:700;padding:16px 40px;border-radius:10px;text-decoration:none;font-size:16px;">
            GET YOUR COPY — ₱199 →
          </a>
        </div>

        <p style="margin:0 0 4px;">Good luck on your PNLE journey,</p>
        <p style="margin:0;"><strong style="color:#ffffff;">Alexis</strong></p>
        <p style="margin:2px 0 0;color:#64748b;font-size:13px;">Founder, LisensyaPrep</p>

        <p style="color:#475569;font-size:12px;margin:24px 0 0;border-top:1px solid #1e293b;padding-top:16px;">
          You received this because you downloaded the PNLE Nursing Starter Pack from LisensyaPrep.<br>
          To stop receiving emails,
          <a href="mailto:${process.env.EMAIL_USER}?subject=Unsubscribe" style="color:#475569;">unsubscribe here</a>.
        </p>
      </div>
    </div>
  `;
}

export async function POST(_req: NextRequest) {
  const cookieStore = cookies();
  const session = cookieStore.get('admin_session');
  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const supabase = supabaseAdmin();

  const { data: leads, error } = await supabase
    .from('waitlist')
    .select('name, email')
    .contains('tags', ['pnle-nursing-starter-pack']);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

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
        subject: '🏥 PNLE Mastery System is now available — LisensyaPrep',
        html: buildAnnouncementEmail(lead.name),
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
