import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const PDF_VIEW_URL =
  'https://drive.google.com/file/d/1XLS4KWKH8KlIh2yz8qKwyBwoooOqNYn1/view?usp=sharing';
const PDF_DOWNLOAD_URL =
  'https://drive.google.com/uc?export=download&id=1XLS4KWKH8KlIh2yz8qKwyBwoooOqNYn1';

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

    const { data: existing } = await supabase
      .from('waitlist')
      .select('id, tags')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (!existing) {
      const { error: dbError } = await supabase.from('waitlist').insert({
        name: cleanName,
        email: cleanEmail,
        tags: ['cse-pro-starter-pack', 'waitlist-cse-pro-mastery'],
        source: source || 'direct',
        ip_address: ip,
      });

      if (dbError) {
        console.error('Supabase insert error:', dbError);
        return NextResponse.json({ error: 'Failed to save. Please try again.' }, { status: 500 });
      }
    } else {
      const existingTags: string[] = existing.tags ?? [];
      const newTags = Array.from(new Set([...existingTags, 'cse-pro-starter-pack', 'waitlist-cse-pro-mastery']));
      await supabase
        .from('waitlist')
        .update({ tags: newTags, updated_at: new Date().toISOString() })
        .eq('email', cleanEmail);
    }

    try {
      await mailer().sendMail({
        from: `"LisensyaPrep" <${process.env.EMAIL_USER}>`,
        to: cleanEmail,
        subject: '🎁 Your CSE Professional Starter Pack is here!',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#080d1b;border-radius:12px;overflow:hidden;">
            <div style="background:#080d1b;padding:24px 32px;text-align:center;border-bottom:1px solid #1e293b;">
              <p style="color:#facc15;font-weight:900;font-size:22px;margin:0;">LisensyaPrep</p>
              <p style="color:#64748b;font-size:13px;margin:4px 0 0;">Your Civil Service Exam preparation partner</p>
            </div>
            <div style="padding:32px;color:#d1d5db;">
              <h1 style="color:#ffffff;font-size:22px;margin:0 0 8px;">Hi ${cleanName},</h1>
              <p style="margin:0 0 20px;">Salamat for joining LisensyaPrep! Your free CSE Professional Starter Pack is ready below.</p>

              <div style="background:#0f1629;border:2px solid #facc15;border-radius:12px;padding:24px;text-align:center;margin:0 0 24px;">
                <p style="color:#facc15;font-weight:700;font-size:16px;margin:0 0 16px;">📥 CSE Professional Starter Pack 2026</p>
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
                <li>30 CSE Professional questions with full rationales</li>
                <li>Verbal Ability, Numerical Ability, Analytical Ability, General Information</li>
                <li>Built for the 2026 CSC Table of Specifications</li>
                <li>Full explanations for every answer</li>
              </ul>

              <p style="color:#ffffff;font-weight:700;margin:0 0 8px;">Getting started:</p>
              <ol style="padding-left:20px;margin:0 0 24px;line-height:2;">
                <li>Answer each question BEFORE reading the rationale</li>
                <li>Read EVERY rationale (even when you got it right)</li>
                <li>Share this PDF with fellow CSE takers!</li>
              </ol>

              <div style="background:#1a2035;border:1px solid #facc1540;border-radius:10px;padding:16px;margin:0 0 24px;">
                <p style="color:#facc15;font-weight:700;margin:0 0 6px;">⭐ Ready for the full reviewer?</p>
                <p style="margin:0 0 10px;font-size:13px;line-height:1.6;">The CSE Professional Mastery System (550+ questions, 170-item mock exam, cheat sheets) is now live. First 100 buyers get the ₱199 launch price.</p>
                <a href="https://lisensyaprep.com/premium/cse-pro-mastery" style="color:#facc15;font-weight:700;font-size:13px;">Get the CSE Pro Mastery System →</a>
              </div>

              <div style="background:#1a2035;border:1px solid #facc1540;border-radius:10px;padding:16px;margin:0 0 24px;">
                <p style="color:#facc15;font-weight:700;margin:0 0 6px;">🆕 Also free: CSE SubProfessional Starter Pack</p>
                <p style="margin:0 0 10px;font-size:13px;line-height:1.6;">Targeting a first-level position or know someone who is? Get the SubProf Starter Pack free too.</p>
                <a href="https://lisensyaprep.com/freebies/cse-subprof-starter-pack" style="color:#facc15;font-weight:700;font-size:13px;">Get the SubProf Starter Pack →</a>
              </div>

              <p style="margin:0 0 24px;"><strong style="color:#ffffff;">Pass it forward:</strong><br>
              Got a barkada also taking the CSE? Share the PDF with them — it&apos;s free to share!</p>

              <p style="margin:0;">Best of luck on your CSE journey,</p>
              <p style="margin:4px 0 0;"><strong style="color:#ffffff;">LisensyaPrep</strong></p>
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
    console.error('CSE Pro freebie signup error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
