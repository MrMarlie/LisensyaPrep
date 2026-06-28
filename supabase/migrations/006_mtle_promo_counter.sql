-- Run this in Supabase SQL editor to add the MTLE First 100 promo counter.
-- Column order mirrors 002_pnle_promo_counter.sql:
--   id, promo_name, total_slots, claimed, active, discount_amount, regular_price, discounted_price, created_at, updated_at

-- Medical Technology (MTLE) Mastery — ₱199 launch, ₱249 after first 100 (₱50 off)
INSERT INTO promo_counters VALUES (
  'mtle-first-100-shared', 'First 100 Buyers — MTLE Mastery',
  100, 0, true, 50, 249, 199, NOW(), NOW()
);
