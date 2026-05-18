import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

function authCheck() {
  const cookieStore = cookies();
  const session = cookieStore.get('admin_session');
  return session?.value === process.env.ADMIN_PASSWORD;
}

export async function POST(req: NextRequest) {
  if (!authCheck()) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { action, promo_id, payload } = await req.json();
  if (!action || !promo_id) {
    return NextResponse.json({ error: 'action and promo_id required.' }, { status: 400 });
  }

  const supabase = supabaseAdmin();

  const { data: current, error: fetchErr } = await supabase
    .from('promo_counters')
    .select('*')
    .eq('id', promo_id)
    .single();

  if (fetchErr || !current) {
    return NextResponse.json({ error: 'Promo not found.' }, { status: 404 });
  }

  let updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
  let auditNewValue: Record<string, unknown> = {};

  switch (action) {
    case 'edit_counter': {
      const { claimed, total_slots } = payload || {};
      if (claimed === undefined || total_slots === undefined) {
        return NextResponse.json({ error: 'claimed and total_slots required.' }, { status: 400 });
      }
      updateData = { ...updateData, claimed: Number(claimed), total_slots: Number(total_slots), active: Number(claimed) < Number(total_slots) };
      auditNewValue = { claimed: Number(claimed), total_slots: Number(total_slots) };
      break;
    }
    case 'edit_pricing': {
      const { regular_price, discounted_price } = payload || {};
      if (!regular_price || !discounted_price) {
        return NextResponse.json({ error: 'regular_price and discounted_price required.' }, { status: 400 });
      }
      updateData = { ...updateData, regular_price: Number(regular_price), discounted_price: Number(discounted_price), discount_amount: Number(regular_price) - Number(discounted_price) };
      auditNewValue = { regular_price: Number(regular_price), discounted_price: Number(discounted_price) };
      break;
    }
    case 'pause': {
      updateData = { ...updateData, active: false };
      auditNewValue = { active: false };
      break;
    }
    case 'resume': {
      updateData = { ...updateData, active: current.claimed < current.total_slots };
      auditNewValue = { active: true };
      break;
    }
    case 'reset': {
      if (current.active) {
        return NextResponse.json({ error: 'Pause the promo before resetting.' }, { status: 400 });
      }
      updateData = { ...updateData, claimed: 0, active: false };
      auditNewValue = { claimed: 0 };
      break;
    }
    case 'extend': {
      const { additional_slots } = payload || {};
      if (!additional_slots || Number(additional_slots) <= 0) {
        return NextResponse.json({ error: 'additional_slots must be positive.' }, { status: 400 });
      }
      const newTotal = current.total_slots + Number(additional_slots);
      updateData = { ...updateData, total_slots: newTotal, active: true };
      auditNewValue = { total_slots: newTotal };
      break;
    }
    default:
      return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  }

  const { error: updateErr } = await supabase
    .from('promo_counters')
    .update(updateData)
    .eq('id', promo_id);

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 500 });
  }

  await supabase.from('promo_audit_log').insert({
    promo_id,
    action,
    old_value: {
      claimed: current.claimed,
      total_slots: current.total_slots,
      active: current.active,
      regular_price: current.regular_price,
      discounted_price: current.discounted_price,
    },
    new_value: auditNewValue,
    performed_by: 'admin',
    reason: payload?.reason || null,
  });

  return NextResponse.json({ success: true });
}
