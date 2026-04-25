import Link from 'next/link';
import { PAGE_SEO } from '@/lib/seo';
import { MODULE_INFO } from '@/lib/quizEngine';

export const metadata = PAGE_SEO.pharmacy;

const EXAM_INFO = [
  { label: 'Board Exam Name', value: 'Pharmacy Licensure Examination (PLE)' },
  { label: 'Conducted By', value: 'Professional Regulation Commission (PRC)' },
  { label: 'Schedule', value: 'Once or twice a year (verify at prc.gov.ph)' },
  { label: 'Passing Score', value: '75% general weighted average required' },
  { label: 'Subjects Covered', value: 'Pharmacology, Pharmaceutical Chemistry, Pharmacy Practice, Drug Store and Hospital Pharmacy, Pharmacognosy, Pharmaceutical Calculations' },
];

const COMING_SOON_MODULES = [
  { icon: '⚗️', title: 'Pharmacology', desc: 'Drug mechanisms, classifications, and therapeutic uses', stage: 1 },
  { icon: '🧪', title: 'Pharmaceutical Chemistry', desc: 'Drug synthesis, analysis, and chemical properties', stage: 2 },
  { icon: '🏥', title: 'Hospital & Drug Store Pharmacy', desc: 'Dispensing, compounding, and pharmacy management', stage: 3 },
  { icon: '🌿', title: 'Pharmacognosy', desc: 'Medicinal plants, crude drugs, and natural products', stage: 4 },
  { icon: '🧮', title: 'Pharmaceutical Calculations', desc: 'Dosage, dilutions, and compounding calculations', stage: 5 },
  { icon: '📋', title: 'Pharmacy Practice & Law', desc: 'Ethics, jurisprudence, and pharmacy regulations in the Philippines', stage: 6 },
];

export default function PharmacyPage() {
  const modules = Object.values(MODULE_INFO).filter((m) => m.examId === 'pharmacy');
  const hasModules = modules.length > 0;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-purple-950/40 to-[#080d1b] py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Home</Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-300 text-sm">Pharmacy</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              💊 Pharmacy Licensure Examination (PLE)
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Pharmacy PRC
              <br />
              <span className="text-purple-400">Licensure Exam Review</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl leading-relaxed">
              Battle through 6 modules covering the complete Pharmacy Licensure Examination syllabus.
              Defeat the exam boss and collect your PRZ piece for each stage you complete.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-purple-400">✓</span> 6 Modules
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-purple-400">✓</span> 300 Questions Total
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-purple-400">✓</span> Detailed Explanations
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="text-purple-400">✓</span> Progress Saved
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Choose a Module</h2>
        <p className="text-gray-400 mb-8">Each module contains 50 board exam-style questions. Clear them all to complete your license!</p>

        {hasModules ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <Link key={mod.id} href={`/pharmacy/${mod.id}`} className="group">
                <div className={`bg-gradient-to-br ${mod.color} rounded-2xl p-1 shadow-lg h-full transition-transform group-hover:scale-[1.02]`}>
                  <div className="bg-[#0a1022] rounded-xl p-6 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-5xl">{mod.icon}</span>
                    </div>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Stage {mod.stageNumber}</p>
                    <h3 className="text-white font-extrabold text-xl mb-3 leading-tight">{mod.title}</h3>
                    <p className="text-gray-400 text-sm mb-5 leading-relaxed">{mod.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-gray-500 text-xs">{mod.questionCount} Questions</span>
                      <span className="text-yellow-400 font-bold text-sm group-hover:translate-x-1 transition-transform">Start →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMING_SOON_MODULES.map((mod) => (
              <div key={mod.stage} className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-500/20 rounded-2xl p-6 opacity-75">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{mod.icon}</span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    Coming Soon
                  </span>
                </div>
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Stage {mod.stage}</p>
                <h3 className="text-white font-extrabold text-xl mb-3 leading-tight">{mod.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Exam Info */}
      <section className="py-12 bg-[#0a1029]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-white mb-6">About the Pharmacy Licensure Examination (PLE)</h2>
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

      {/* Articles */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">PLE Study Guides</h2>
        <p className="text-gray-400 mb-8">Free reviewer articles for the Pharmacy Licensure Examination.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/pharmacy/ple-coverage-2026" className="group bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-2xl p-6 transition-colors">
            <p className="text-purple-400 text-xs font-semibold uppercase tracking-wide mb-2">PLE Hub</p>
            <h3 className="text-white font-bold text-base leading-snug group-hover:text-purple-400 transition-colors">PLE Coverage 2026: Complete Subject Breakdown</h3>
            <p className="text-gray-500 text-xs mt-2">9 min read</p>
          </Link>
          <Link href="/pharmacy/pharmacology-reviewer" className="group bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-2xl p-6 transition-colors">
            <p className="text-purple-400 text-xs font-semibold uppercase tracking-wide mb-2">Reviewer</p>
            <h3 className="text-white font-bold text-base leading-snug group-hover:text-purple-400 transition-colors">Pharmacology Reviewer for PLE Philippines 2026</h3>
            <p className="text-gray-500 text-xs mt-2">12 min read</p>
          </Link>
          <Link href="/pharmacy/pharmacy-law-ethics-reviewer" className="group bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-2xl p-6 transition-colors">
            <p className="text-purple-400 text-xs font-semibold uppercase tracking-wide mb-2">Reviewer</p>
            <h3 className="text-white font-bold text-base leading-snug group-hover:text-purple-400 transition-colors">Pharmacy Law and Ethics Reviewer for PLE 2026</h3>
            <p className="text-gray-500 text-xs mt-2">10 min read</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
