-- ============================================================================
-- PNLE Mock Board — extend Mock Board schema for the nursing products.
-- Run in the Supabase SQL editor (after 007_mock_board.sql).
-- ============================================================================
-- Structure: ONE ₱99 purchase grants the entitlement product 'mock-pnle', which
-- unlocks all 5 Nursing Practice modules. Each module has its OWN question bank
-- + attempts product ('mock-pnle-np1' .. 'mock-pnle-np5'), sat separately at
-- PRC's ~2 hours per 100-item test. This only widens the three product CHECK
-- constraints; no new tables, and existing LET data is untouched.
-- ============================================================================

-- 1. Question bank: allow the 5 per-module products.
ALTER TABLE mock_questions DROP CONSTRAINT IF EXISTS mock_questions_product_check;
ALTER TABLE mock_questions ADD CONSTRAINT mock_questions_product_check
  CHECK (product IN (
    'mock-gened', 'mock-profed',
    'mock-pnle-np1', 'mock-pnle-np2', 'mock-pnle-np3', 'mock-pnle-np4', 'mock-pnle-np5'
  ));

-- 2. Entitlements: allow the umbrella 'mock-pnle' product.
ALTER TABLE exam_access DROP CONSTRAINT IF EXISTS exam_access_product_check;
ALTER TABLE exam_access ADD CONSTRAINT exam_access_product_check
  CHECK (product IN ('mock-gened', 'mock-profed', 'mock-pnle'));

-- 3. Attempts: allow the 5 per-module products.
ALTER TABLE mock_attempts DROP CONSTRAINT IF EXISTS mock_attempts_product_check;
ALTER TABLE mock_attempts ADD CONSTRAINT mock_attempts_product_check
  CHECK (product IN (
    'mock-gened', 'mock-profed',
    'mock-pnle-np1', 'mock-pnle-np2', 'mock-pnle-np3', 'mock-pnle-np4', 'mock-pnle-np5'
  ));
