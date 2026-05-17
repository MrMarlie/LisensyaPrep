import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const PRODUCT = 'bundle';
const AMOUNT = 399;

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

function generateOrderId() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `LSN-BN-${Date.now()}-${rand}`;
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
    const { fullName, email, gcashRef, paymentDate, phone, referralSource } = body;

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

    const { error: dbError } = await supabase.from('orders').insert({
      order_id: orderId,
      full_name: fullName,
      email,
      gcash_ref: gcashRef.trim(),
      payment_date: paymentDate,
      phone: phone || null,
      referral_source: referralSource,
      status: 'pending',
      amount: AMOUNT,
      product: PRODUCT,
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Failed to save order. Please try again.' }, { status: 500 });
    }

    try {
      const transport = mailer();
      const orderDate = new Date().toLocaleDateString('en-PH', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
      });

      await transport.sendMail({
        from: `"LisensyaPrep Orders" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `🎁 New Bundle Order — ${orderId} — ${fullName}`,
        html: `
          <h2>New Bundle Mastery Order</h2>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Product:</strong> LET Mastery Bundle (ProfEd + Gen Ed)</p>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>GCash Ref:</strong> ${gcashRef}</p>
          <p><strong>Payment Date:</strong> ${paymentDate}</p>
          <p><strong>Amount:</strong> ₱${AMOUNT}</p>
          <p><strong>Phone:</strong> ${phone || '—'}</p>
          <p><strong>Referral:</strong> ${referralSource}</p>
          <p><strong>Received at:</strong> ${orderDate}</p>
          <hr>
          <p><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://lisensyaprep.com'}/admin/orders">Open Admin Dashboard →</a></p>
        `,
      });

      await transport.sendMail({
        from: `"LisensyaPrep" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '✅ Bundle Order Received — LisensyaPrep LET Mastery Bundle',
        html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1f2937;">
            <div style="background:#080d1b;padding:24px;border-radius:12px 12px 0 0;text-align:center;">
              <p style="color:#facc15;font-weight:900;font-size:20px;margin:0;">LisensyaPrep</p>
            </div>
            <div style="background:#0f1629;padding:32px;border-radius:0 0 12px 12px;color:#d1d5db;">
              <h1 style="color:#ffffff;font-size:22px;margin-top:0;">Hi ${fullName},</h1>
              <p>Salamat for going all-in with the LET Mastery Bundle! We&apos;re verifying your GCash payment now.</p>
              <div style="background:#080d1b;border-radius:10px;padding:16px;margin:20px 0;">
                <p style="margin:0 0 8px;font-weight:700;color:#facc15;">Your Order Details</p>
                <p style="margin:4px 0;">Product: LET Mastery Bundle (ProfEd + Gen Ed)</p>
                <p style="margin:4px 0;">Amount: ₱${AMOUNT}</p>
                <p style="margin:4px 0;">Reference Number: ${gcashRef}</p>
                <p style="margin:4px 0;">Order ID: ${orderId}</p>
              </div>
              <p>You saved ₱99 with this bundle — smart move.</p>
              <p><strong style="color:#ffffff;">What happens next:</strong></p>
              <ol style="padding-left:20px;">
                <li style="margin-bottom:8px;">We verify your payment (usually 1–2 hours, 8 AM–10 PM)</li>
                <li style="margin-bottom:8px;">You&apos;ll receive a second email with Google Drive links to BOTH PDFs</li>
                <li>If there&apos;s an issue, we&apos;ll reach out within 4 hours</li>
              </ol>
              <p style="margin-top:24px;">If you don&apos;t receive your PDFs within 12 hours, reply to this email.</p>
              <p>We&apos;re rooting for you. Future teacher! 🎓</p>
              <p style="margin-bottom:0;">LisensyaPrep Team<br>
                <a href="https://lisensyaprep.com" style="color:#facc15;">lisensyaprep.com</a>
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
    console.error('Order submit error:', err);
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 });
  }
}
