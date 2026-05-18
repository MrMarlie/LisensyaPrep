import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import AdminPromosClient from './AdminPromosClient';

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export default async function AdminPromosPage() {
  const cookieStore = cookies();
  const session = cookieStore.get('admin_session');
  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login');
  }

  const supabase = supabaseAdmin();

  const { data: promo, error: promoErr } = await supabase
    .from('promo_counters')
    .select('*')
    .eq('id', 'let-first-100-shared')
    .single();

  const { data: auditLog } = await supabase
    .from('promo_audit_log')
    .select('*')
    .eq('promo_id', 'let-first-100-shared')
    .order('created_at', { ascending: false })
    .limit(50);

  if (promoErr || !promo) {
    return (
      <div className="min-h-screen p-8 text-red-400">
        Error loading promo: {promoErr?.message || 'Not found. Did you run the Supabase migration?'}
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Promo Management</h1>
            <p className="text-gray-500 text-sm">First 100 Buyers — LET Mastery (Shared Counter)</p>
          </div>
          <Link href="/admin/orders" className="text-yellow-400 hover:text-yellow-300 text-sm transition-colors">
            ← Orders
          </Link>
        </div>
        <AdminPromosClient promo={promo} auditLog={auditLog ?? []} />
      </div>
    </div>
  );
}
