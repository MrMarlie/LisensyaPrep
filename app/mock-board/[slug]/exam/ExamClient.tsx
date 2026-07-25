'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

type Choice = { key: string; text: string };
type Question = { id: number; subject: string; stem: string; choices: Choice[] };
type Answers = Record<string, string>;

type StartData = {
  attemptId: string;
  examTitle: string;
  deadlineAt: string;
  durationSecs: number;
  answers: Answers;
  questions: Question[];
};

type Results = {
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  perSubject: Record<string, { correct: number; total: number }>;
};

type ReviewItem = {
  id: number;
  subject: string;
  stem: string;
  choices: Choice[];
  yourAnswer: string | null;
  correctAnswer: string;
  correct: boolean;
  rationale: string;
};

const LABELS = ['A', 'B', 'C', 'D'];

function fmt(secs: number) {
  const s = Math.max(0, Math.floor(secs));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export default function ExamClient({ examKey, slug }: { examKey: string; slug: string }) {
  const [phase, setPhase] = useState<'loading' | 'exam' | 'results' | 'review' | 'error'>('loading');
  const [errMsg, setErrMsg] = useState('');
  const [data, setData] = useState<StartData | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [idx, setIdx] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [review, setReview] = useState<ReviewItem[] | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong'>('all');

  const answersRef = useRef<Answers>({});
  const attemptRef = useRef<string | null>(null);
  const submittedRef = useRef(false);
  answersRef.current = answers;

  // ── Start / resume ──────────────────────────────────────────────────────
  const start = useCallback(async () => {
    setPhase('loading');
    setResults(null);
    setReview(null);
    submittedRef.current = false;
    try {
      const res = await fetch(`/api/mock/${examKey}/start`, { method: 'POST' });
      if (res.status === 401) {
        window.location.href = `/mock-board/login?next=/mock-board/${slug}/exam`;
        return;
      }
      const json = await res.json();
      if (!res.ok) {
        setErrMsg(
          json.error === 'expired'
            ? 'Your Mock Board access has expired (the campaign ended October 1).'
            : json.error === 'no-access'
            ? 'This account has no Mock Board access yet.'
            : 'Could not start the exam. Please try again.',
        );
        setPhase('error');
        return;
      }
      setData(json);
      setAnswers(json.answers || {});
      attemptRef.current = json.attemptId;
      const remaining = (new Date(json.deadlineAt).getTime() - Date.now()) / 1000;
      setTimeLeft(remaining);
      setIdx(0);
      setPhase('exam');
    } catch {
      setErrMsg('Network error. Please check your connection and try again.');
      setPhase('error');
    }
  }, [examKey, slug]);

  useEffect(() => {
    start();
  }, [start]);

  // ── Persistence: debounced + interval autosave, and on unload ───────────
  const saveAnswers = useCallback(async () => {
    if (!attemptRef.current || submittedRef.current) return;
    try {
      await fetch(`/api/mock/${examKey}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId: attemptRef.current, answers: answersRef.current }),
      });
    } catch {
      /* best-effort */
    }
  }, [examKey]);

  useEffect(() => {
    if (phase !== 'exam') return;
    const iv = setInterval(saveAnswers, 20000);
    const onUnload = () => {
      if (!attemptRef.current || submittedRef.current) return;
      const blob = new Blob(
        [JSON.stringify({ attemptId: attemptRef.current, answers: answersRef.current })],
        { type: 'application/json' },
      );
      navigator.sendBeacon(`/api/mock/${examKey}/save`, blob);
    };
    window.addEventListener('beforeunload', onUnload);
    return () => {
      clearInterval(iv);
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [phase, examKey, saveAnswers]);

  // ── Submit ──────────────────────────────────────────────────────────────
  const submit = useCallback(async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setConfirmSubmit(false);
    setPhase('loading');
    try {
      const res = await fetch(`/api/mock/${examKey}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attemptId: attemptRef.current, answers: answersRef.current }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'submit failed');
      setResults(json);
      setPhase('results');
      window.scrollTo(0, 0);
    } catch {
      submittedRef.current = false;
      setErrMsg('Could not submit. Please try again.');
      setPhase('error');
    }
  }, [examKey]);

  // ── Timer tick + auto-submit at 0 ───────────────────────────────────────
  useEffect(() => {
    if (phase !== 'exam' || !data) return;
    const tick = () => {
      const remaining = (new Date(data.deadlineAt).getTime() - Date.now()) / 1000;
      setTimeLeft(remaining);
      if (remaining <= 0) submit();
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [phase, data, submit]);

  const openReview = useCallback(async () => {
    setPhase('loading');
    try {
      const res = await fetch(`/api/mock/${examKey}/review?attemptId=${attemptRef.current}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setReview(json.items);
      setPhase('review');
      window.scrollTo(0, 0);
    } catch {
      setPhase('results');
    }
  }, [examKey]);

  const pick = (qid: number, key: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [String(qid)]: key };
      return next;
    });
  };

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  // ── Render ──────────────────────────────────────────────────────────────
  if (phase === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        <div className="animate-pulse">Loading your exam…</div>
      </div>
    );
  }

  if (phase === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center bg-[#0f1629] border border-white/10 rounded-2xl p-8">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-white font-semibold mb-4">{errMsg}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={start} className="bg-yellow-400 text-gray-900 font-bold px-5 py-2.5 rounded-lg">
              Try again
            </button>
            <Link href={`/mock-board/${slug}`} className="border border-white/20 text-gray-300 px-5 py-2.5 rounded-lg">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'results' && results) {
    return <ResultsView results={results} slug={slug} onReview={openReview} onRetake={start} />;
  }

  if (phase === 'review' && review && results) {
    return (
      <ReviewView
        review={review}
        results={results}
        filter={reviewFilter}
        setFilter={setReviewFilter}
        onBack={() => setPhase('results')}
        onRetake={start}
      />
    );
  }

  // EXAM
  if (!data) return null;
  const q = data.questions[idx];
  const lowTime = timeLeft <= 300; // last 5 minutes

  return (
    <div className="min-h-screen pb-28">
      {/* Sticky timer bar — always at top */}
      <div className="sticky top-0 z-40 bg-[#080d1b]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-gray-500 text-[11px] leading-none truncate">{data.examTitle}</p>
            <p className="text-gray-400 text-xs mt-1">
              {answeredCount}/{data.questions.length} answered
            </p>
          </div>
          <div
            className={`font-mono font-extrabold text-lg px-3 py-1 rounded-lg tabular-nums ${
              lowTime ? 'bg-red-500/15 text-red-400 animate-pulse' : 'bg-white/5 text-yellow-400'
            }`}
            aria-label="Time remaining"
          >
            ⏱ {fmt(timeLeft)}
          </div>
          <button
            onClick={() => setConfirmSubmit(true)}
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
        {/* progress bar */}
        <div className="h-1 bg-white/5">
          <div
            className="h-full bg-yellow-400/80 transition-all"
            style={{ width: `${(answeredCount / data.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-6">
        {lowTime && (
          <p className="text-red-400 text-sm text-center mb-4 font-semibold">
            ⚠️ Less than 5 minutes left — the exam auto-submits at 0:00.
          </p>
        )}

        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wide">{q.subject}</span>
            <span className="text-gray-500 text-xs">
              Question {idx + 1} of {data.questions.length}
            </span>
          </div>
          <p className="text-white text-lg leading-relaxed mb-5">{q.stem}</p>

          <div className="space-y-2.5">
            {q.choices.map((c, i) => {
              const selected = answers[String(q.id)] === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => pick(q.id, c.key)}
                  className={`w-full text-left flex gap-3 items-start px-4 py-3 rounded-xl border transition-colors ${
                    selected
                      ? 'border-yellow-400 bg-yellow-400/10'
                      : 'border-white/10 bg-[#080d1b] hover:border-white/25'
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                      selected ? 'bg-yellow-400 text-gray-900' : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {LABELS[i]}
                  </span>
                  <span className={`text-sm leading-relaxed ${selected ? 'text-white' : 'text-gray-300'}`}>
                    {c.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="px-5 py-2.5 rounded-lg border border-white/15 text-gray-300 disabled:opacity-40"
          >
            ← Previous
          </button>
          <button onClick={() => setShowGrid((s) => !s)} className="text-gray-400 text-sm underline">
            {showGrid ? 'Hide' : 'Question list'}
          </button>
          {idx < data.questions.length - 1 ? (
            <button
              onClick={() => setIdx((i) => Math.min(data.questions.length - 1, i + 1))}
              className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => setConfirmSubmit(true)}
              className="px-5 py-2.5 rounded-lg bg-yellow-400 text-gray-900 font-bold"
            >
              Finish →
            </button>
          )}
        </div>

        {/* Question navigator grid */}
        {showGrid && (
          <div className="mt-5 bg-[#0f1629] border border-white/10 rounded-2xl p-4">
            <div className="grid grid-cols-8 sm:grid-cols-10 gap-2">
              {data.questions.map((qq, i) => {
                const done = !!answers[String(qq.id)];
                const cur = i === idx;
                return (
                  <button
                    key={qq.id}
                    onClick={() => {
                      setIdx(i);
                      setShowGrid(false);
                    }}
                    className={`aspect-square rounded-md text-xs font-bold ${
                      cur
                        ? 'bg-yellow-400 text-gray-900'
                        : done
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-white/5 text-gray-500 border border-white/10'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <p className="text-gray-600 text-xs mt-3">
              {answeredCount} answered · {data.questions.length - answeredCount} remaining
            </p>
          </div>
        )}
      </div>

      {/* Submit confirmation */}
      {confirmSubmit && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-[#0f1629] border border-white/15 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-extrabold text-lg mb-2">Submit your exam?</h3>
            <p className="text-gray-400 text-sm mb-1">
              You&apos;ve answered <strong className="text-white">{answeredCount}</strong> of{' '}
              {data.questions.length} questions.
            </p>
            {answeredCount < data.questions.length && (
              <p className="text-yellow-400 text-sm mb-1">
                {data.questions.length - answeredCount} unanswered will be marked wrong.
              </p>
            )}
            <p className="text-gray-500 text-xs mb-5">Rationales unlock right after you submit.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmSubmit(false)}
                className="flex-1 border border-white/15 text-gray-300 py-2.5 rounded-lg"
              >
                Keep going
              </button>
              <button onClick={submit} className="flex-1 bg-yellow-400 text-gray-900 font-bold py-2.5 rounded-lg">
                Submit now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Results ────────────────────────────────────────────────────────────────
function ResultsView({
  results,
  slug,
  onReview,
  onRetake,
}: {
  results: Results;
  slug: string;
  onReview: () => void;
  onRetake: () => void;
}) {
  const pct = Math.round(results.percent * 100);
  const subjects = Object.entries(results.perSubject || {});
  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div
          className={`rounded-2xl p-8 text-center border ${
            results.passed ? 'border-green-400/40 bg-green-500/5' : 'border-red-400/30 bg-red-500/5'
          }`}
        >
          <div className="text-5xl mb-2">{results.passed ? '🎉' : '📚'}</div>
          <p className={`text-sm font-bold uppercase tracking-widest ${results.passed ? 'text-green-400' : 'text-red-400'}`}>
            {results.passed ? 'Passed' : 'Below Passing'}
          </p>
          <p className="text-white text-5xl font-black mt-2">{pct}%</p>
          <p className="text-gray-400 mt-1">
            {results.score} / {results.total} correct · Passing is 75%
          </p>
        </div>

        <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-6 mt-5">
          <h3 className="text-white font-bold mb-4">Score by subject</h3>
          <div className="space-y-3">
            {subjects.map(([subj, s]) => {
              const p = s.total ? Math.round((s.correct / s.total) * 100) : 0;
              const weak = p < 50;
              return (
                <div key={subj}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{subj}</span>
                    <span className={weak ? 'text-red-400 font-semibold' : 'text-gray-400'}>
                      {s.correct}/{s.total} ({p}%)
                    </span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${weak ? 'bg-red-400/70' : 'bg-green-400/70'}`}
                      style={{ width: `${p}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button onClick={onReview} className="flex-1 bg-yellow-400 text-gray-900 font-extrabold py-3 rounded-xl">
            Review answers &amp; rationales →
          </button>
          <button onClick={onRetake} className="flex-1 border border-white/20 text-white font-semibold py-3 rounded-xl">
            Retake (reshuffled)
          </button>
        </div>
        <p className="text-center mt-4">
          <Link href={`/mock-board/${slug}`} className="text-gray-500 text-sm underline">
            Back to exam page
          </Link>
        </p>
      </div>
    </div>
  );
}

// ── Review (rationales) ──────────────────────────────────────────────────────
function ReviewView({
  review,
  results,
  filter,
  setFilter,
  onBack,
  onRetake,
}: {
  review: ReviewItem[];
  results: Results;
  filter: 'all' | 'wrong';
  setFilter: (f: 'all' | 'wrong') => void;
  onBack: () => void;
  onRetake: () => void;
}) {
  const shown = filter === 'wrong' ? review.filter((r) => !r.correct) : review;
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <button onClick={onBack} className="text-gray-400 text-sm underline">
            ← Back to score
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`text-xs px-3 py-1.5 rounded-full ${filter === 'all' ? 'bg-yellow-400 text-gray-900 font-bold' : 'bg-white/5 text-gray-400'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('wrong')}
              className={`text-xs px-3 py-1.5 rounded-full ${filter === 'wrong' ? 'bg-red-400 text-gray-900 font-bold' : 'bg-white/5 text-gray-400'}`}
            >
              Wrong ({results.total - results.score})
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {shown.map((r, n) => (
            <div key={r.id} className="bg-[#0f1629] border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-yellow-400 text-xs font-bold uppercase">{r.subject}</span>
                <span className={`text-xs font-bold ${r.correct ? 'text-green-400' : 'text-red-400'}`}>
                  {r.correct ? '✓ Correct' : r.yourAnswer ? '✗ Wrong' : '— Skipped'}
                </span>
              </div>
              <p className="text-white leading-relaxed mb-3">
                {n + 1}. {r.stem}
              </p>
              <div className="space-y-1.5 mb-3">
                {r.choices.map((c, i) => {
                  const isCorrect = c.key === r.correctAnswer;
                  const isYours = c.key === r.yourAnswer;
                  return (
                    <div
                      key={c.key}
                      className={`flex gap-2 items-start text-sm px-3 py-2 rounded-lg border ${
                        isCorrect
                          ? 'border-green-400/40 bg-green-500/10'
                          : isYours
                          ? 'border-red-400/40 bg-red-500/10'
                          : 'border-white/5'
                      }`}
                    >
                      <span className="font-bold text-gray-400">{LABELS[i]}.</span>
                      <span className={isCorrect ? 'text-green-300' : isYours ? 'text-red-300' : 'text-gray-400'}>
                        {c.text}
                      </span>
                      {isCorrect && <span className="ml-auto text-green-400 text-xs">correct</span>}
                      {isYours && !isCorrect && <span className="ml-auto text-red-400 text-xs">your answer</span>}
                    </div>
                  );
                })}
              </div>
              <div className="bg-[#080d1b] border border-white/10 rounded-lg p-3">
                <p className="text-gray-500 text-xs font-bold uppercase mb-1">Rationale</p>
                <p className="text-gray-300 text-sm leading-relaxed">{r.rationale}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onRetake} className="w-full mt-6 border border-white/20 text-white font-semibold py-3 rounded-xl">
          Retake (reshuffled)
        </button>
      </div>
    </div>
  );
}
