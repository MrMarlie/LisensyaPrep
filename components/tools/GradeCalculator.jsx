'use client';

import { useMemo, useState } from 'react';
import {
  EXAMS,
  weightsAreVerified,
  NOT_VERIFIED_NOTICE,
} from '@/lib/gradeCalcConfig';

// Brand tokens for this tool (per spec): navy headers, gold accents, green PASSED.
const NAVY = '#0A1929';
const GOLD = '#D4AF37';

// Return the subject list to show for an exam, resolving the active LET variant.
function activeSubjects(exam, variantId) {
  if (exam.variants) {
    const v = exam.variants.find((x) => x.id === variantId) || exam.variants[0];
    return v.subjects;
  }
  return exam.subjects || [];
}

// Parse a raw input string into a valid 0-100 number, or null if empty/invalid.
function parseScore(raw) {
  if (raw === '' || raw == null) return null;
  const n = Number(raw);
  if (!Number.isFinite(n)) return null;
  if (n < 0 || n > 100) return NaN; // out of range -> flagged, not usable
  return n;
}

export default function GradeCalculator() {
  const [examId, setExamId] = useState(EXAMS[0].id);
  const exam = EXAMS.find((e) => e.id === examId) || EXAMS[0];

  const [variantId, setVariantId] = useState(
    EXAMS[0].variants ? EXAMS[0].variants[0].id : ''
  );

  // scores keyed by "examId::variantId::subjectLabel" so switching exams is clean.
  const [scores, setScores] = useState({});

  const subjects = activeSubjects(exam, variantId);
  const verified = weightsAreVerified(subjects);

  function keyFor(label) {
    return `${exam.id}::${exam.variants ? variantId : '_'}::${label}`;
  }

  function handleExamChange(id) {
    setExamId(id);
    const next = EXAMS.find((e) => e.id === id);
    setVariantId(next?.variants ? next.variants[0].id : '');
  }

  const result = useMemo(() => {
    const rows = subjects.map((s) => {
      const raw = scores[keyFor(s.label)];
      return { subject: s, raw, value: parseScore(raw) };
    });

    const anyInvalid = rows.some((r) => Number.isNaN(r.value));
    const allFilled = rows.every((r) => r.value !== null && !Number.isNaN(r.value));

    if (!allFilled || anyInvalid) {
      return { status: 'incomplete', anyInvalid, rows };
    }

    const totalWeight = rows.reduce((sum, r) => sum + r.subject.weight, 0);
    const gwa =
      rows.reduce((sum, r) => sum + r.value * r.subject.weight, 0) / totalWeight;

    const floor = exam.subjectFloor;
    const belowFloor =
      floor == null ? [] : rows.filter((r) => r.value < floor);

    const gwaPass = gwa >= exam.passingGWA;
    const floorPass = belowFloor.length === 0;

    let status;
    if (!gwaPass) status = 'fail-gwa';
    else if (!floorPass) status = 'fail-floor';
    else status = 'pass';

    // Points below passing, for the "what-if" hint.
    const pointsShort = Math.max(0, exam.passingGWA - gwa);

    return {
      status,
      rows,
      gwa,
      belowFloor,
      pointsShort,
      floor,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects, scores, exam, variantId]);

  const offendingLabels = new Set(
    (result.belowFloor || []).map((r) => r.subject.label)
  );

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: NAVY }}>
      {/* Header */}
      <div className="px-5 py-5 sm:px-6 border-b border-white/10">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          PRC Grade Calculator
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Pick your exam, enter your scores, and see your GWA and pass status instantly.
        </p>
      </div>

      {/* Exam selector — horizontal scroll on mobile */}
      <div className="px-3 py-3 sm:px-4 border-b border-white/10">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" role="tablist" aria-label="Select exam">
          {EXAMS.map((e) => {
            const active = e.id === examId;
            return (
              <button
                key={e.id}
                role="tab"
                aria-selected={active}
                onClick={() => handleExamChange(e.id)}
                className="shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all border"
                style={
                  active
                    ? { background: GOLD, color: NAVY, borderColor: GOLD }
                    : { background: 'rgba(255,255,255,0.04)', color: '#cbd5e1', borderColor: 'rgba(255,255,255,0.1)' }
                }
              >
                {e.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 py-5 sm:px-6 space-y-5">
        <div>
          <p className="text-white font-bold">{exam.fullName}</p>
          <p className="text-xs text-gray-400 mt-1">{exam.notes}</p>
        </div>

        {/* LET variant sub-selector */}
        {exam.variants && (
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
              LET level
            </label>
            <div className="flex flex-wrap gap-2">
              {exam.variants.map((v) => {
                const active = v.id === variantId;
                return (
                  <button
                    key={v.id}
                    onClick={() => setVariantId(v.id)}
                    className="px-3 py-2 rounded-lg text-sm font-semibold transition-all border"
                    style={
                      active
                        ? { background: 'rgba(212,175,55,0.15)', color: GOLD, borderColor: GOLD }
                        : { background: 'rgba(255,255,255,0.04)', color: '#cbd5e1', borderColor: 'rgba(255,255,255,0.1)' }
                    }
                  >
                    {v.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Unverified-weights notice */}
        {!verified && (
          <div className="flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
            <span aria-hidden className="text-amber-400 text-lg leading-none">⚠</span>
            <p className="text-xs text-amber-200/90 leading-relaxed">{NOT_VERIFIED_NOTICE}</p>
          </div>
        )}

        {/* Subject inputs */}
        <div className="space-y-3">
          {subjects.map((s) => {
            const k = keyFor(s.label);
            const raw = scores[k] ?? '';
            const parsed = parseScore(raw);
            const invalid = Number.isNaN(parsed);
            const isOffender = offendingLabels.has(s.label);
            const weightPct = exam.singleScore
              ? null
              : Math.round(
                  (s.weight / subjects.reduce((sum, x) => sum + x.weight, 0)) * 100
                );
            return (
              <div key={k}>
                <div className="flex items-center justify-between gap-3">
                  <label htmlFor={k} className="text-sm text-gray-200 font-medium">
                    {s.label}
                    {weightPct != null && (
                      <span className="ml-2 text-xs text-gray-500">({weightPct}%)</span>
                    )}
                  </label>
                  <input
                    id={k}
                    type="number"
                    inputMode="decimal"
                    min={0}
                    max={100}
                    step="0.01"
                    placeholder="0–100"
                    value={raw}
                    onChange={(e) =>
                      setScores((prev) => ({ ...prev, [k]: e.target.value }))
                    }
                    className="w-24 sm:w-28 text-right rounded-lg bg-white/5 text-white px-3 py-2 text-sm border outline-none focus:ring-2"
                    style={{
                      borderColor: invalid
                        ? '#f87171'
                        : isOffender
                        ? '#f87171'
                        : 'rgba(255,255,255,0.15)',
                    }}
                  />
                </div>
                {invalid && (
                  <p className="text-xs text-red-400 mt-1">Enter a score between 0 and 100.</p>
                )}
                {isOffender && !invalid && (
                  <p className="text-xs text-red-400 mt-1">
                    Below the {result.floor} floor — this alone fails the exam.
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Result */}
        <ResultPanel result={result} exam={exam} />
      </div>
    </div>
  );
}

function ResultPanel({ result, exam }) {
  if (result.status === 'incomplete') {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-center">
        <p className="text-sm text-gray-400">
          {result.anyInvalid
            ? 'Fix the highlighted scores to see your result.'
            : `Enter all ${exam.singleScore ? 'the' : 'subject'} scores to compute your ${exam.singleScore ? 'result' : 'GWA'}.`}
        </p>
      </div>
    );
  }

  const gwaLabel = exam.singleScore ? 'Overall rating' : 'Weighted GWA';
  const gwaText = result.gwa.toFixed(2);

  if (result.status === 'pass') {
    return (
      <div
        className="rounded-xl px-4 py-5 text-center border"
        style={{ background: 'rgba(0,100,0,0.15)', borderColor: '#0b8a0b' }}
      >
        <p className="text-3xl font-extrabold" style={{ color: '#4ade80' }}>
          PASSED
        </p>
        <p className="text-sm text-gray-200 mt-2">
          {gwaLabel}: <span className="font-bold text-white">{gwaText}</span>{' '}
          (passing is {exam.passingGWA.toFixed(2)}
          {exam.subjectFloor != null ? `, all subjects ≥ ${exam.subjectFloor}` : ''})
        </p>
      </div>
    );
  }

  // Failing states
  return (
    <div className="rounded-xl px-4 py-5 border" style={{ background: 'rgba(220,38,38,0.12)', borderColor: 'rgba(248,113,113,0.4)' }}>
      <p className="text-2xl font-extrabold text-red-400 text-center">FAILED</p>
      <p className="text-sm text-gray-200 mt-2 text-center">
        {gwaLabel}: <span className="font-bold text-white">{gwaText}</span>
      </p>

      {result.status === 'fail-gwa' && (
        <div className="mt-3 text-sm text-gray-300 space-y-2">
          <p>
            Your {gwaLabel.toLowerCase()} is below the passing mark of{' '}
            <span className="font-bold text-white">{exam.passingGWA.toFixed(2)}</span>.
          </p>
          <p className="rounded-lg bg-white/5 px-3 py-2 text-gray-200">
            <span className="font-semibold" style={{ color: '#D4AF37' }}>What-if:</span>{' '}
            you need to raise your {gwaLabel.toLowerCase()} by{' '}
            <span className="font-bold text-white">{result.pointsShort.toFixed(2)}</span>{' '}
            point{result.pointsShort === 1 ? '' : 's'} to reach passing.
          </p>
        </div>
      )}

      {result.status === 'fail-floor' && (
        <div className="mt-3 text-sm text-gray-300 space-y-2">
          <p>
            Your average of <span className="font-bold text-white">{gwaText}</span> is
            passing, but a subject fell below the{' '}
            <span className="font-bold text-white">{result.floor}</span> floor — so the
            exam is still failed.
          </p>
          <p className="rounded-lg bg-white/5 px-3 py-2 text-gray-200">
            <span className="font-semibold text-red-400">The floor rule:</span> even with a
            passing average, dropping below {result.floor} in any single subject
            {' '}
            ({result.belowFloor.map((r) => r.subject.label).join(', ')}) is an automatic fail.
          </p>
        </div>
      )}
    </div>
  );
}
