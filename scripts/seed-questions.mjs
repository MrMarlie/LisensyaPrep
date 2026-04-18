import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const TOKEN = readFileSync('C:/Users/conta/AppData/Local/Temp/sbtoken2.txt', 'utf8').trim()
const PROJECT_REF = 'ndjtnvmlcxxqbrclztzq'
const API = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`

async function query(sql) {
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql }),
  })
  const data = await res.json()
  if (!res.ok || data.message) throw new Error(data.message || JSON.stringify(data))
  return data
}

const MODULE_MAP = {
  'module-1': 'module1.json',
  'module-2': 'module2.json',
  'module-3': 'module3.json',
  'module-4': 'module4.json',
  'module-5': 'module5.json',
  'module-6': 'module6.json',
}

// 1. Create questions table
console.log('Creating questions table...')
await query(`
  CREATE TABLE IF NOT EXISTS public.questions (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    exam_id         TEXT NOT NULL,
    module_id       TEXT NOT NULL,
    question_number INTEGER NOT NULL,
    question        TEXT NOT NULL,
    choices         JSONB NOT NULL,
    answer          TEXT NOT NULL,
    explanation     TEXT,
    difficulty      TEXT,
    UNIQUE (exam_id, module_id, question_number)
  );

  ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

  DROP POLICY IF EXISTS "questions_public_read" ON public.questions;
  CREATE POLICY "questions_public_read" ON public.questions
    FOR SELECT USING (true);
`)
console.log('Table created.')

// 2. Insert questions per module
let total = 0
for (const [moduleId, fileName] of Object.entries(MODULE_MAP)) {
  const filePath = join(__dirname, '..', 'data', 'agriculture', fileName)
  const { questions, difficulty } = JSON.parse(readFileSync(filePath, 'utf8'))

  const values = questions.map((q, i) => {
    const choices = JSON.stringify(q.choices).replace(/'/g, "''")
    const question = q.question.replace(/'/g, "''")
    const answer = q.answer.replace(/'/g, "''")
    const explanation = (q.explanation || '').replace(/'/g, "''")
    return `('agriculture', '${moduleId}', ${i + 1}, '${question}', '${choices}'::jsonb, '${answer}', '${explanation}', '${difficulty}')`
  }).join(',\n  ')

  const sql = `
    INSERT INTO public.questions (exam_id, module_id, question_number, question, choices, answer, explanation, difficulty)
    VALUES
      ${values}
    ON CONFLICT (exam_id, module_id, question_number) DO NOTHING;
  `

  await query(sql)
  console.log(`  ${moduleId}: ${questions.length} questions inserted`)
  total += questions.length
}

// 3. Verify
const result = await query(`SELECT module_id, COUNT(*) as count FROM public.questions GROUP BY module_id ORDER BY module_id;`)
console.log('\nVerification:')
result.forEach(r => console.log(`  ${r.module_id}: ${r.count} questions`))
console.log(`\nDone! ${total} questions seeded.`)
