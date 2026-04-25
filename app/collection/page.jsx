'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getExamCollectibles, getOverallStats } from '@/lib/storage';
import { MODULE_INFO } from '@/lib/quizEngine';

const AGR_MODS = Object.values(MODULE_INFO).filter((m) => m.examId === 'agriculture');
const EDU_MODS = Object.values(MODULE_INFO).filter((m) => m.examId === 'education');
const CRI_MODS = Object.values(MODULE_INFO).filter((m) => m.examId === 'criminology');
const MED_MODS = Object.values(MODULE_INFO).filter((m) => m.examId === 'medical-technology');
const NURS_MODS = Object.values(MODULE_INFO).filter((m) => m.examId === 'nursing');
const PHA_MODS = Object.values(MODULE_INFO).filter((m) => m.examId === 'pharmacy');

const COURSES = [
  {
    examId: 'agriculture',
    label: 'Agriculture',
    icon: '🌾',
    color: 'from-green-900/30 to-green-800/10',
    border: 'border-green-500/40',
    accent: 'text-green-400',
    completeBorder: 'border-green-400',
    href: '/agriculture',
    modules: AGR_MODS,
  },
  {
    examId: 'education',
    label: 'Education (LET)',
    icon: '🎓',
    color: 'from-sky-900/30 to-sky-800/10',
    border: 'border-sky-500/40',
    accent: 'text-sky-400',
    completeBorder: 'border-sky-400',
    href: '/education',
    modules: EDU_MODS,
  },
  {
    examId: 'criminology',
    label: 'Criminology',
    icon: '⚖️',
    color: 'from-purple-900/30 to-purple-800/10',
    border: 'border-purple-500/40',
    accent: 'text-purple-400',
    completeBorder: 'border-purple-400',
    href: '/criminology',
    modules: CRI_MODS,
  },
  {
    examId: 'medical-technology',
    label: 'Medical Technology',
    icon: '🧪',
    color: 'from-cyan-900/30 to-cyan-800/10',
    border: 'border-cyan-500/40',
    accent: 'text-cyan-400',
    completeBorder: 'border-cyan-400',
    href: '/medical-technology',
    modules: MED_MODS,
  },
  {
    examId: 'nursing',
    label: 'Nursing',
    icon: '🏥',
    color: 'from-pink-900/30 to-pink-800/10',
    border: 'border-pink-500/40',
    accent: 'text-pink-400',
    completeBorder: 'border-pink-400',
    href: '/nursing',
    modules: NURS_MODS,
  },
  {
    examId: 'pharmacy',
    label: 'Pharmacy',
    icon: '💊',
    color: 'from-purple-900/30 to-purple-800/10',
    border: 'border-purple-500/40',
    accent: 'text-purple-400',
    completeBorder: 'border-purple-400',
    href: '/pharmacy',
    modules: PHA_MODS,
  },
];

function CourseCollection({ course, collectibles, stats }) {
  const total = course.modules.length;
  const earnedCount = course.modules.filter((m) => !!collectibles[m.id]).length;
  const isComplete = earnedCount >= total;
  const remaining = total - earnedCount;

  return (
    <section className="mb-12">
      {/* Course header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{course.icon}</span>
        <div>
          <h2 className="text-white font-extrabold text-xl">{course.label}</h2>
          <p className={`text-xs font-semibold ${course.accent}`}>
            {earnedCount} / {total} pieces collected
          </p>
        </div>
      </div>

      {/* Progress banner */}
      <div className={`rounded-2xl border-2 p-6 mb-6 ${
        isComplete
          ? `bg-gradient-to-br ${course.color} ${course.completeBorder}`
          : 'bg-[#0f1629] border-white/10'
      }`}>
        {isComplete ? (
          <div className="text-center">
            <p className="text-4xl mb-2">🎓</p>
            <h3 className={`text-xl font-extrabold mb-1 ${course.accent}`}>License Complete!</h3>
            <p className="text-gray-300 text-sm mb-4">
              Congratulations! You have all {course.label} PRZ pieces.
            </p>
            <div className="bg-white/5 border border-yellow-400/30 rounded-xl p-4 text-left mt-2">
              <p className="text-yellow-400 font-bold text-sm mb-2">🎉 Claim Your Reward!</p>
              <ol className="text-gray-300 text-xs space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>Take a <strong className="text-white">screenshot</strong> of this completed collection page.</li>
                <li>Send it to our Facebook page: <strong className="text-yellow-400">facebook.com/LisensyaPrep</strong></li>
                <li>We will update your questions with a <strong className="text-white">fresh set</strong> just for you!</li>
              </ol>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-white font-semibold text-sm mb-1">
              {remaining} more PRZ piece{remaining !== 1 ? 's' : ''} to complete your{' '}
              <span className={course.accent}>{course.label}</span> PRZ
            </p>
            <p className="text-gray-500 text-xs mb-3">Score 100% on a module to earn its piece.</p>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${(earnedCount / total) * 100}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-1">
              {Math.round((earnedCount / total) * 100)}% complete
            </p>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Stages Played', value: stats.totalStagesPlayed },
          { label: 'Stages Passed', value: stats.totalStagesPassed },
          { label: 'Avg Score', value: `${stats.averageScore}%` },
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#0f1629] border border-white/10 rounded-xl p-3 text-center">
            <p className={`text-xl font-extrabold ${course.accent}`}>{value}</p>
            <p className="text-gray-500 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Pieces grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {course.modules.map((mod) => {
          const earned = !!collectibles[mod.id];
          return (
            <div
              key={mod.id}
              className={`rounded-2xl border-2 p-5 text-center transition-all ${
                earned
                  ? 'bg-gradient-to-br from-yellow-900/20 to-amber-900/10 border-yellow-400/50'
                  : 'bg-white/5 border-white/10 opacity-70'
              }`}
            >
              <div className={`text-5xl mb-3 ${earned ? '' : 'grayscale opacity-40'}`}>
                {mod.icon}
              </div>
              <p className="text-white font-bold text-sm mb-1 leading-snug">{mod.title}</p>
              <p className="text-gray-500 text-xs mb-3">Stage {mod.stageNumber}</p>

              {earned ? (
                <div>
                  <span className="bg-yellow-400/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-400/30">
                    ✓ Earned
                  </span>
                  {collectibles[mod.id]?.earnedAt && (
                    <p className="text-gray-600 text-xs mt-2">
                      {new Date(collectibles[mod.id].earnedAt).toLocaleDateString('en-PH')}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 text-xs mb-2">Score 100% to unlock</p>
                  <Link
                    href={`/${mod.examPath}/${mod.id}`}
                    className="inline-block bg-white/10 hover:bg-white/15 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                  >
                    Practice →
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 text-center">
        <Link
          href={course.href}
          className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
        >
          Go to {course.label} →
        </Link>
      </div>
    </section>
  );
}

export default function CollectionPage() {
  const [collectiblesMap, setCollectiblesMap] = useState({ agriculture: {}, education: {}, criminology: {}, 'medical-technology': {}, nursing: {} });
  const [statsMap, setStatsMap] = useState({
    agriculture: { totalStagesPlayed: 0, totalStagesPassed: 0, averageScore: 0 },
    education: { totalStagesPlayed: 0, totalStagesPassed: 0, averageScore: 0 },
    criminology: { totalStagesPlayed: 0, totalStagesPassed: 0, averageScore: 0 },
    'medical-technology': { totalStagesPlayed: 0, totalStagesPassed: 0, averageScore: 0 },
    nursing: { totalStagesPlayed: 0, totalStagesPassed: 0, averageScore: 0 },
  });

  useEffect(() => {
    async function load() {
      const [agrC, eduC, criC, medC, nursC, agrS, eduS, criS, medS, nursS] = await Promise.all([
        getExamCollectibles('agriculture'),
        getExamCollectibles('education'),
        getExamCollectibles('criminology'),
        getExamCollectibles('medical-technology'),
        getExamCollectibles('nursing'),
        getOverallStats('agriculture'),
        getOverallStats('education'),
        getOverallStats('criminology'),
        getOverallStats('medical-technology'),
        getOverallStats('nursing'),
      ]);
      setCollectiblesMap({ agriculture: agrC, education: eduC, criminology: criC, 'medical-technology': medC, nursing: nursC });
      setStatsMap({ agriculture: agrS, education: eduS, criminology: criS, 'medical-technology': medS, nursing: nursS });
    }
    load();
  }, []);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* Page header */}
        <div className="text-center mb-10">
          <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-2">My Progress</p>
          <h1 className="text-4xl font-extrabold text-white mb-3">PRZ Collection</h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Score 100% on each module to earn a PRZ piece. Each course has its own collection — complete them all!
          </p>
        </div>

        {COURSES.map((course) => (
          <CourseCollection
            key={course.examId}
            course={course}
            collectibles={collectiblesMap[course.examId]}
            stats={statsMap[course.examId]}
          />
        ))}
      </div>
    </div>
  );
}
