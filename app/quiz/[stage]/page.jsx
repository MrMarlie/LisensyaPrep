import { notFound } from 'next/navigation';
import QuizEngine from '@/components/quiz/QuizEngine';
import { MODULE_INFO, initQuizState } from '@/lib/quizEngine';
import { buildMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  return Object.keys(MODULE_INFO).map((id) => ({ stage: id }));
}

export async function generateMetadata({ params }) {
  const mod = MODULE_INFO[params.stage];
  if (!mod) return {};
  return buildMetadata({
    title: `Quiz: ${mod.title}`,
    description: `Battle the Agriculture PRC board exam boss in ${mod.title}. 50 questions, boss HP system, earn your license piece.`,
    path: `/quiz/${mod.id}`,
    noIndex: true, // Don't index active quiz pages
  });
}

export default async function QuizPage({ params }) {
  const mod = MODULE_INFO[params.stage];
  if (!mod) return notFound();

  // Load question data on the server
  const moduleData = (await import(`@/data/${mod.dataFolder}/${mod.dataFile}.json`)).default;

  // Build initial state (server-side seed — client will re-shuffle on mount via QuizEngine)
  const initialState = initQuizState(moduleData, params.stage);

  return (
    <QuizEngine
      initialState={initialState}
      moduleInfo={mod}
    />
  );
}
