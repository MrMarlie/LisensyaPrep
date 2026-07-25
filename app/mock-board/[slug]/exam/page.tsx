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

  const user = await getExamUser();
  if (!user) redirect(`/mock-board/login?next=/mock-board/${exam.slug}/exam`);

  const access = await checkAccess(user.email, exam.product);
  if (!access.ok) redirect(`/mock-board/${exam.slug}?access=${access.reason}`);

  return <ExamClient examKey={exam.exam} slug={exam.slug} />;
}
