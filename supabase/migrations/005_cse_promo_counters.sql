-- Run this in Supabase SQL editor to add the CSE First 100 promo counters.
-- One counter per product — SubProfessional and Professional are priced separately.
-- Column order mirrors 004_agri_promo_counter.sql:
--   id, promo_name, total_slots, claimed, active, discount_amount, regular_price, discounted_price, created_at, updated_at

-- CSE SubProfessional Mastery — ₱149 launch, ₱199 after first 100 (₱50 off)
INSERT INTO promo_counters VALUES (
  'cse-subprof-first-100-shared', 'First 100 Buyers — CSE SubProfessional Mastery',
  100, 0, true, 50, 199, 149, NOW(), NOW()
);

-- CSE Professional Mastery — ₱199 launch, ₱249 after first 100 (₱50 off)
INSERT INTO promo_counters VALUES (
  'cse-pro-first-100-shared', 'First 100 Buyers — CSE Professional Mastery',
  100, 0, true, 50, 249, 199, NOW(), NOW()
);
