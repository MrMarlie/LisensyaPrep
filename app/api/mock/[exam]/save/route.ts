import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getExamUser, examByKey } from '@/lib/mockExam';

const VALID = ['A', 'B', 'C', 'D'];

// POST /api/mock/[exam]/save — autosave the full answers map (enables resume).
export async function POST(req: NextRequest, { params }: { params: { exam: string } }) {
  const exam = examByKey(params.exam);
  if (!exam) return NextResponse.json({ error: 'Unknown exam.' }, { status: 404 });

  const user = await getExamUser();
  if (!user) return NextResponse.json({ error: 'not-logged-in' }, { status: 401 });

  const { attemptId, answers } = await req.json();
  if (!attemptId || typeof answers !== 'object' || answers === null) {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 });
  }

  const admin = supabaseAdmin();
  const { data: attempt } = await admin
    .from('mock_attempts')
    .select('id, user_id, status')
    .eq('id', attemptId)
    .maybeSingle();

  if (!attempt || attempt.user_id !== user.id) {
    return NextResponse.json({ error: 'Attempt not found.' }, { status: 404 });
  }
  if (attempt.status !== 'in_progress') {
    return NextResponse.json({ error: 'already-submitted' }, { status: 409 });
  }

  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(answers)) {
    if (typeof v === 'string' && VALID.includes(v)) clean[k] = v;
  }

  const { error } = await admin
    .from('mock_attempts')
    .update({ answers: clean })
    .eq('id', attemptId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
