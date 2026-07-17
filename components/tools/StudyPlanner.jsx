'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  PLANNER_EXAMS,
  CONFIDENCE_LEVELS,
  findExam,
  buildPlan,
} from '@/lib/studyPlannerConfig';

// Brand tokens for this tool (per spec): navy surfaces, gold accents.
const NAVY = '#0A1929';
const GOLD = '#D4AF37';
const STORAGE_KEY = 'lp_study_planner_v1';

// Confidence pill colors.
const CONF_STYLE = {
  Weak: { on: { background: 'rgba(248,113,113,0.18)', color: '#fca5a5', borderColor: '#f87171' } },
  OK: { on: { background: 'rgba(212,175,55,0.15)', color: GOLD, borderColor: GOLD } },
  Strong: { on: { background: 'rgba(74,222,128,0.15)', color: '#4ade80', borderColor: '#22c55e' } },
};
const CONF_OFF = {
  background: 'rgba(255,255,255,0.04)',
  color: '#cbd5e1',
  borderColor: 'rgba(255,255,255,0.1)',
};

function defaultSubjects(examId) {
  return findExam(examId).subjects.map((name) => ({ name, confidence: 'OK' }));
}

function defaultState() {
  const exam = PLANNER_EXAMS[0];
  return {
    examId: exam.id,
    examDate: '',
    weekdayHours: 2,
    weekendHours: 4,
    subjects: defaultSubjects(exam.id),
  };
}

export default function StudyPlanner() {
  const [state, setState] = useState(defaultState);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted inputs once, on the client only.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && Array.isArray(saved.subjects)) {
          setState({ ...defaultState(), ...saved });
        }
      }
    } catch {
      // Corrupt/blocked storage — fall back to defaults silently.
    }
    setHydrated(true);
  }, []);

  // Persist on every change, after hydration so we never overwrite saved data with defaults.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota/private-mode errors */
    }
  }, [state, hydrated]);

  const exam = findExam(state.examId);

  // Rebuild the plan on any input change. `today` intentionally recomputed per render;
  // the component is client-only so there's no hydration mismatch.
  const plan = useMemo(() => buildPlan(state), [state]);

  function update(patch) {
    setState((prev) => ({ ...prev, ...patch }));
  }

  function handleExamChange(id) {
    // Switching exams reloads that exam's starting subjects (they're editable after).
    setState((prev) => ({ ...prev, examId: id, subjects: defaultSubjects(id) }));
  }

  function setSubject(i, patch) {
    setState((prev) => {
      const subjects = prev.subjects.map((s, idx) => (idx === i ? { ...s, ...patch } : s));
      return { ...prev, subjects };
    });
  }

  function addSubject() {
    setState((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { name: '', confidence: 'OK' }],
    }));
  }

  function removeSubject(i) {
    setState((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((_, idx) => idx !== i),
    }));
  }

  function startOver() {
    const fresh = defaultState();
    setState(fresh);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-6">
      {/* ---------- FORM (hidden when printing) ---------- */}
      <div
        className="rounded-2xl border border-white/10 overflow-hidden print:hidden"
        style={{ background: NAVY }}
      >
        <div className="px-5 py-5 sm:px-6 border-b border-white/10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Build your review schedule</h2>
          <p className="text-sm text-gray-400 mt-1">
            Fill this in and your phased plan appears below. It saves on this device automatically.
          </p>
        </div>

        <div className="px-5 py-5 sm:px-6 space-y-6">
          {/* Exam */}
          <div>
            <label htmlFor="sp-exam" className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
              Which exam?
            </label>
            <select
              id="sp-exam"
              value={state.examId}
              onChange={(e) => handleExamChange(e.target.value)}
              className="w-full rounded-lg bg-white/5 text-white px-3 py-2.5 text-sm border border-white/15 outline-none focus:ring-2"
            >
              {PLANNER_EXAMS.map((e) => (
                <option key={e.id} value={e.id} style={{ background: NAVY }}>
                  {e.name} — {e.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Exam date */}
          <div>
            <label htmlFor="sp-date" className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
              Exam date
            </label>
            <input
              id="sp-date"
              type="date"
              value={state.examDate}
              onChange={(e) => update({ examDate: e.target.value })}
              className="w-full rounded-lg bg-white/5 text-white px-3 py-2.5 text-sm border border-white/15 outline-none focus:ring-2"
            />
          </div>

          {/* Hours sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <HourSlider
              id="sp-weekday"
              label="Hours per weekday"
              value={state.weekdayHours}
              min={0.5}
              max={8}
              onChange={(v) => update({ weekdayHours: v })}
            />
            <HourSlider
              id="sp-weekend"
              label="Hours per weekend day"
              value={state.weekendHours}
              min={0.5}
              max={12}
              onChange={(v) => update({ weekendHours: v })}
            />
          </div>

          {/* Subjects */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Subjects &amp; your confidence
              </span>
              <button
                type="button"
                onClick={addSubject}
                className="text-xs font-bold px-2.5 py-1 rounded-lg border transition-colors"
                style={{ color: GOLD, borderColor: 'rgba(212,175,55,0.4)' }}
              >
                + Add subject
              </button>
            </div>

            {exam.placeholder && (
              <p className="text-xs text-amber-200/80 mb-3 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2">
                These are placeholder names — rename them to match your actual {exam.name} subjects.
              </p>
            )}

            <div className="space-y-3">
              {state.subjects.map((s, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={s.name}
                      placeholder={`Subject ${i + 1}`}
                      onChange={(e) => setSubject(i, { name: e.target.value })}
                      aria-label={`Subject ${i + 1} name`}
                      className="flex-1 min-w-0 rounded-lg bg-white/5 text-white px-3 py-2 text-sm border border-white/15 outline-none focus:ring-2"
                    />
                    <button
                      type="button"
                      onClick={() => removeSubject(i)}
                      aria-label={`Remove ${s.name || `subject ${i + 1}`}`}
                      className="shrink-0 w-8 h-8 rounded-lg border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/40 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex gap-2 mt-2" role="group" aria-label="Confidence">
                    {CONFIDENCE_LEVELS.map((level) => {
                      const active = s.confidence === level;
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setSubject(i, { confidence: level })}
                          aria-pressed={active}
                          className="flex-1 px-2 py-1.5 rounded-lg text-xs font-bold border transition-all"
                          style={active ? CONF_STYLE[level].on : CONF_OFF}
                        >
                          {level}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {state.subjects.length === 0 && (
                <p className="text-xs text-gray-500 italic">
                  No subjects yet — add at least one to weight your weekly hours.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl text-sm font-bold"
              style={{ background: GOLD, color: NAVY }}
            >
              Print / Save as PDF
            </button>
            <button
              type="button"
              onClick={startOver}
              className="px-4 py-2.5 rounded-xl text-sm font-bold border border-white/15 text-gray-300 hover:text-white transition-colors"
            >
              Start over
            </button>
          </div>
        </div>
      </div>

      {/* ---------- PLAN OUTPUT ---------- */}
      <PlanOutput plan={plan} exam={exam} examDate={state.examDate} />
    </div>
  );
}

function HourSlider({ id, label, value, min, max, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {label}
        </label>
        <span className="text-sm font-bold" style={{ color: GOLD }}>
          {value}h
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={0.5}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#D4AF37]"
      />
      <div className="flex justify-between text-[10px] text-gray-600 mt-1">
        <span>{min}h</span>
        <span>{max}h</span>
      </div>
    </div>
  );
}

function PlanOutput({ plan, exam, examDate }) {
  if (!plan.valid) {
    return (
      <div className="rounded-2xl border border-white/10 px-5 py-8 text-center print:hidden" style={{ background: NAVY }}>
        <p className="text-sm text-gray-400">
          {plan.reason || 'Pick your exam date to build a plan.'}
        </p>
      </div>
    );
  }

  const prettyDate = examDate
    ? new Date(`${examDate}T00:00:00`).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: NAVY }}>
      {/* Header / print title */}
      <div className="px-5 py-5 sm:px-6 border-b border-white/10">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          Your {exam.name} study plan
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          {prettyDate && (
            <>
              Exam on <span className="text-white font-semibold">{prettyDate}</span> ·{' '}
            </>
          )}
          <span className="text-white font-semibold">{plan.daysRemaining} days</span> to go
          {' · '}~{plan.weeklyHours}h/week (≈{plan.totalHours}h total)
        </p>
      </div>

      <div className="px-5 py-5 sm:px-6 space-y-6">
        {plan.compressed && (
          <div className="flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
            <span aria-hidden className="text-amber-400 text-lg leading-none">⏱</span>
            <p className="text-xs text-amber-200/90 leading-relaxed">
              Under 30 days left, so this plan skips the long Foundation phase and jumps
              straight into Drilling, Simulation, and Taper. It&apos;s doable, but honest advice:
              protect your review time and don&apos;t add new material late.
            </p>
          </div>
        )}

        {/* Phases */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">
            The {plan.phases.length} phases
          </h3>
          <ol className="space-y-3">
            {plan.phases.map((p, i) => (
              <li key={p.key} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <h4 className="text-white font-bold">
                    <span style={{ color: GOLD }}>{i + 1}. {p.name}</span>
                    <span className="text-gray-500 font-normal text-xs ml-2">
                      {Math.round(p.pct * 100)}% of your time
                    </span>
                  </h4>
                  <span className="text-xs text-gray-400">
                    {p.startLabel} – {p.endLabel} ({p.days} day{p.days === 1 ? '' : 's'})
                  </span>
                </div>
                <p className="text-sm text-gray-300 mt-2 leading-relaxed">{p.focus}</p>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed italic">
                  <span className="not-italic font-semibold" style={{ color: GOLD }}>Why: </span>
                  {p.why}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Weekly allocation */}
        {plan.allocation.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">
              Weekly hours per subject
            </h3>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="px-4 py-2.5 font-semibold">Subject</th>
                    <th className="px-4 py-2.5 font-semibold">Confidence</th>
                    <th className="px-4 py-2.5 font-semibold text-right">Hours / week</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.allocation.map((a) => (
                    <tr key={a.name} className="border-b border-white/5 last:border-0">
                      <td className="px-4 py-2.5 text-gray-200">{a.name}</td>
                      <td className="px-4 py-2.5 text-gray-400">{a.confidence}</td>
                      <td className="px-4 py-2.5 text-right text-white font-semibold">
                        {a.hoursPerWeek}h
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Weak subjects get about twice the weekly hours of Strong ones. This split
              matters most during Drilling — early on, keep touching every subject.
            </p>
          </div>
        )}

        {/* Weekly rhythm */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-2">
            Your weekly rhythm
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">{plan.rhythm}</p>
        </div>

        <p className="text-[11px] text-gray-600 leading-relaxed border-t border-white/10 pt-4">
          This is a study aid, not an official schedule. Adjust it to your life — the phases
          and the weak-subject emphasis matter more than the exact hours.
        </p>
      </div>
    </div>
  );
}
