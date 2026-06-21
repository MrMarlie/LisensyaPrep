-- Run this in Supabase SQL editor to add the Agriculture (ALE) First 100 promo counter
INSERT INTO promo_counters VALUES (
  'agri-first-100-shared', 'First 100 Buyers — Agriculture Mastery',
  100, 0, true, 100, 249, 149, NOW(), NOW()
);
