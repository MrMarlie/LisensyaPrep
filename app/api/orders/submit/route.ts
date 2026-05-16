import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

function generateOrderId() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `LSN-${Date.now()}-${rand}`;
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
    const { fullName, email, gcashRef, paymentDate, phone, referralSource } = body;

    // Basic server-side validation
    if (!fullName || !email || !gcashRef || !paymentDate || !referralSource) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    if (!/^\d{13}$/.test(gcashRef.trim())) {
      return NextResponse.json({ error: 'GCash reference must be 13 digits.' }, { status: 400 });
    }

    const orderId = generateOrderId();
    const supabase = supabaseAdmin();

    // Save to Supabase
    const { error: dbError } = await supabase.from('orders').insert({
      order_id: orderId,
      full_name: fullName,
      email,
      gcash_ref: gcashRef.trim(),
      payment_date: paymentDate,
      phone: phone || null,
      referral_source: referralSource,
      status: 'pending',
      amount: 149,
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Failed to save order. Please try again.' }, { status: 500 });
    }

    // Send emails (non-blocking — don't fail the order if email fails)
    try {
      const transport = mailer();
      const orderDate = new Date().toLocaleDateString('en-PH', {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });

      // Notification to admin
      await transport.sendMail({
        from: `"LisensyaPrep Orders" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `🛒 New Order — ${orderId} — ${fullName}`,
        html: `
          <h2>New Order Received</h2>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>GCash Ref:</strong> ${gcashRef}</p>
          <p><strong>Payment Date:</strong> ${paymentDate}</p>
          <p><strong>Phone:</strong> ${phone || '—'}</p>
          <p><strong>Referral:</strong> ${referralSource}</p>
          <p><strong>Received at:</strong> ${orderDate}</p>
          <hr>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://lisensyaprep.com'}/admin/orders">Open Admin Dashboard →</a></p>
        `,
      });

      // Confirmation to customer
      await transport.sendMail({
        from: `"LisensyaPrep" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '✅ Order Received — LisensyaPrep LET ProfEd Mastery System',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1f2937;">
            <div style="background:#080d1b;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
              <p style="color:#facc15;font-weight:900;font-size:20px;margin:0;">LisensyaPrep</p>
            </div>
            <div style="background:#0f1629;padding:32px;border-radius:0 0 12px 12px;color:#d1d5db;">
              <h1 style="color:#ffffff;font-size:22px;margin-top:0;">Hi ${fullName},</h1>
              <p>Thank you for your order! We&apos;re verifying your GCash payment now.</p>

              <div style="background:#080d1b;border-radius:10px;padding:16px;margin:20px 0;">
                <p style="margin:0 0 8px;font-weight:700;color:#facc15;">Your Order Details</p>
                <p style="margin:4px 0;">Product: LET ProfEd Mastery System 2026</p>
                <p style="margin:4px 0;">Amount: ₱149</p>
                <p style="margin:4px 0;">Reference Number: ${gcashRef}</p>
                <p style="margin:4px 0;">Order ID: ${orderId}</p>
              </div>

              <p><strong style="color:#ffffff;">What happens next:</strong></p>
              <ol style="padding-left:20px;">
                <li style="margin-bottom:8px;">We verify your payment in our GCash account (usually 1–2 hours, 8 AM–10 PM)</li>
                <li style="margin-bottom:8px;">You&apos;ll receive a second email with your PDF reviewer attached</li>
                <li>If there&apos;s an issue, we&apos;ll reach out within 4 hours</li>
              </ol>

              <p><strong style="color:#ffffff;">Study while you wait:</strong></p>
              <ul style="padding-left:20px;">
                <li><a href="https://lisensyaprep.com/education/professional-education-reviewer" style="color:#facc15;">Professional Education Reviewer for LET 2026</a></li>
                <li><a href="https://lisensyaprep.com/education/how-to-pass-let-first-take" style="color:#facc15;">How to Pass the LET on Your First Take</a></li>
                <li><a href="https://lisensyaprep.com/education/let-coverage-2026" style="color:#facc15;">LET Coverage 2026 — Complete Guide</a></li>
              </ul>

              <p style="margin-top:24px;">If you don&apos;t receive your PDF within 12 hours, reply to this email.</p>
              <p>Thanks for trusting LisensyaPrep with your LET preparation! 🎓</p>
              <p style="margin-bottom:0;">Alexis<br>Founder, LisensyaPrep</p>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Email sending failed (non-fatal):', emailErr);
    }

    return NextResponse.json({ success: true, orderId });
  } catch (err) {
    console.error('Order submit error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
