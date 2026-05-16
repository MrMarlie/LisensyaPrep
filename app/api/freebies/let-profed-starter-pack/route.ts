import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const PDF_VIEW_URL =
  'https://drive.google.com/file/d/1l1JnsM48Ycz7YIYWI43Rho-ytsP6K_jB/view?usp=sharing';
const PDF_DOWNLOAD_URL =
  'https://drive.google.com/uc?export=download&id=1l1JnsM48Ycz7YIYWI43Rho-ytsP6K_jB';

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
  try {
    const body = await req.json();
    const { name, email, source } = body;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = name.trim();
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    const supabase = supabaseAdmin();

    // Rate limiting: max 3 signups per IP per hour
    if (ip !== 'unknown') {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .eq('ip_address', ip)
        .gte('created_at', oneHourAgo);

      if ((count ?? 0) >= 3) {
        return NextResponse.json(
          { error: 'Too many signups from this connection. Please try again later.' },
          { status: 429 },
        );
      }
    }

    // Check for existing email — if found, just resend the PDF
    const { data: existing } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (!existing) {
      const { error: dbError } = await supabase.from('waitlist').insert({
        name: cleanName,
        email: cleanEmail,
        tags: ['let-profed-starter-pack', 'waitlist-mastery-system'],
        source: source || 'direct',
        ip_address: ip,
      });

      if (dbError) {
        console.error('Supabase insert error:', dbError);
        return NextResponse.json({ error: 'Failed to save. Please try again.' }, { status: 500 });
      }
    } else {
      await supabase
        .from('waitlist')
        .update({ updated_at: new Date().toISOString() })
        .eq('email', cleanEmail);
    }

    // Send PDF delivery email (non-blocking — lead is already saved)
    try {
      await mailer().sendMail({
        from: `"LisensyaPrep" <${process.env.EMAIL_USER}>`,
        to: cleanEmail,
        subject: '🎁 Your LET ProfEd Starter Pack is here!',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#080d1b;border-radius:12px;overflow:hidden;">
            <div style="background:#080d1b;padding:24px 32px;text-align:center;border-bottom:1px solid #1e293b;">
              <p style="color:#facc15;font-weight:900;font-size:22px;margin:0;">LisensyaPrep</p>
              <p style="color:#64748b;font-size:13px;margin:4px 0 0;">Your LET preparation partner</p>
            </div>
            <div style="padding:32px;color:#d1d5db;">
              <h1 style="color:#ffffff;font-size:22px;margin:0 0 8px;">Hi ${cleanName},</h1>
              <p style="margin:0 0 20px;">Salamat for joining the LisensyaPrep community! Your free Starter Pack is ready below.</p>

              <div style="background:#0f1629;border:2px solid #facc15;border-radius:12px;padding:24px;text-align:center;margin:0 0 24px;">
                <p style="color:#facc15;font-weight:700;font-size:16px;margin:0 0 16px;">📥 LET ProfEd Starter Pack 2026</p>
                <a href="${PDF_VIEW_URL}"
                   style="display:inline-block;background:#facc15;color:#111827;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:15px;">
                  Open / Download PDF
                </a>
                <p style="color:#475569;font-size:12px;margin:12px 0 0;">
                  Or <a href="${PDF_DOWNLOAD_URL}" style="color:#94a3b8;">click here for direct download</a>
                </p>
              </div>

              <p style="color:#ffffff;font-weight:700;margin:0 0 8px;">What&apos;s inside:</p>
              <ul style="padding-left:20px;margin:0 0 20px;line-height:2;">
                <li>30 LET ProfEd questions with full rationales</li>
                <li>8-Week Study Schedule</li>
                <li>PRC Exam Day Checklist</li>
                <li>Test-Taking Strategies</li>
                <li>Memory hooks (Tagalog) for retention</li>
              </ul>

              <p style="color:#ffffff;font-weight:700;margin:0 0 8px;">Getting started:</p>
              <ol style="padding-left:20px;margin:0 0 24px;line-height:2;">
                <li>Start with the Welcome page (Page 4)</li>
                <li>Read the 8-Week Study Schedule (Page 8)</li>
                <li>Answer each question BEFORE reading the rationale</li>
              </ol>

              <div style="background:#1e3a5f;border-radius:10px;padding:16px;margin:0 0 24px;">
                <p style="color:#93c5fd;font-weight:700;margin:0 0 6px;">You&apos;re on the Waitlist!</p>
                <p style="margin:0;font-size:13px;line-height:1.6;">You&apos;ll be the first to know when the full Mastery System launches — 430+ questions, ₱249 launch price. Waitlist members save ₱50.</p>
              </div>

              <p style="margin:0 0 24px;"><strong style="color:#ffffff;">Pass it forward:</strong><br>
              Got a barkada also taking the LET? Share the PDF with them!</p>

              <p style="margin:0;">Best of luck on your LET journey,</p>
              <p style="margin:4px 0 0;">Alexis<br><strong style="color:#ffffff;">LisensyaPrep</strong></p>
              <p style="color:#475569;font-size:12px;margin:20px 0 0;border-top:1px solid #1e293b;padding-top:16px;">
                P.S. Hit reply if you have questions — we read every email.<br>
                To stop receiving emails,
                <a href="mailto:${process.env.EMAIL_USER}?subject=Unsubscribe" style="color:#475569;">unsubscribe here</a>.
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Email send failed (lead already saved):', emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Freebie signup error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
