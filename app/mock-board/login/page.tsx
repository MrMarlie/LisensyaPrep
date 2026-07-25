import { Suspense } from 'react';
import type { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Sign In — Mock Board Exam | LisensyaPrep',
  robots: { index: false, follow: false },
};

export default function MockLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <LoginClient />
    </Suspense>
  );
}
