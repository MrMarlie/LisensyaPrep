-- Run this in Supabase SQL editor before deploying
CREATE TABLE promo_counters (
  id TEXT PRIMARY KEY,
  promo_name TEXT NOT NULL,
  total_slots INTEGER DEFAULT 100,
  claimed INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  discount_amount DECIMAL DEFAULT 100,
  regular_price DECIMAL DEFAULT 249,
  discounted_price DECIMAL DEFAULT 149,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE promo_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_id TEXT NOT NULL,
  action TEXT NOT NULL,
  old_value JSONB,
  new_value JSONB,
  performed_by TEXT,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed with claimed: 1 (1 ProfEd order already verified)
INSERT INTO promo_counters VALUES (
  'let-first-100-shared', 'First 100 Buyers — LET Mastery',
  100, 1, true, 100, 249, 149, NOW(), NOW()
);
