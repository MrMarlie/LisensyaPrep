import { NextRequest, NextResponse } from 'next/server';
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
        tags: ['waitlist-cse-pro-mastery'],
        source: source || 'direct',
        ip_address: ip,
      });

      if (dbError) {
        console.error('Supabase insert error:', dbError);
        return NextResponse.json({ error: 'Failed to save. Please try again.' }, { status: 500 });
      }
    } else {
      const existingTags: string[] = existing.tags ?? [];
      if (existingTags.includes('waitlist-cse-pro-mastery')) {
        // Already on waitlist — still send confirmation
      } else {
        const newTags = Array.from(new Set([...existingTags, 'waitlist-cse-pro-mastery']));
        await supabase
          .from('waitlist')
          .update({ tags: newTags, updated_at: new Date().toISOString() })
          .eq('email', cleanEmail);
      }
    }

    try {
      await mailer().sendMail({
        from: `"LisensyaPrep" <${process.env.EMAIL_USER}>`,
        to: cleanEmail,
        subject: '🚀 You\'re on the CSE Pro Mastery waitlist!',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#080d1b;border-radius:12px;overflow:hidden;">
            <div style="background:#080d1b;padding:24px 32px;text-align:center;border-bottom:1px solid #1e293b;">
              <p style="color:#facc15;font-weight:900;font-size:22px;margin:0;">LisensyaPrep</p>
              <p style="color:#64748b;font-size:13px;margin:4px 0 0;">Your Civil Service Exam preparation partner</p>
            </div>
            <div style="padding:32px;color:#d1d5db;">
              <h1 style="color:#ffffff;font-size:22px;margin:0 0 8px;">Hi ${cleanName},</h1>
              <p style="margin:0 0 20px;">Salamat for joining the waitlist for our upcoming CSE Professional Mastery System!</p>

              <div style="background:#0f1629;border:2px solid #facc15;border-radius:12px;padding:20px;margin:0 0 24px;">
                <p style="color:#facc15;font-weight:700;margin:0 0 12px;">You&apos;re officially in. Here&apos;s what happens next:</p>
                <ul style="padding-left:20px;margin:0;line-height:2.2;">
                  <li>📧 You&apos;ll get an email the moment we launch</li>
                  <li>💰 Early-bird discount (₱49 OFF launch price for first 7 days)</li>
                  <li>🎁 Free RA 6713 Cheat Sheet at launch</li>
                  <li>📚 First access before public release</li>
                </ul>
              </div>

              <p style="color:#94a3b8;font-size:13px;margin:0 0 24px;">Estimated launch: Q3–Q4 2026. We&apos;re building this carefully — each of the 550+ questions gets a full rationale.</p>

              <div style="background:#1a2035;border:1px solid #facc1540;border-radius:10px;padding:16px;margin:0 0 24px;">
                <p style="color:#facc15;font-weight:700;margin:0 0 6px;">🎁 While you wait — get the free Starter Pack</p>
                <p style="margin:0 0 10px;font-size:13px;line-height:1.6;">We&apos;ve prepared a free 30-question CSE Pro Starter Pack to give you a taste of the quality you&apos;ll get.</p>
                <a href="https://lisensyaprep.com/freebies/cse-pro-starter-pack" style="color:#facc15;font-weight:700;font-size:13px;">Download Free Starter Pack →</a>
              </div>

              <p style="color:#ffffff;font-weight:700;margin:0 0 8px;">What the Mastery System will cover:</p>
              <ul style="padding-left:20px;margin:0 0 24px;line-height:2;">
                <li>📘 Verbal Ability (~100 questions)</li>
                <li>📙 Numerical Ability (~80 questions)</li>
                <li>📊 Analytical Ability (~100 questions)</li>
                <li>📔 General Information (~100 questions)</li>
                <li>✓ Full 170-item Mock Exam</li>
                <li>✓ Quick Reference Cheat Sheets</li>
              </ul>

              <p style="margin:0;">We&apos;re building this carefully. You&apos;re going to love it.</p>
              <p style="margin:8px 0 0;">Questions? Reply to this email.</p>
              <p style="margin:16px 0 0;"><strong style="color:#ffffff;">LisensyaPrep</strong></p>
              <p style="color:#475569;font-size:12px;margin:20px 0 0;border-top:1px solid #1e293b;padding-top:16px;">
                To stop receiving emails,
                <a href="mailto:${process.env.EMAIL_USER}?subject=Unsubscribe" style="color:#475569;">unsubscribe here</a>.
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Waitlist email send failed (lead already saved):', emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('CSE Pro waitlist signup error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
