// Shared config + server logic for the Mock Board Exam.
// SERVER-ONLY helpers here read the question bank (paid content) — do not import
// the DB-touching functions into client components.

import { createClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { DURATION_SECS, PASS_MARK, EXAMS, examByKey, examByProduct, examBySlug } from '@/lib/mockExamMeta';

// Re-export the client-safe metadata so server code can import everything from here.
export { DURATION_SECS, PASS_MARK, EXAMS, examByKey, examByProduct, examBySlug };

const LETTERS = ['A', 'B', 'C', 'D'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Auth + entitlement ──────────────────────────────────────────────────────

export async function getExamUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user || null;
}

// Returns { ok, reason, access } — reason ∈ 'no-user'|'no-access'|'revoked'|'expired'
export async function checkAccess(email, product) {
  if (!email) return { ok: false, reason: 'no-user' };
  const admin = supabaseAdmin();
  const { data } = await admin
    .from('exam_access')
    .select('*')
    .eq('email', email.toLowerCase())
    .eq('product', product)
    .maybeSingle();
  if (!data) return { ok: false, reason: 'no-access' };
  if (data.status !== 'active') return { ok: false, reason: 'revoked' };
  if (new Date(data.expires_at).getTime() < Date.now())
    return { ok: false, reason: 'expired', access: data };
  return { ok: true, access: data };
}

// ── Attempt lifecycle ───────────────────────────────────────────────────────

// Build the client-safe exam payload (NO correct answers / rationales) from a
// stored question_order + the question bank.
async function buildQuestionPayload(admin, product, order) {
  const { data: bank } = await admin
    .from('mock_questions')
    .select('item_no, subject, stem, options')
    .eq('product', product);
  const byId = new Map((bank || []).map((q) => [q.item_no, q]));
  return order.map((o) => {
    const q = byId.get(o.id);
    return {
      id: o.id,
      subject: q.subject,
      stem: q.stem,
      // choices are pre-shuffled per attempt; `key` is the ORIGINAL letter (not the answer)
      choices: o.order.map((key) => ({ key, text: q.options[key] })),
    };
  });
}

// Create a fresh shuffled attempt. Shuffles question order AND option order
// (except lock_options questions, whose A–D order is preserved).
export async function createAttempt(user, product) {
  const admin = supabaseAdmin();
  const { data: bank } = await admin
    .from('mock_questions')
    .select('item_no, lock_options')
    .eq('product', product);
  if (!bank || bank.length === 0) throw new Error('Question bank empty');

  const order = shuffle(bank).map((q) => ({
    id: q.item_no,
    order: q.lock_options ? [...LETTERS] : shuffle(LETTERS),
  }));

  const now = Date.now();
  const { data: attempt, error } = await admin
    .from('mock_attempts')
    .insert({
      user_id: user.id,
      email: user.email.toLowerCase(),
      product,
      status: 'in_progress',
      started_at: new Date(now).toISOString(),
      deadline_at: new Date(now + DURATION_SECS * 1000).toISOString(),
      duration_secs: DURATION_SECS,
      question_order: order,
      answers: {},
    })
    .select()
    .single();
  if (error) throw error;

  const questions = await buildQuestionPayload(admin, product, order);
  return { attempt, questions };
}

// Resume an in-progress attempt (rebuilds the same shuffled payload).
export async function resumeAttempt(admin, attempt) {
  const questions = await buildQuestionPayload(admin, attempt.product, attempt.question_order);
  return { attempt, questions };
}

// Grade an attempt server-side (authoritative) and mark it submitted.
export async function gradeAttempt(admin, attempt) {
  const { data: bank } = await admin
    .from('mock_questions')
    .select('item_no, subject, answer')
    .eq('product', attempt.product);
  const byId = new Map((bank || []).map((q) => [q.item_no, q]));

  const answers = attempt.answers || {};
  let score = 0;
  const perSubject = {};
  for (const o of attempt.question_order) {
    const q = byId.get(o.id);
    if (!q) continue;
    const subj = q.subject;
    perSubject[subj] = perSubject[subj] || { correct: 0, total: 0 };
    perSubject[subj].total += 1;
    if (answers[String(o.id)] && answers[String(o.id)] === q.answer) {
      score += 1;
      perSubject[subj].correct += 1;
    }
  }
  const total = attempt.question_order.length;
  const passed = total > 0 && score / total >= PASS_MARK;

  await admin
    .from('mock_attempts')
    .update({
      status: 'submitted',
      submitted_at: new Date().toISOString(),
      score,
      total,
      passed,
      per_subject: perSubject,
    })
    .eq('id', attempt.id);

  return { score, total, passed, perSubject, percent: total ? score / total : 0 };
}
