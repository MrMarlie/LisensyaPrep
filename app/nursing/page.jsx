import Link from 'next/link';
import { PAGE_SEO } from '@/lib/seo';
import { MODULE_INFO } from '@/lib/quizEngine';

export const metadata = PAGE_SEO.nursing;

const EXAM_INFO = [
  { label: 'Board Exam Name', value: 'Nurse Licensure Examination (NLE)' },
  { label: 'Conducted By', value: 'Professional Regulation Commission (PRC)' },
  { label: 'Schedule', value: 'Twice a year (usually June and December)' },
  { label: 'Passing Rate', value: '75% general weighted average required' },
  { label: 'Subjects Covered', value: 'Fundamentals of Nursing, Medical-Surgical Nursing, Maternal and Child Nursing, Community Health Nursing, Psychiatric Nursing, Nursing Jurisprudence and Ethics' },
];

const DIFFICULTY_COLORS = {
  Easy: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Hard: 'bg-red-500/20 text-red-400 border border-red-500/30',
};

export default function NursingPage() {
  const modules = Object.values(MODULE_INFO).filter((m) => m.examId === 'nursing');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-pink-950/40 to-[#080d1b] py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Home</Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-300 text-sm">Nursing</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/30 text-pink-400 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              🏥 Nurse Licensure Examination (NLE)
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Nursing PRC
              <br />
              <span className="text-pink-400">Licensure Exam Review</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl leading-relaxed">
              Battle through 6 modules covering the complete Nurse Licensure Examination syllabus.
              Defeat the exam boss and collect your PRZ piece for each stage you complete.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-pink-400">✓</span> 6 Modules
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-pink-400">✓</span> 300 Questions Total
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-pink-400">✓</span> Detailed Explanations
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-pink-400">✓</span> Progress Saved
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
            <Link key={mod.id} href={`/nursing/${mod.id}`} className="group">
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

      {/* NLE Articles */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-white mb-2">NLE Study Guides</h2>
        <p className="text-gray-400 mb-6">Deep-dive reviewers for every PNLE subject area.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: 'PNLE Coverage 2026', desc: 'Complete topic breakdown and exam structure', href: '/nursing/pnle-coverage-2026' },
            { title: 'Community Health Nursing Reviewer', desc: 'DOH programs, EPI vaccines, epidemiology, family planning', href: '/nursing/community-health-nursing-reviewer' },
            { title: 'Medical-Surgical Nursing Reviewer', desc: 'Cardiovascular, respiratory, neuro, GI, and renal nursing', href: '/nursing/medical-surgical-nursing-reviewer' },
          ].map(({ title, desc, href }) => (
            <a key={href} href={href} className="group bg-[#0f1629] border border-white/10 hover:border-pink-500/40 rounded-2xl p-5 transition-all">
              <p className="text-white font-bold text-sm mb-1 group-hover:text-pink-400 transition-colors">{title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Exam Info */}
      <section className="py-12 bg-[#0a1029]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-white mb-6">About the Nurse Licensure Examination (NLE)</h2>
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
