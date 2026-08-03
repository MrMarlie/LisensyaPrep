// Seed the mock_questions table with the PNLE Mock Board (5 module products).
// Paid content — never committed to the public repo — so this runs locally
// against Supabase using the service-role key.
//
// Prereqs: run `python scripts/parse_pnle_mock.py` first (creates the JSON),
//          and apply supabase/migrations/008_pnle_mock.sql.
//
// Run:  node --env-file=.env.local scripts/seed_pnle_mock.mjs
//
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'node:fs';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
  console.error('Run with: node --env-file=.env.local scripts/seed_pnle_mock.mjs');
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

const FILES = {
  'mock-pnle-np1': 'private/mock-board/pnle-np1.json',
  'mock-pnle-np2': 'private/mock-board/pnle-np2.json',
  'mock-pnle-np3': 'private/mock-board/pnle-np3.json',
  'mock-pnle-np4': 'private/mock-board/pnle-np4.json',
  'mock-pnle-np5': 'private/mock-board/pnle-np5.json',
};

for (const [product, file] of Object.entries(FILES)) {
  const data = JSON.parse(readFileSync(file, 'utf-8'));
  if (data.count !== 100) {
    console.error(`✗ ${product}: expected 100 items, got ${data.count}. Aborting.`);
    process.exit(1);
  }
  const rows = data.items.map((it) => ({
    product,
    item_no: it.id,
    subject: it.subject,
    stem: it.stem,
    options: it.options,
    answer: it.answer,
    rationale: it.rationale,
    lock_options: it.lockOptions,
  }));

  const { error } = await supabase
    .from('mock_questions')
    .upsert(rows, { onConflict: 'product,item_no' });

  if (error) {
    console.error(`✗ ${product}: ${error.message}`);
    process.exit(1);
  }
  console.log(`✓ ${product}: upserted ${rows.length} questions`);
}

// Verify counts server-side
for (const product of Object.keys(FILES)) {
  const { count } = await supabase
    .from('mock_questions')
    .select('*', { count: 'exact', head: true })
    .eq('product', product);
  console.log(`   ${product} in DB: ${count}`);
}
console.log('Done.');
