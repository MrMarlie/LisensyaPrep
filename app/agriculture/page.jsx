import Link from 'next/link';
import { PAGE_SEO } from '@/lib/seo';
import { MODULE_INFO } from '@/lib/quizEngine';

export const metadata = PAGE_SEO.agriculture;

const EXAM_INFO = [
  { label: 'Board Exam Name', value: 'Agriculture and Biosystems Engineering' },
  { label: 'Conducted By', value: 'Professional Regulation Commission (PRC)' },
  { label: 'Schedule', value: 'Twice a year (usually March and September)' },
  { label: 'Passing Rate', value: '75% average required across all subjects' },
  { label: 'Subjects Covered', value: 'Crop Science, Soil Science, Farm Power, Agricultural Economics, Extension' },
];

const DIFFICULTY_COLORS = {
  Easy: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Hard: 'bg-red-500/20 text-red-400 border border-red-500/30',
};

export default function AgriculturePage() {
  // Always filter by examId — never render another exam's modules here
  const modules = Object.values(MODULE_INFO).filter((m) => m.examId === 'agriculture');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-green-950/40 to-[#080d1b] py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Home</Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-300 text-sm">Agriculture</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              🌾 Agriculture PRC Board Exam
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Agriculture PRC
              <br />
              <span className="text-green-400">Licensure Exam Review</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl leading-relaxed">
              Battle through 6 modules covering the complete Agriculture board exam syllabus.
              Defeat the exam boss and collect your PRZ piece for each stage you complete.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-green-400">✓</span> 6 Modules
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-green-400">✓</span> 180 Questions Total
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-green-400">✓</span> Detailed Explanations
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-green-400">✓</span> Progress Saved
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
            <Link key={mod.id} href={`/agriculture/${mod.id}`} className="group">
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

      {/* ALE Study Articles */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white">ALE Study Articles</h2>
              <p className="text-gray-400 text-sm mt-1">Free reviewers and guides for every ALE subject area.</p>
            </div>
            <Link href="/blog/ale-coverage-2026" className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold transition-colors whitespace-nowrap">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'ALE Coverage 2026: Complete Subject Breakdown', href: '/blog/ale-coverage-2026', tag: 'Study Map' },
              { title: 'How to Pass the Agriculture Board Exam on Your First Take', href: '/blog/how-to-pass-agriculture-board-exam', tag: 'Exam Guide' },
              { title: 'Animal Science Reviewer for ALE Philippines 2026', href: '/blog/animal-science-reviewer-ale', tag: 'Subject Reviewer' },
              { title: 'Plant Pathology and Crop Protection Reviewer for ALE 2026', href: '/blog/ale-crop-protection-reviewer', tag: 'Subject Reviewer' },
              { title: 'How to Apply for ALE via PRC LERIS 2026', href: '/blog/ale-application-guide-2026', tag: 'Application Guide' },
              { title: 'ALE Passing Rate and Results 2026', href: '/blog/ale-passing-rate-results-2026', tag: 'Results & Stats' },
            ].map(({ title, href, tag }) => (
              <Link key={href} href={href} className="group">
                <div className="bg-[#0f1629] border border-white/10 hover:border-green-500/30 rounded-xl p-4 h-full transition-all">
                  <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">{tag}</span>
                  <p className="text-white text-sm font-semibold mt-2 group-hover:text-yellow-400 transition-colors leading-snug">{title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Info */}
      <section className="py-12 bg-[#0a1029]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-white mb-6">About the Agriculture PRC Board Exam</h2>
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
