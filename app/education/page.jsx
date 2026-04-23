import Link from 'next/link';
import { MODULE_INFO } from '@/lib/quizEngine';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Education LET Review — Free PRC Teacher Board Exam Reviewer',
  description: 'Prepare for the PRC Licensure Examination for Teachers (LET). Covers General Education, Professional Education, and Specialization for Elementary and Secondary tracks.',
  path: '/education',
});

const EXAM_INFO = [
  { label: 'Board Exam Name', value: 'Licensure Examination for Teachers (LET)' },
  { label: 'Conducted By', value: 'Professional Regulation Commission (PRC)' },
  { label: 'Schedule', value: 'Twice a year (usually March and September)' },
  { label: 'Elementary Grading', value: 'General Education 40% + Professional Education 60%' },
  { label: 'Secondary Grading', value: 'General Education 20% + Professional Education 20% + Specialization 40%' },
  { label: 'Passing Rate', value: '75% general average, no subject below 50%' },
];

const DIFFICULTY_COLORS = {
  Easy: 'bg-green-500/20 text-green-400 border border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
  Hard: 'bg-red-500/20 text-red-400 border border-red-500/30',
};

const SUBJECT_LABELS = {
  general_education: 'General Education',
  professional_education: 'Professional Education',
  english: 'English',
  filipino: 'Filipino',
  mathematics: 'Mathematics',
  biological_science: 'Biological Science',
};

export default function EducationPage() {
  const allMods = Object.values(MODULE_INFO).filter((m) => m.examId === 'education');
  const sharedMods = allMods.filter((m) => m.track === 'shared');
  const specMods = allMods.filter((m) => m.track === 'secondary');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-sky-950/40 to-[#080d1b] py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Home</Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-300 text-sm">Education</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-400 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              🎓 Education LET Board Exam
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              LET Review
              <br />
              <span className="text-sky-400">Licensure Examination for Teachers</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl leading-relaxed">
              Battle through General Education, Professional Education, and Specialization modules
              aligned to the PRC LET board exam. Defeat the boss and collect your PRZ pieces!
            </p>

            <div className="flex flex-wrap gap-4">
              {[
                '✓ Elementary & Secondary Tracks',
                '✓ Hard-Level Questions',
                '✓ Detailed Explanations',
                '✓ Progress Saved',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-sky-400">{item.slice(0, 1)}</span>
                  {item.slice(2)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Track Breakdown */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-sky-500/5 border border-sky-500/20 rounded-2xl p-6">
            <h3 className="text-sky-400 font-bold text-lg mb-2">📘 Elementary Track</h3>
            <p className="text-gray-400 text-sm mb-3">For future elementary school teachers.</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>General Education</span>
                <span className="text-sky-400 font-semibold">40%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Professional Education</span>
                <span className="text-sky-400 font-semibold">60%</span>
              </div>
            </div>
          </div>
          <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-6">
            <h3 className="text-violet-400 font-bold text-lg mb-2">📗 Secondary Track</h3>
            <p className="text-gray-400 text-sm mb-3">For future high school / secondary teachers.</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>General Education</span>
                <span className="text-violet-400 font-semibold">20%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Professional Education</span>
                <span className="text-violet-400 font-semibold">20%</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Specialization</span>
                <span className="text-violet-400 font-semibold">40%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Modules — GenEd + ProfEd */}
      <section className="pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Shared Modules</h2>
        <p className="text-gray-400 mb-6 text-sm">Required for both Elementary and Secondary LET tracks.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sharedMods.map((mod) => (
            <Link key={mod.id} href={`/education/${mod.id}`} className="group">
              <div className={`bg-gradient-to-br ${mod.color} rounded-2xl p-1 shadow-lg h-full transition-transform group-hover:scale-[1.02]`}>
                <div className="bg-[#0a1022] rounded-xl p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{mod.icon}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${DIFFICULTY_COLORS[mod.difficulty]}`}>
                      {mod.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                    {SUBJECT_LABELS[mod.subject]}
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

      {/* Specialization Modules — Secondary only */}
      <section className="pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Specialization Modules</h2>
        <p className="text-gray-400 mb-6 text-sm">For Secondary LET only — choose your major subject.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {specMods.map((mod) => (
            <Link key={mod.id} href={`/education/${mod.id}`} className="group">
              <div className={`bg-gradient-to-br ${mod.color} rounded-2xl p-1 shadow-lg h-full transition-transform group-hover:scale-[1.02]`}>
                <div className="bg-[#0a1022] rounded-xl p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{mod.icon}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${DIFFICULTY_COLORS[mod.difficulty]}`}>
                      {mod.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">
                    Specialization — {SUBJECT_LABELS[mod.subject]}
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
          <h2 className="text-2xl font-extrabold text-white mb-6">About the LET Board Exam</h2>
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

      {/* Study Guides */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-white mb-2">LET Study Guides</h2>
        <p className="text-gray-400 text-sm mb-6">Free LET review articles and self-study tips from LisensyaPrep.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/education/how-to-pass-let-first-take" className="group block bg-[#0f1629] border border-white/10 hover:border-sky-500/40 rounded-2xl p-5 transition-all">
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-sky-500/10 text-sky-400">LET Guide</span>
            <h3 className="text-white font-bold mt-3 mb-2 group-hover:text-sky-400 transition-colors leading-snug">
              How to Pass the LET Board Exam on Your First Take (2026 Self-Review Guide)
            </h3>
            <p className="text-gray-500 text-xs">12-week study plan, LET coverage breakdown, and 7 proven tips from LET passers.</p>
            <span className="text-sky-400 text-sm font-semibold mt-3 inline-block group-hover:translate-x-1 transition-transform">Read →</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
