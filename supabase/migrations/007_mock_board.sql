-- ============================================================================
-- Mock Board Exam — schema (run in Supabase SQL editor)
-- ============================================================================
-- SECURITY: this repo is PUBLIC. Question content is NOT in this file — it is
-- seeded separately via scripts/seed_mock_questions.mjs using the service-role
-- key. All three tables have RLS enabled with NO anon/public read policy, so
-- only the server (service-role) can read them. The gated API enforces
-- entitlement per logged-in user.
-- ============================================================================

-- 1. Question bank (paid content — seeded from local JSON, never committed) ----
CREATE TABLE IF NOT EXISTS mock_questions (
  id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  product      text    NOT NULL CHECK (product IN ('mock-gened', 'mock-profed')),
  item_no      int     NOT NULL,
  subject      text    NOT NULL,
  stem         text    NOT NULL,
  options      jsonb   NOT NULL,          -- {"A":"...","B":"...","C":"...","D":"..."}
  answer       text    NOT NULL CHECK (answer IN ('A','B','C','D')),
  rationale    text    NOT NULL,
  lock_options boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (product, item_no)
);
CREATE INDEX IF NOT EXISTS mock_questions_product_idx ON mock_questions (product);
ALTER TABLE mock_questions ENABLE ROW LEVEL SECURITY;
-- No policy = no anon/authenticated access. Service role bypasses RLS.

-- 2. Entitlements (who may take which mock, and until when) --------------------
CREATE TABLE IF NOT EXISTS exam_access (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email      text NOT NULL,                       -- lowercased buyer email
  user_id    uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  product    text NOT NULL CHECK (product IN ('mock-gened', 'mock-profed')),
  order_id   text,                                -- ref orders.order_id
  status     text NOT NULL DEFAULT 'active' CHECK (status IN ('active','revoked')),
  granted_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT '2026-10-01T00:00:00+08:00',
  UNIQUE (email, product)
);
CREATE INDEX IF NOT EXISTS exam_access_email_idx ON exam_access (email);
ALTER TABLE exam_access ENABLE ROW LEVEL SECURITY;
-- Let a logged-in user read ONLY their own entitlement rows (by email).
DROP POLICY IF EXISTS exam_access_self_read ON exam_access;
CREATE POLICY exam_access_self_read ON exam_access
  FOR SELECT TO authenticated
  USING (lower(email) = lower((auth.jwt() ->> 'email')));

-- 3. Attempts (server-authoritative timer, resume, results, history) ----------
CREATE TABLE IF NOT EXISTS mock_attempts (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid REFERENCES auth.users (id) ON DELETE CASCADE,
  email          text NOT NULL,
  product        text NOT NULL CHECK (product IN ('mock-gened', 'mock-profed')),
  status         text NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','submitted')),
  started_at     timestamptz NOT NULL DEFAULT now(),
  deadline_at    timestamptz NOT NULL,            -- started_at + 180 min (server-set)
  submitted_at   timestamptz,
  duration_secs  int NOT NULL DEFAULT 10800,      -- 180 minutes
  question_order jsonb NOT NULL,                  -- [{id, opts:['B','A','D','C']}, ...] per-attempt shuffle
  answers        jsonb NOT NULL DEFAULT '{}'::jsonb,  -- { "<questionId>": "B", ... } (original letters)
  score          int,
  total          int,
  passed         boolean,
  per_subject    jsonb,
  created_at     timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS mock_attempts_user_idx ON mock_attempts (user_id, product);
CREATE INDEX IF NOT EXISTS mock_attempts_open_idx  ON mock_attempts (user_id, product, status);
ALTER TABLE mock_attempts ENABLE ROW LEVEL SECURITY;
-- Server (service-role) does all reads/writes; keep RLS closed to clients.
