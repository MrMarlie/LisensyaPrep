-- Run this in Supabase SQL editor to add the PNLE First 100 promo counter
INSERT INTO promo_counters VALUES (
  'pnle-first-100-shared', 'First 100 Buyers — PNLE Mastery',
  100, 0, true, 50, 249, 199, NOW(), NOW()
);
