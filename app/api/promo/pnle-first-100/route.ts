import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Always read live from Supabase — never serve a build-time cached count.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export async function GET() {
  try {
    const supabase = supabaseAdmin();
    const { data, error } = await supabase
      .from('promo_counters')
      .select('id, promo_name, claimed, total_slots, active, discount_amount, regular_price, discounted_price')
      .eq('id', 'pnle-first-100-shared')
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Promo not found.' }, { status: 404 });
    }

    const remaining = Math.max(0, data.total_slots - data.claimed);
    const percent_filled = Math.round((data.claimed / data.total_slots) * 100);

    return NextResponse.json(
      {
        promo_id: data.id,
        promo_name: data.promo_name,
        claimed: data.claimed,
        total_slots: data.total_slots,
        remaining,
        percent_filled,
        active: data.active,
        discount_amount: data.discount_amount,
        regular_price: data.regular_price,
        discounted_price: data.discounted_price,
        applies_to: ['pnle-mastery'],
      },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  } catch (err) {
    console.error('PNLE promo fetch error:', err);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
