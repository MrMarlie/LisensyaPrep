import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { examBySlug, getExamUser, checkAccess } from '@/lib/mockExam';
import ExamClient from './ExamClient';

export const metadata: Metadata = {
  title: 'Mock Board Exam | LisensyaPrep',
  robots: { index: false, follow: false },
};

export default async function ExamRunnerPage({ params }: { params: { slug: string } }) {
  const exam = examBySlug(params.slug);
  if (!exam) redirect('/mock-board');

  // PNLE modules share one hub/landing; LET exams land on their own page.
  const landingSlug = exam.landingSlug || exam.slug;

  const user = await getExamUser();
  if (!user) redirect(`/mock-board/login?next=/mock-board/${exam.slug}/exam`);

  // PNLE modules gate on the umbrella entitlement, LET on the exam product.
  const access = await checkAccess(user.email, exam.accessProduct || exam.product);
  if (!access.ok) redirect(`/mock-board/${landingSlug}?access=${access.reason}`);

  const isPnle = exam.group === 'pnle';
  return (
    <ExamClient
      examKey={exam.exam}
      slug={exam.slug}
      backHref={`/mock-board/${landingSlug}`}
      passPct={Math.round((exam.passMark ?? 0.75) * 100)}
      afterHref={isPnle ? '/mock-board/pnle/results' : undefined}
      afterLabel={isPnle ? 'View combined PNLE results →' : undefined}
    />
  );
}
