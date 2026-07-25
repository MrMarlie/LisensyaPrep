import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const PROFED_PDF_VIEW = 'https://drive.google.com/file/d/1l1JnsM48Ycz7YIYWI43Rho-ytsP6K_jB/view?usp=sharing';
const PROFED_PDF_DOWNLOAD = 'https://drive.google.com/uc?export=download&id=1l1JnsM48Ycz7YIYWI43Rho-ytsP6K_jB';
const GENED_PDF_VIEW = 'https://drive.google.com/file/d/1nOJyn1-HlS5ut-jBK49vPleNLpQ0tlcX/view?usp=sharing';
const GENED_PDF_DOWNLOAD = 'https://drive.google.com/uc?export=download&id=1nOJyn1-HlS5ut-jBK49vPleNLpQ0tlcX';

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

function mailer() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, pack, trigger } = body;

    if (!name?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }
    if (!['profed', 'gened'].includes(pack)) {
      return NextResponse.json({ error: 'Invalid pack type.' }, { status: 400 });
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

    if (ip !== 'unknown') {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const { count } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .eq('ip_address', ip)
        .gte('created_at', oneHourAgo);
      if ((count ?? 0) >= 3) {
        return NextResponse.json({ error: 'Too many signups. Try again later.' }, { status: 429 });
      }
    }

    const packTag = pack === 'profed' ? 'let-profed-starter-pack' : 'let-gen-ed-starter-pack';
    const triggerTag = `popup-${trigger ?? 'unknown'}`;

    const { data: existing } = await supabase
      .from('waitlist')
      .select('id, tags')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (!existing) {
      await supabase.from('waitlist').insert({
        name: cleanName,
        email: cleanEmail,
        tags: [packTag, triggerTag],
        source: `popup-${trigger ?? 'unknown'}`,
        ip_address: ip,
      });
    } else {
      const existingTags: string[] = existing.tags ?? [];
      const newTags = Array.from(new Set([...existingTags, packTag, triggerTag]));
      await supabase
        .from('waitlist')
        .update({ tags: newTags, updated_at: new Date().toISOString() })
        .eq('email', cleanEmail);
    }

    const isProfed = pack === 'profed';
    const pdfViewUrl = isProfed ? PROFED_PDF_VIEW : GENED_PDF_VIEW;
    const pdfDownloadUrl = isProfed ? PROFED_PDF_DOWNLOAD : GENED_PDF_DOWNLOAD;
    const subject = isProfed
      ? '🎁 Your LET ProfEd Starter Pack is here!'
      : '🎁 Your LET Gen Ed Starter Pack is here!';
    const packTitle = isProfed ? 'LET ProfEd Starter Pack 2026' : 'LET Gen Ed Starter Pack 2026';
    const masteryHref = isProfed
      ? 'https://lisensyaprep.com/premium/let-profed-mastery'
      : 'https://lisensyaprep.com/premium/let-gen-ed-mastery';
    const masteryLabel = isProfed ? 'ProfEd' : 'Gen Ed';

    try {
      await mailer().sendMail({
        from: `"LisensyaPrep" <${process.env.EMAIL_USER}>`,
        to: cleanEmail,
        subject,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#080d1b;border-radius:12px;overflow:hidden;">
            <div style="background:#080d1b;padding:24px 32px;text-align:center;border-bottom:1px solid #1e293b;">
              <p style="color:#facc15;font-weight:900;font-size:22px;margin:0;">LisensyaPrep</p>
              <p style="color:#64748b;font-size:13px;margin:4px 0 0;">Your LET preparation partner</p>
            </div>
            <div style="padding:32px;color:#d1d5db;">
              <h1 style="color:#ffffff;font-size:22px;margin:0 0 8px;">Hi ${cleanName},</h1>
              <p style="margin:0 0 20px;">Here's your free Starter Pack!</p>
              <div style="background:#0f1629;border:2px solid #facc15;border-radius:12px;padding:24px;text-align:center;margin:0 0 24px;">
                <p style="color:#facc15;font-weight:700;font-size:16px;margin:0 0 16px;">📥 ${packTitle}</p>
                <a href="${pdfViewUrl}" style="display:inline-block;background:#facc15;color:#111827;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:15px;">Open / Download PDF</a>
                <p style="color:#475569;font-size:12px;margin:12px 0 0;">Or <a href="${pdfDownloadUrl}" style="color:#94a3b8;">click here for direct download</a></p>
              </div>
              <p style="margin:0 0 16px;">Liked the sample? The full <strong style="color:#ffffff;">${masteryLabel} Mastery System</strong> has 430+ questions with full rationales.</p>
              <a href="${masteryHref}" style="display:inline-block;background:#facc15;color:#111827;font-weight:700;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;margin-bottom:24px;">Get ${masteryLabel} Mastery — ₱149 →</a>
              <p style="margin:0;">Best of luck on your LET,</p>
              <p style="margin:4px 0 0;"><strong style="color:#ffffff;">LisensyaPrep</strong></p>
              <p style="color:#475569;font-size:12px;margin:20px 0 0;border-top:1px solid #1e293b;padding-top:16px;">
                To stop receiving emails, <a href="mailto:${process.env.EMAIL_USER}?subject=Unsubscribe" style="color:#475569;">unsubscribe here</a>.
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Popup freebie email failed (lead saved):', emailErr);
      return NextResponse.json(
        {
          error:
            "You're on the list, but our email system hit a snag and couldn't send your pack. Please message us on Facebook and we'll send it to you right away.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Popup freebie signup error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
