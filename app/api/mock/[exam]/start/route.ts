import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  getExamUser,
  checkAccess,
  examByKey,
  createAttempt,
  resumeAttempt,
  gradeAttempt,
} from '@/lib/mockExam';

// POST /api/mock/[exam]/start — begin or resume a timed attempt.
export async function POST(req: NextRequest, { params }: { params: { exam: string } }) {
  const exam = examByKey(params.exam);
  if (!exam) return NextResponse.json({ error: 'Unknown exam.' }, { status: 404 });

  const user = await getExamUser();
  if (!user) return NextResponse.json({ error: 'not-logged-in' }, { status: 401 });

  const access = await checkAccess(user.email, exam.product);
  if (!access.ok) {
    return NextResponse.json(
      { error: access.reason, expiresAt: access.access?.expires_at ?? null },
      { status: 403 },
    );
  }

  const admin = supabaseAdmin();

  // Resume an open attempt if the clock hasn't run out; otherwise finalize it.
  const { data: open } = await admin
    .from('mock_attempts')
    .select('*')
    .eq('user_id', user.id)
    .eq('product', exam.product)
    .eq('status', 'in_progress')
    .order('started_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  let attempt = open;
  let questions;
  let resumed = false;

  if (open && new Date(open.deadline_at).getTime() > Date.now()) {
    ({ questions } = await resumeAttempt(admin, open));
    resumed = true;
  } else {
    if (open) await gradeAttempt(admin, open); // deadline passed → auto-submit stale attempt
    ({ attempt, questions } = await createAttempt(user, exam.product));
  }

  return NextResponse.json({
    resumed,
    attemptId: attempt.id,
    examTitle: exam.title,
    deadlineAt: attempt.deadline_at,
    durationSecs: attempt.duration_secs,
    answers: attempt.answers ?? {},
    accessExpiresAt: access.access.expires_at,
    questions,
  });
}
