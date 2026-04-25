import Link from 'next/link';
import AdPlaceholder from '@/components/ui/AdPlaceholder';
import { PAGE_SEO } from '@/lib/seo';

export const metadata = PAGE_SEO.home;

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

const BLOG_PREVIEWS = [
  {
    title: '10 Must-Know Crop Science Topics for the Agriculture Board Exam',
    excerpt: 'Master plant physiology, crop management, and production systems. We break down the top topics that consistently appear on the PRC Agriculture exam.',
    slug: 'crop-science-board-exam-tips',
    date: 'April 10, 2025',
    readTime: '5 min read',
    tag: 'Study Tips',
  },
  {
    title: 'Soil Science Cheat Sheet: pH, CEC, and Nutrient Availability',
    excerpt: 'Quick-reference guide covering soil texture, pH effects on nutrients, CEC, and fertilizer calculations. Perfect for last-minute review.',
    slug: 'soil-science-cheat-sheet',
    date: 'April 5, 2025',
    readTime: '4 min read',
    tag: 'Soil Science',
  },
  {
    title: 'Agricultural Economics: Key Formulas and Concepts Explained',
    excerpt: 'Farm budgeting, break-even analysis, ROI, and extension methods — all the economics concepts you need to pass the board exam.',
    slug: 'agricultural-economics-key-concepts',
    date: 'March 28, 2025',
    readTime: '6 min read',
    tag: 'Economics',
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a1029] via-[#080d1b] to-[#080d1b] py-20 sm:py-28">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <span>⚔️</span> Gamified PRC Licensure Review
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 text-balance">
            Review Smarter.
            <br />
            <span className="text-yellow-400">Fight Harder.</span>
            <br />
            Pass the Board.
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 text-balance">
            LisensyaPrep turns PRC licensure exam review into a boss-battle game. Answer questions, defeat enemies, collect PRZ pieces, and prove you are exam-ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#choose-exam"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/40"
            >
              Start Your Review
            </Link>
            <Link
              href="#how-it-works"
              className="bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl text-lg border border-white/20 transition-all"
            >
              How It Works
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: '1,250+', label: 'Questions' },
              { value: '6', label: 'Courses' },
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

      {/* Exam Categories */}
      <section id="choose-exam" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Choose Your Exam
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Select your PRC licensure exam and start battling your way to your license.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center sm:justify-items-stretch">
          {/* Agriculture — Active */}
          <Link href="/agriculture" className="group w-full">
            <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 border-2 border-green-600/40 hover:border-green-400 rounded-2xl p-6 transition-all h-full hover:shadow-lg hover:shadow-green-500/10 text-center">
              <div className="text-5xl mb-4">🌾</div>
              <h3 className="text-xl font-bold text-white mb-2">Agriculture</h3>
              <p className="text-gray-400 text-sm mb-4">
                Crop Science, Soil Science, Crop Protection, Animal Science, and more. 6 modules, 300 questions.
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                  ✓ Available Now
                </span>
              </div>
            </div>
          </Link>

          {/* Education — Active */}
          <Link href="/education" className="group w-full">
            <div className="bg-gradient-to-br from-sky-900/40 to-sky-800/20 border-2 border-sky-600/40 hover:border-sky-400 rounded-2xl p-6 transition-all h-full hover:shadow-lg hover:shadow-sky-500/10 text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-white mb-2">Education</h3>
              <p className="text-gray-400 text-sm mb-4">
                LET Review — General Education, Professional Education, and Specialization (English, Filipino, Math, Biology).
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="bg-sky-500/20 text-sky-400 text-xs font-semibold px-3 py-1 rounded-full">
                  ✓ Available Now
                </span>
              </div>
            </div>
          </Link>

          {/* Criminology — Active */}
          <Link href="/criminology" className="group w-full">
            <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 border-2 border-red-600/40 hover:border-red-400 rounded-2xl p-6 transition-all h-full hover:shadow-lg hover:shadow-red-500/10 text-center">
              <div className="text-5xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold text-white mb-2">Criminology</h3>
              <p className="text-gray-400 text-sm mb-4">
                Criminal Jurisprudence, Criminalistics, Law Enforcement, Crime Investigation, Corrections, and Sociology of Crimes. 6 modules, 300 questions.
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="bg-red-500/20 text-red-400 text-xs font-semibold px-3 py-1 rounded-full">
                  ✓ Available Now
                </span>
              </div>
            </div>
          </Link>

          {/* Medical Technology — Active */}
          <Link href="/medical-technology" className="group w-full">
            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 border-2 border-cyan-600/40 hover:border-cyan-400 rounded-2xl p-6 transition-all h-full hover:shadow-lg hover:shadow-cyan-500/10 text-center">
              <div className="text-5xl mb-4">🧪</div>
              <h3 className="text-xl font-bold text-white mb-2">Medical Technology</h3>
              <p className="text-gray-400 text-sm mb-4">
                Clinical Chemistry, Hematology, Microbiology, Immunology, Blood Banking, and Urinalysis. 6 modules, 300 questions.
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="bg-cyan-500/20 text-cyan-400 text-xs font-semibold px-3 py-1 rounded-full">
                  ✓ Available Now
                </span>
              </div>
            </div>
          </Link>

          {/* Nursing — Active */}
          <Link href="/nursing" className="group w-full">
            <div className="bg-gradient-to-br from-pink-900/40 to-pink-800/20 border-2 border-pink-600/40 hover:border-pink-400 rounded-2xl p-6 transition-all h-full hover:shadow-lg hover:shadow-pink-500/10 text-center">
              <div className="text-5xl mb-4">🏥</div>
              <h3 className="text-xl font-bold text-white mb-2">Nursing</h3>
              <p className="text-gray-400 text-sm mb-4">
                Community Health Nursing, Medical-Surgical Nursing, and more. Full NLE coverage.
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="bg-pink-500/20 text-pink-400 text-xs font-semibold px-3 py-1 rounded-full">
                  ✓ Available Now
                </span>
              </div>
            </div>
          </Link>

          {/* Pharmacy — Active */}
          <Link href="/pharmacy" className="group w-full">
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-2 border-purple-600/40 hover:border-purple-400 rounded-2xl p-6 transition-all h-full hover:shadow-lg hover:shadow-purple-500/10 text-center">
              <div className="text-5xl mb-4">💊</div>
              <h3 className="text-xl font-bold text-white mb-2">Pharmacy</h3>
              <p className="text-gray-400 text-sm mb-4">
                Pharmacology, Pharmaceutical Chemistry, Pharmacy Practice, and more. Full PLE coverage.
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="bg-purple-500/20 text-purple-400 text-xs font-semibold px-3 py-1 rounded-full">
                  ✓ Available Now
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* How It Works */}
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

      {/* Blog Preview */}
      <section className="py-16 bg-[#0a1029]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">Latest Study Tips</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-6">Tips, strategies, and insights to help you pass your board exam.</p>
            <Link href="/blog" className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-2 rounded-full text-sm transition-all">
              View All Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_PREVIEWS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <article className="bg-[#0f1629] border border-white/10 rounded-2xl p-8 h-full hover:border-yellow-400/30 hover:scale-[1.02] transition-all">
                  <span className="text-xs font-semibold text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">
                    {post.tag}
                  </span>
                  <h3 className="text-white font-bold text-lg mt-3 mb-2 group-hover:text-yellow-400 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Ad below blog */}
          <div className="mt-8">
            <AdPlaceholder slot="banner" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-5xl mb-4">🏆</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Battle?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Start your Agriculture PRC review now. No registration required — just pick a module and fight.
          </p>
          <Link
            href="/agriculture"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-extrabold px-10 py-4 rounded-xl text-xl transition-all shadow-lg shadow-yellow-400/25"
          >
            Start For Free →
          </Link>
        </div>
      </section>
    </>
  );
}
