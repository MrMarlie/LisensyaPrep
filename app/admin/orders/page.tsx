import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import AdminOrdersClient from './AdminOrdersClient';

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

export default async function AdminOrdersPage() {
  const cookieStore = cookies();
  const session = cookieStore.get('admin_session');
  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login');
  }

  const supabase = supabaseAdmin();
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen p-8 text-red-400">
        Error loading orders: {error.message}
      </div>
    );
  }

  const pending = orders?.filter((o) => o.status === 'pending').length ?? 0;
  const delivered = orders?.filter((o) => o.status === 'delivered').length ?? 0;
  const total = orders?.length ?? 0;
  const revenue = orders?.filter((o) => ['verified', 'delivered'].includes(o.status)).reduce((s, o) => s + (o.amount || 149), 0) ?? 0;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Order Dashboard</h1>
            <p className="text-gray-500 text-sm">LisensyaPrep — LET ProfEd Mastery System</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: total, color: 'text-white' },
            { label: 'Pending', value: pending, color: 'text-yellow-400' },
            { label: 'Delivered', value: delivered, color: 'text-green-400' },
            { label: 'Revenue', value: `₱${revenue.toLocaleString()}`, color: 'text-yellow-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#0f1629] border border-white/10 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">{label}</p>
              <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <AdminOrdersClient orders={orders ?? []} />
      </div>
    </div>
  );
}
