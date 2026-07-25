import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getExamUser, examByKey } from '@/lib/mockExam';

// GET /api/mock/[exam]/review?attemptId=... — full rationale review AFTER submit.
// This is the only endpoint that ever returns correct answers + rationales.
export async function GET(req: NextRequest, { params }: { params: { exam: string } }) {
  const exam = examByKey(params.exam);
  if (!exam) return NextResponse.json({ error: 'Unknown exam.' }, { status: 404 });

  const user = await getExamUser();
  if (!user) return NextResponse.json({ error: 'not-logged-in' }, { status: 401 });

  const attemptId = req.nextUrl.searchParams.get('attemptId');
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
  if (attempt.status !== 'submitted') {
    return NextResponse.json({ error: 'not-submitted' }, { status: 403 });
  }

  const { data: bank } = await admin
    .from('mock_questions')
    .select('item_no, subject, stem, options, answer, rationale')
    .eq('product', attempt.product);
  const byId = new Map((bank || []).map((q) => [q.item_no, q]));
  const answers = attempt.answers || {};

  const items = attempt.question_order
    .map((o: { id: number; order: string[] }) => {
      const q = byId.get(o.id);
      if (!q) return null;
      const your = answers[String(o.id)] || null;
      return {
        id: o.id,
        subject: q.subject,
        stem: q.stem,
        choices: o.order.map((key: string) => ({ key, text: q.options[key] })),
        yourAnswer: your,
        correctAnswer: q.answer,
        correct: your === q.answer,
        rationale: q.rationale,
      };
    })
    .filter(Boolean);

  return NextResponse.json({
    examTitle: exam.title,
    score: attempt.score,
    total: attempt.total,
    percent: attempt.total ? attempt.score / attempt.total : 0,
    passed: attempt.passed,
    perSubject: attempt.per_subject,
    submittedAt: attempt.submitted_at,
    items,
  });
}
