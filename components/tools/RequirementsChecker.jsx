'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  CHECKER_EXAMS,
  TAKER_TYPES,
  LAST_REVIEWED,
  findExam,
  buildChecklist,
} from '@/lib/requirementsCheckerConfig';

// Brand tokens (match the other tools): navy surfaces, gold accents.
const NAVY = '#0A1929';
const GOLD = '#D4AF37';
const GREEN = '#22c55e';
const STORAGE_KEY = 'lp_requirements_checker_v1';

// Persisted shape: { examId, taker, checked: { [examId::taker]: { [itemLabel]: true } } }.
// Checked state is keyed by item LABEL (not index) so it survives config edits, and
// scoped per exam+taker so switching tracks never mixes progress.
function defaultState() {
  return {
    examId: CHECKER_EXAMS[0].id,
    taker: TAKER_TYPES[0].id,
    checked: {},
  };
}

function scopeKey(examId, taker) {
  // CSE ignores taker type (one document list), so collapse its scope.
  const exam = findExam(examId);
  return exam.track === 'cse' ? `${examId}::all` : `${examId}::${taker}`;
}

export default function RequirementsChecker() {
  const [state, setState] = useState(defaultState);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state once, client-only.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && typeof saved === 'object') {
          setState({ ...defaultState(), ...saved, checked: saved.checked || {} });
        }
      }
    } catch {
      // Corrupt/blocked storage — fall back to defaults silently.
    }
    setHydrated(true);
  }, []);

  // Persist after hydration so we never clobber saved data with defaults.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota/private-mode errors */
    }
  }, [state, hydrated]);

  const exam = findExam(state.examId);
  const isCse = exam.track === 'cse';

  const items = useMemo(
    () => buildChecklist(state.examId, state.taker),
    [state.examId, state.taker]
  );

  const scope = scopeKey(state.examId, state.taker);
  const checkedForScope = state.checked[scope] || {};
  const doneCount = items.filter((it) => checkedForScope[it.label]).length;
  const pct = items.length ? Math.round((doneCount / items.length) * 100) : 0;
  const ready = items.length > 0 && doneCount === items.length;

  function toggleItem(label) {
    setState((prev) => {
      const prevScope = prev.checked[scope] || {};
      const nextScope = { ...prevScope, [label]: !prevScope[label] };
      return { ...prev, checked: { ...prev.checked, [scope]: nextScope } };
    });
  }

  function resetScope() {
    setState((prev) => {
      const next = { ...prev.checked };
      delete next[scope];
      return { ...prev, checked: next };
    });
  }

  return (
    <div className="space-y-6">
      {/* ---------- STEP 1: pick exam + taker type ---------- */}
      <div
        className="rounded-2xl border border-white/10 overflow-hidden print:hidden"
        style={{ background: NAVY }}
      >
        <div className="px-5 py-5 sm:px-6 border-b border-white/10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            <span style={{ color: GOLD }}>Step 1.</span> Pick your exam
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Your checklist and progress save on this device automatically.
          </p>
        </div>

        <div className="px-5 py-5 sm:px-6 space-y-6">
          {/* Exam */}
          <div>
            <label
              htmlFor="rc-exam"
              className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2"
            >
              Which exam?
            </label>
            <select
              id="rc-exam"
              value={state.examId}
              onChange={(e) => setState((p) => ({ ...p, examId: e.target.value }))}
              className="w-full rounded-lg bg-white/5 text-white px-3 py-2.5 text-sm border border-white/15 outline-none focus:ring-2"
            >
              {CHECKER_EXAMS.map((e) => (
                <option key={e.id} value={e.id} style={{ background: NAVY }}>
                  {e.name} — {e.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Taker type — hidden for CSE, which uses one document list. */}
          {!isCse && (
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                Are you a first-timer or retaker?
              </span>
              <div className="flex gap-2" role="group" aria-label="Taker type">
                {TAKER_TYPES.map((t) => {
                  const active = state.taker === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setState((p) => ({ ...p, taker: t.id }))}
                      aria-pressed={active}
                      className="flex-1 px-3 py-2.5 rounded-lg text-sm font-bold border transition-all"
                      style={
                        active
                          ? { background: 'rgba(212,175,55,0.15)', color: GOLD, borderColor: GOLD }
                          : {
                              background: 'rgba(255,255,255,0.04)',
                              color: '#cbd5e1',
                              borderColor: 'rgba(255,255,255,0.1)',
                            }
                      }
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---------- STEP 2: the checklist ---------- */}
      <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: NAVY }}>
        <div className="px-5 py-5 sm:px-6 border-b border-white/10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            <span className="print:hidden" style={{ color: GOLD }}>
              Step 2.{' '}
            </span>
            {exam.name} requirements checklist
            {!isCse && (
              <span className="text-gray-500 font-normal text-sm ml-2">
                ({state.taker === 'retaker' ? 'Retaker' : 'First-timer'})
              </span>
            )}
          </h2>
          <p className="text-sm text-gray-400 mt-1">{exam.fullName}</p>
        </div>

        <div className="px-5 py-5 sm:px-6 space-y-5">
          {/* Progress bar (gold fill; turns green when ready) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Progress
              </span>
              <span className="text-sm font-bold" style={{ color: ready ? GREEN : GOLD }}>
                {doneCount}/{items.length} · {pct}%
              </span>
            </div>
            <div
              className="h-3 w-full rounded-full overflow-hidden border border-white/10"
              style={{ background: 'rgba(255,255,255,0.05)' }}
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Application readiness"
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${pct}%`, background: ready ? GREEN : GOLD }}
              />
            </div>
          </div>

          {/* Application-ready banner */}
          {ready && (
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3 border"
              style={{ background: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.4)' }}
            >
              <span aria-hidden className="text-2xl leading-none">
                ✅
              </span>
              <div>
                <p className="font-bold" style={{ color: GREEN }}>
                  You&apos;re application-ready!
                </p>
                <p className="text-xs text-gray-300 mt-0.5">
                  Everything on this list is checked off. Do a final confirmation in{' '}
                  {isCse ? 'the CSC announcement' : 'LERIS'} before your appointment.
                </p>
              </div>
            </div>
          )}

          {/* Checklist */}
          <ul className="space-y-3">
            {items.map((it) => {
              const isChecked = !!checkedForScope[it.label];
              return (
                <li
                  key={it.label}
                  className="rounded-xl border p-4 transition-colors"
                  style={{
                    borderColor: isChecked ? 'rgba(34,197,94,0.35)' : 'rgba(255,255,255,0.1)',
                    background: isChecked ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.03)',
                  }}
                >
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItem(it.label)}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-[#22c55e] cursor-pointer"
                    />
                    <span className="min-w-0">
                      <span
                        className="block text-sm font-semibold"
                        style={{ color: isChecked ? '#86efac' : '#f1f5f9' }}
                      >
                        {it.label}
                      </span>
                      {it.note && (
                        <span className="block text-xs text-gray-400 mt-1 leading-relaxed">
                          {it.note}
                        </span>
                      )}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-1 print:hidden">
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
              onClick={resetScope}
              className="px-4 py-2.5 rounded-xl text-sm font-bold border border-white/15 text-gray-300 hover:text-white transition-colors"
            >
              Reset this checklist
            </button>
          </div>

          {/* Footer note — required on every checklist. */}
          <p className="text-[11px] text-gray-500 leading-relaxed border-t border-white/10 pt-4">
            Requirements are set by each cycle&apos;s official announcement — always confirm the
            current list in {isCse ? 'CSC' : 'LERIS'} before your appointment. Last reviewed:{' '}
            {LAST_REVIEWED}.
          </p>
        </div>
      </div>
    </div>
  );
}
