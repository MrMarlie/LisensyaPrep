import Link from 'next/link';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { PAGE_SEO } from '@/lib/seo';

export const metadata = PAGE_SEO.home;

const HOT_THIS_WEEK = [
  {
    title: 'LET March 2026 Results — Passing Rate and Topnotchers',
    desc: 'Full results breakdown, passing rates by school, and topnotchers for the March 2026 LET.',
    href: '/education/let-march-2026-results',
    tag: 'LET Results',
  },
  {
    title: 'Resulta ng LET March 2026',
    desc: 'Kumpletong listahan ng mga pumasa sa LET March 2026. Kasama ang passing rate at mga topnotcher.',
    href: '/blog/resulta-ng-let-march-2026',
    tag: 'Filipino',
  },
  {
    title: 'PNLE Coverage 2026 — Complete Breakdown',
    desc: 'Complete subject coverage for the Philippine Nurse Licensure Examination. Know exactly what to review.',
    href: '/nursing/pnle-coverage-2026',
    tag: 'Nursing',
  },
];

const LET_MASTERY = [
  {
    title: 'LET Prof Ed Mastery Study Plan 2026',
    desc: 'Complete 8-week study plan covering all 6 ProfEd content areas. Built for the September 2026 LET.',
    href: '/education/let-prof-ed-mastery-study-plan-2026',
    tag: 'Best for Retakers',
    tagColor: 'text-orange-400 bg-orange-400/10',
  },
  {
    title: 'LET Gen Ed Mastery Study Plan 2026',
    desc: 'Complete 8-week study plan covering English, Math, Science, Filipino, and Social Sciences.',
    href: '/education/let-gen-ed-mastery-study-plan-2026',
    tag: 'Most Comprehensive',
    tagColor: 'text-green-400 bg-green-400/10',
  },
  {
    title: 'English Major LET Reviewer 2026',
    desc: 'Complete English Specialization reviewer covering Literature, Language, and Communication.',
    href: '/education/let-secondary-major-english-reviewer',
    tag: 'High Passing Rate',
    tagColor: 'text-sky-400 bg-sky-400/10',
  },
];

const PROFESSION_CARDS = [
  { href: '/nursing', label: 'Nursing', icon: '🏥', color: 'from-pink-900/40 to-pink-800/20 border-pink-600/40 hover:border-pink-400' },
  { href: '/criminology', label: 'Criminology', icon: '⚖️', color: 'from-red-900/40 to-red-800/20 border-red-600/40 hover:border-red-400' },
  { href: '/education', label: 'Education (LET)', icon: '🎓', color: 'from-sky-900/40 to-sky-800/20 border-sky-600/40 hover:border-sky-400' },
  { href: '/pharmacy', label: 'Pharmacy', icon: '💊', color: 'from-purple-900/40 to-purple-800/20 border-purple-600/40 hover:border-purple-400' },
  { href: '/medical-technology', label: 'Medical Technology', icon: '🧪', color: 'from-cyan-900/40 to-cyan-800/20 border-cyan-600/40 hover:border-cyan-400' },
  { href: '/agriculture', label: 'Agriculture', icon: '🌾', color: 'from-green-900/40 to-green-800/20 border-green-600/40 hover:border-green-400' },
  { href: '/civil-service', label: 'Civil Service', icon: '🏛️', color: 'from-blue-900/40 to-indigo-800/20 border-blue-600/40 hover:border-blue-400' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: '🎯',
    title: 'Choose Your Exam',
    desc: 'Select your PRC licensure exam. Start with Agriculture and more coming soon.',
  },
  {
    step: '02',
    icon: '⚔️',
    title: 'Battle the Boss',
    desc: 'Answer questions to damage the boss. Wrong answers cost you HP. Stay alive and win!',
  },
  {
    step: '03',
    icon: '🏅',
    title: 'Collect License Pieces',
    desc: 'Complete each stage to earn a PRZ piece.',
  },
  {
    step: '04',
    icon: '🎓',
    title: 'Complete Your PRZ',
    desc: 'Finish all modules to assemble your full PRZ — proof you are exam-ready!',
  },
];

const TOP_RESOURCES = [
  {
    title: 'PNLE Coverage 2026 — Complete Breakdown',
    desc: 'Know exactly what subjects are tested in the Philippine Nurse Licensure Examination.',
    href: '/nursing/pnle-coverage-2026',
    tag: 'Nursing',
  },
  {
    title: 'General Education Reviewer for LET 2026',
    desc: 'Covers English, Filipino, Math, Science, Social Studies. High-yield topics for the LET.',
    href: '/education/general-education-reviewer',
    tag: 'LET',
  },
  {
    title: 'CLE Coverage 2026 — Complete Breakdown',
    desc: 'Full subject breakdown for the Criminologist Licensure Examination September 2026.',
    href: '/criminology/cle-coverage-2026',
    tag: 'Criminology',
  },
  {
    title: 'English Major LET Reviewer 2026',
    desc: 'Complete secondary major reviewer for LET English Specialization examinees.',
    href: '/education/let-secondary-major-english-reviewer',
    tag: 'LET',
  },
  {
    title: 'Professional Education Reviewer for LET 2026',
    desc: "Learning theories, Bloom's Taxonomy, curriculum development, and classroom management.",
    href: '/education/professional-education-reviewer',
    tag: 'LET',
  },
  {
    title: 'Math Major LET Reviewer 2026',
    desc: 'High-yield Math Specialization topics for LET Secondary Major Mathematics examinees.',
    href: '/education/let-secondary-major-math-reviewer',
    tag: 'LET',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Section 1: Hero ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1029] via-[#080d1b] to-[#080d1b] py-20 sm:py-28">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span>🎓</span> Free PRC Board Exam Review Philippines
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 text-balance">
            Pass Your Philippine
            <br />
            <span className="text-yellow-400">Board Exam</span> on Your
            <br />
            First Take
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 text-balance">
            Free practice quizzes for PRC board exams + Civil Service Exam. Plus premium LET Mastery Packs for serious examinees.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
            <Link
              href="/education"
              className="min-h-[48px] flex items-center justify-center bg-orange-500 hover:bg-orange-400 text-white font-extrabold px-8 py-3 rounded-xl text-lg transition-all shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40"
            >
              Try Free Quiz
            </Link>
            <Link
              href="#featured-reviewers"
              className="min-h-[48px] flex items-center justify-center bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3 rounded-xl text-lg border border-white/20 transition-all"
            >
              Browse Free Reviewers
            </Link>
          </div>

          <p className="text-sm text-gray-500 mb-12">
            ✓ Used by <span className="text-gray-300 font-semibold">1,600+ examinees</span> in May 2026
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: '1,500+', label: 'Questions' },
              { value: '7', label: 'Courses' },
              { value: '100%', label: 'Free' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-extrabold text-yellow-400">{value}</p>
                <p className="text-gray-500 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <AdPlaceholder slot="banner" />
      </div>

      {/* ── Section 2: Featured Content ─────────────────────────── */}
      <section id="featured-reviewers" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Row 1: Hot This Week */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-extrabold text-white">Hot This Week</h2>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-400/10 text-orange-400 uppercase tracking-wider">Trending</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {HOT_THIS_WEEK.map(({ title, desc, href, tag }) => (
              <Link key={href} href={href} className="group">
                <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-5 h-full hover:border-orange-400/30 hover:bg-[#111a35] transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-orange-400 bg-orange-400/10 px-2.5 py-1 rounded-full">{tag}</span>
                    <span className="text-xs text-orange-400 font-bold">🔥</span>
                  </div>
                  <h3 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-yellow-400 transition-colors">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Row 2: LET Mastery Study Plans */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-extrabold text-white">LET Mastery Study Plans</h2>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-yellow-400/10 text-yellow-400 uppercase tracking-wider">New</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {LET_MASTERY.map(({ title, desc, href, tag, tagColor }) => (
              <Link key={href} href={href} className="group">
                <div className="bg-[#0f1629] border border-yellow-400/20 rounded-2xl p-5 h-full hover:border-yellow-400/50 hover:bg-[#111a35] transition-all">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3 ${tagColor}`}>{tag}</span>
                  <h3 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-yellow-400 transition-colors">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Row 3: Browse by Profession */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-extrabold text-white">Browse by Profession</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {PROFESSION_CARDS.map(({ href, label, icon, color }) => (
              <Link key={href} href={href} className="group">
                <div className={`bg-gradient-to-br ${color} border-2 rounded-2xl p-4 transition-all h-full hover:shadow-lg text-center`}>
                  <div className="text-3xl mb-2">{icon}</div>
                  <h3 className="text-white font-bold text-sm leading-tight">{label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Premium Promo Banner ────────────────────── */}
      <section className="py-14 bg-gradient-to-r from-indigo-950 via-[#0f1340] to-indigo-950 border-y border-indigo-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-yellow-400/10 text-yellow-400 uppercase tracking-wider mb-4">
            September 2026 LET
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
            Get Serious About the
            <br className="hidden sm:block" /> September 2026 LET
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            The LET Mastery Pack is our complete PDF study compilation for serious examinees. Hundreds of practice questions, complete subject coverage, and proven study frameworks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
            <Link
              href="/premium/let-profed-mastery"
              className="min-h-[48px] flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-7 py-3 rounded-xl text-sm transition-colors"
            >
              Get Prof Ed Mastery Pack →
            </Link>
            <Link
              href="/premium/let-gen-ed-mastery"
              className="min-h-[48px] flex items-center justify-center bg-white/10 hover:bg-white/15 text-white font-semibold px-7 py-3 rounded-xl text-sm border border-white/20 transition-colors"
            >
              Get Gen Ed Mastery Pack →
            </Link>
          </div>
          <p className="text-gray-600 text-xs">
            Instant PDF download. One-time payment. Lifetime access.
          </p>
        </div>
      </section>

      {/* ── How It Works (unchanged) ────────────────────────────── */}
      <section id="how-it-works" className="py-16 bg-[#0a1029]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              How LisensyaPrep Works
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Four simple steps from zero to board-exam ready.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, icon, title, desc }) => (
              <div key={step} className="text-center">
                <div className="relative inline-block mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-4xl mx-auto">
                    {icon}
                  </div>
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center">
                    {step.slice(-1)}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Most Helpful Resources ───────────────────── */}
      <section className="py-16 bg-[#0a1029]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Most Helpful Resources This Month
            </h2>
            <p className="text-gray-400 text-base max-w-xl mx-auto">
              Curated by actual traffic data — the reviewers examinees are using most right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TOP_RESOURCES.map(({ title, desc, href, tag }) => (
              <Link key={href} href={href} className="group">
                <article className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 h-full hover:border-yellow-400/30 hover:scale-[1.02] transition-all">
                  <span className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                  <h3 className="text-white font-bold text-base mt-3 mb-2 group-hover:text-yellow-400 transition-colors leading-snug">
                    {title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{desc}</p>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <AdPlaceholder slot="banner" />
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-5xl mb-4">🏆</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Start Reviewing?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Pick your exam and start practicing now. No registration required.
          </p>
          <Link
            href="#featured-reviewers"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-10 py-4 rounded-xl text-xl transition-all shadow-lg shadow-yellow-400/25"
          >
            Start For Free →
          </Link>
        </div>
      </section>
    </>
  );
}
