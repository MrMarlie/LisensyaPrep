import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getExamUser, examByKey, gradeAttempt } from '@/lib/mockExam';

const VALID = ['A', 'B', 'C', 'D'];

// POST /api/mock/[exam]/submit — grade server-side (authoritative) and finalize.
export async function POST(req: NextRequest, { params }: { params: { exam: string } }) {
  const exam = examByKey(params.exam);
  if (!exam) return NextResponse.json({ error: 'Unknown exam.' }, { status: 404 });

  const user = await getExamUser();
  if (!user) return NextResponse.json({ error: 'not-logged-in' }, { status: 401 });

  const { attemptId, answers } = await req.json();
  if (!attemptId) return NextResponse.json({ error: 'attemptId required.' }, { status: 400 });

  const admin = supabaseAdmin();
  const { data: attempt } = await admin
    .from('mock_attempts')
    .select('*')
    .eq('id', attemptId)
    .maybeSingle();

  if (!attempt || attempt.user_id !== user.id) {
    return NextResponse.json({ error: 'Attempt not found.' }, { status: 404 });
  }

  // Idempotent: return stored results if already graded.
  if (attempt.status === 'submitted') {
    return NextResponse.json({
      attemptId: attempt.id,
      score: attempt.score,
      total: attempt.total,
      percent: attempt.total ? attempt.score / attempt.total : 0,
      passed: attempt.passed,
      perSubject: attempt.per_subject,
      alreadySubmitted: true,
    });
  }

  // Merge any final answers sent with the submit, then grade.
  if (answers && typeof answers === 'object') {
    const clean: Record<string, string> = { ...(attempt.answers || {}) };
    for (const [k, v] of Object.entries(answers)) {
      if (typeof v === 'string' && VALID.includes(v)) clean[k] = v;
    }
    attempt.answers = clean;
    await admin.from('mock_attempts').update({ answers: clean }).eq('id', attempt.id);
  }

  const result = await gradeAttempt(admin, attempt);
  return NextResponse.json({ attemptId: attempt.id, ...result });
}
