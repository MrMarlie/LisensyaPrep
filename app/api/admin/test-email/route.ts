import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import nodemailer from 'nodemailer';

function mailer() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// Admin-only health check: sends a test email to EMAIL_USER (ourselves) so we can
// confirm the Gmail SMTP credentials work without creating a fake order. The real
// SMTP error is surfaced to the admin — this route is auth-gated, so that's safe.
export async function POST() {
  const session = cookies().get('admin_session');
  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const to = process.env.EMAIL_USER;
  if (!to) {
    return NextResponse.json({ error: 'EMAIL_USER is not configured on the server.' }, { status: 500 });
  }

  try {
    await mailer().sendMail({
      from: `"LisensyaPrep" <${to}>`,
      to,
      subject: '✅ LisensyaPrep email test',
      text: `Gmail SMTP is working. Sent ${new Date().toISOString()} from the admin dashboard test button.`,
    });
    return NextResponse.json({ success: true, to });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Test email failed:', err);
    return NextResponse.json({ error: `Send failed: ${message}` }, { status: 502 });
  }
}
