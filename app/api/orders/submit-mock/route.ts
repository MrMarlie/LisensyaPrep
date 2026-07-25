import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const PRICE = 99;

const EXAMS: Record<string, { product: string; title: string }> = {
  gened: { product: 'mock-gened', title: 'LET Gen Ed Mock Board Exam' },
  profed: { product: 'mock-profed', title: 'LET Prof Ed Mock Board Exam' },
};

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

function generateOrderId() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `LSN-MB-${Date.now()}-${rand}`;
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
    const { exam, fullName, email, gcashRef, paymentDate, phone, referralSource } = body;

    const cfg = EXAMS[exam];
    if (!cfg) return NextResponse.json({ error: 'Unknown exam.' }, { status: 400 });
    if (!fullName || !email || !gcashRef || !paymentDate || !referralSource) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    if (!/^\d{13}$/.test(gcashRef.trim())) {
      return NextResponse.json({ error: 'GCash reference must be 13 digits.' }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const orderId = generateOrderId();
    const supabase = supabaseAdmin();

    const { error: dbError } = await supabase.from('orders').insert({
      order_id: orderId,
      full_name: fullName,
      email: cleanEmail,
      gcash_ref: gcashRef.trim(),
      payment_date: paymentDate,
      phone: phone || null,
      referral_source: referralSource,
      status: 'pending',
      amount: PRICE,
      product: cfg.product,
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Failed to save order. Please try again.' }, { status: 500 });
    }

    try {
      const transport = mailer();
      const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://lisensyaprep.com';
      const orderDate = new Date().toLocaleDateString('en-PH', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
      });

      // Admin notification
      await transport.sendMail({
        from: `"LisensyaPrep Orders" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `🧪 New Mock Board Order — ${orderId} — ${fullName}`,
        html: `
          <h2>New Mock Board Order</h2>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Product:</strong> ${cfg.title} (${cfg.product})</p>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email (grant access to THIS email):</strong> ${cleanEmail}</p>
          <p><strong>GCash Ref:</strong> ${gcashRef}</p>
          <p><strong>Payment Date:</strong> ${paymentDate}</p>
          <p><strong>Amount:</strong> ₱${PRICE}</p>
          <p><strong>Phone:</strong> ${phone || '—'}</p>
          <p><strong>Referral:</strong> ${referralSource}</p>
          <p><strong>Received:</strong> ${orderDate}</p>
          <hr>
          <p>Verifying in Admin will auto-grant Mock Board access to this email (expires Oct 1).</p>
          <p><a href="${site}/admin/orders">Open Admin Dashboard →</a></p>
        `,
      });

      // Buyer confirmation — stresses the login-email requirement
      await transport.sendMail({
        from: `"LisensyaPrep" <${process.env.EMAIL_USER}>`,
        to: cleanEmail,
        subject: `✅ Order Received — ${cfg.title}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
            <div style="background:#080d1b;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
              <p style="color:#facc15;font-weight:900;font-size:20px;margin:0;">LisensyaPrep</p>
            </div>
            <div style="background:#0f1629;padding:32px;border-radius:0 0 12px 12px;color:#d1d5db;">
              <h1 style="color:#ffffff;font-size:22px;margin-top:0;">Hi ${fullName},</h1>
              <p>Thanks for your order! We&apos;re verifying your GCash payment now.</p>
              <div style="background:#080d1b;border-radius:10px;padding:16px;margin:20px 0;">
                <p style="margin:0 0 8px;font-weight:700;color:#facc15;">Your Order</p>
                <p style="margin:4px 0;">Product: ${cfg.title}</p>
                <p style="margin:4px 0;">Amount: ₱${PRICE}</p>
                <p style="margin:4px 0;">Reference: ${gcashRef}</p>
                <p style="margin:4px 0;">Order ID: ${orderId}</p>
              </div>
              <div style="background:#1a150a;border:1px solid #facc1540;border-radius:10px;padding:16px;margin:20px 0;">
                <p style="color:#facc15;font-weight:700;margin:0 0 6px;">⚠️ Important — how you&apos;ll access it</p>
                <p style="margin:0;font-size:14px;line-height:1.7;">
                  Once we verify your payment, your Mock Board unlocks online (not a PDF). You&apos;ll sign in with a
                  one-tap email link — you MUST use <strong style="color:#ffffff;">this exact email (${cleanEmail})</strong>,
                  because your access is tied to it.
                </p>
              </div>
              <p><strong style="color:#ffffff;">What happens next:</strong></p>
              <ol style="padding-left:20px;line-height:1.9;">
                <li>We verify your GCash payment (usually 1–2 hours, 8 AM–10 PM)</li>
                <li>You get a &ldquo;access is live&rdquo; email</li>
                <li>Go to <a href="${site}/mock-board/login" style="color:#facc15;">${site}/mock-board/login</a>, sign in with ${cleanEmail}, and start your timed 150-item exam</li>
              </ol>
              <p style="color:#94a3b8;font-size:13px;">Access runs until <strong>October 1, 2026</strong>. Unlimited retakes — questions reshuffle every time.</p>
              <p style="margin-bottom:0;">LisensyaPrep Team<br>
                <a href="${site}" style="color:#facc15;">lisensyaprep.com</a>
              </p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Email sending failed (non-fatal):', emailErr);
    }

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    console.error('Mock order submit error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
