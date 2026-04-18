import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MODULE_INFO } from '@/lib/quizEngine';
import { buildMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  return Object.values(MODULE_INFO)
    .filter((m) => m.examId === 'education')
    .map((m) => ({ module: m.id }));
}

export async function generateMetadata({ params }) {
  const mod = MODULE_INFO[params.module];
  if (!mod) return {};
  return buildMetadata({
    title: `${mod.title} — LET Review`,
    description: mod.description,
    path: `/education/${mod.id}`,
  });
}

const DIFFICULTY_BADGE = {
  Easy: 'bg-green-500/20 text-green-400 border-green-500/40',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
  Hard: 'bg-red-500/20 text-red-400 border-red-500/40',
};

const SUBJECT_LABELS = {
  general_education: 'General Education',
  professional_education: 'Professional Education',
  english: 'English Specialization',
  filipino: 'Filipino Specialization',
  mathematics: 'Mathematics Specialization',
  biological_science: 'Biological Science Specialization',
};

export default function EducationModulePage({ params }) {
  const mod = MODULE_INFO[params.module];
  if (!mod || mod.examId !== 'education') return notFound();

  const areaLabel = mod.track === 'shared'
    ? 'Shared — Elementary & Secondary'
    : 'Secondary Track — Specialization';

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className={`relative bg-gradient-to-b ${mod.color} py-16 overflow-hidden`}>
        <div className="absolute inset-0 bg-[#080d1b]/80 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-gray-300">Home</Link>
            <span className="text-gray-700">/</span>
            <Link href="/education" className="text-gray-500 hover:text-gray-300">Education</Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-300">{mod.title}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            <div className="text-6xl sm:text-8xl">{mod.icon}</div>
            <div>
              <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-1">
                {SUBJECT_LABELS[mod.subject]} • {areaLabel}
              </p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">{mod.title}</h1>
              <p className="text-gray-300 text-base leading-relaxed mb-4 max-w-2xl">{mod.description}</p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${DIFFICULTY_BADGE[mod.difficulty]}`}>
                  {mod.difficulty}
                </span>
                <span className="text-xs font-semibold text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                  50 Questions
                </span>
                <span className="text-xs font-semibold text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                  🏅 1 License Piece
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Topics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">Topics Covered</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mod.topics.map((topic) => (
                <div key={topic} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6">
            <h2 className="text-white font-bold text-lg mb-4">⚔️ Battle Rules</h2>
            <ul className="space-y-3 text-sm text-gray-300">
              {[
                'Questions per stage — boss has 100 HP',
                'Correct answer: boss takes 5–10 damage (streak bonus!)',
                'Wrong answer: you lose 15 HP from your 100 HP pool',
                'If player HP hits 0 → stage failed',
                'Answer all questions with HP remaining → stage cleared!',
                'Explanation shown after every question',
                'Clear the stage to earn 1 PRZ piece',
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">Stage Info</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Area</dt>
                <dd className="text-white font-semibold text-right">{SUBJECT_LABELS[mod.subject]}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Questions</dt>
                <dd className="text-white font-semibold">10</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Player HP</dt>
                <dd className="text-white font-semibold">100 HP</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Boss HP</dt>
                <dd className="text-white font-semibold">100 HP</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Wrong Penalty</dt>
                <dd className="text-red-400 font-semibold">-15 HP</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Reward</dt>
                <dd className="text-yellow-400 font-semibold">🏅 License Piece</dd>
              </div>
            </dl>
          </div>

          <Link
            href={`/quiz/${mod.id}`}
            className="block w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold py-4 px-6 rounded-xl text-center text-lg transition-all shadow-lg shadow-yellow-400/20 hover:shadow-yellow-400/40"
          >
            ⚔️ Battle Now!
          </Link>

          <Link
            href="/education"
            className="block w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-6 rounded-xl text-center text-sm border border-white/10 transition-all"
          >
            ← Back to Education
          </Link>
        </div>
      </div>
    </div>
  );
}
