import Link from 'next/link';
import { PAGE_SEO } from '@/lib/seo';
import { MODULE_INFO } from '@/lib/quizEngine';

export const metadata = PAGE_SEO.nclex;

const EXAM_INFO = [
  { label: 'Exam Name', value: 'NCLEX-RN (National Council Licensure Examination — Registered Nurse)' },
  { label: 'Conducted By', value: 'National Council of State Boards of Nursing (NCSBN)' },
  { label: 'Format', value: 'Computerized Adaptive Testing (CAT) — 75 to 145 questions' },
  { label: 'Passing Standard', value: 'Next Generation NCLEX (NGN) passing standard set by NCSBN' },
  { label: 'Schedule', value: 'Year-round testing at Pearson VUE test centers' },
  { label: 'Content Areas', value: 'Management of Care, Safety, Pharmacology, Physiological Adaptation, Health Promotion, Psychosocial Integrity, Basic Care, Reduction of Risk Potential' },
];

const DIFFICULTY_COLORS = {
  Easy: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Hard: 'bg-red-500/20 text-red-400 border border-red-500/30',
};

export default function NclexPage() {
  const modules = Object.values(MODULE_INFO).filter((m) => m.examId === 'nclex');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-teal-950/40 to-[#080d1b] py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Home</Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-300 text-sm">NCLEX</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 text-teal-400 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              💉 NCLEX-RN Licensure Examination
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              NCLEX-RN
              <br />
              <span className="text-teal-400">Exam Review</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl leading-relaxed">
              Battle through NCLEX content modules covering all tested areas of the National Council Licensure Examination.
              Defeat the exam boss and collect your PRZ piece for each stage you complete.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-teal-400">✓</span> {modules.length} {modules.length === 1 ? 'Module' : 'Modules'} Available
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-teal-400">✓</span> {modules.length * 50} Questions Total
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-teal-400">✓</span> Detailed Explanations
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-teal-400">✓</span> Progress Saved
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Choose a Module</h2>
        <p className="text-gray-400 mb-8">Each module contains 50 board exam-style questions. Clear them all to complete your license!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <Link key={mod.id} href={`/nclex/${mod.id}`} className="group">
              <div className={`bg-gradient-to-br ${mod.color} rounded-2xl p-1 shadow-lg h-full transition-transform group-hover:scale-[1.02]`}>
                <div className="bg-[#0a1022] rounded-xl p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{mod.icon}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${DIFFICULTY_COLORS[mod.difficulty]}`}>
                      {mod.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                    Stage {mod.stageNumber}
                  </p>
                  <h3 className="text-white font-extrabold text-xl mb-3 leading-tight">{mod.title}</h3>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed">{mod.description}</p>

                  <div className="space-y-1.5 mb-5">
                    {mod.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                        {topic}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-gray-500 text-xs">{mod.questionCount} Questions</span>
                    <span className="text-yellow-400 font-bold text-sm group-hover:translate-x-1 transition-transform">
                      Start →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Exam Info */}
      <section className="py-12 bg-[#0a1029]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-white mb-6">About the NCLEX-RN</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
            {EXAM_INFO.map(({ label, value }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">{label}</p>
                <p className="text-white text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
