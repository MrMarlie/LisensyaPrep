import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import AdminWaitlistClient from './AdminWaitlistClient';

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

function startOfDay(daysAgo: number) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export default async function AdminWaitlistPage() {
  const cookieStore = cookies();
  const session = cookieStore.get('admin_session');
  if (!session || session.value !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login');
  }

  const supabase = supabaseAdmin();
  const { data: leads, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen p-8 text-red-400">
        Error loading waitlist: {error.message}
      </div>
    );
  }

  const total = leads?.length ?? 0;
  const today = leads?.filter((l) => l.created_at >= startOfDay(0)).length ?? 0;
  const thisWeek = leads?.filter((l) => l.created_at >= startOfDay(7)).length ?? 0;

  // Source breakdown — top 5
  const sourceCounts: Record<string, number> = {};
  for (const l of leads ?? []) {
    const src = l.source || 'direct';
    sourceCounts[src] = (sourceCounts[src] ?? 0) + 1;
  }
  const topSources = Object.entries(sourceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-white">Waitlist Dashboard</h1>
          <p className="text-gray-500 text-sm">LisensyaPrep — LET ProfEd Starter Pack Signups</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Signups', value: total, color: 'text-white' },
            { label: 'Today', value: today, color: 'text-yellow-400' },
            { label: 'This Week', value: thisWeek, color: 'text-green-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-[#0f1629] border border-white/10 rounded-xl p-4">
              <p className="text-gray-500 text-xs mb-1">{label}</p>
              <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Top sources */}
        {topSources.length > 0 && (
          <div className="bg-[#0f1629] border border-white/10 rounded-xl p-5 mb-8">
            <h2 className="text-white font-bold text-sm mb-3">Top Acquisition Sources</h2>
            <div className="space-y-2">
              {topSources.map(([src, count]) => (
                <div key={src} className="flex items-center justify-between">
                  <span className="text-gray-400 text-xs font-mono truncate max-w-[70%]">{src}</span>
                  <span className="text-yellow-400 text-xs font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <AdminWaitlistClient leads={leads ?? []} />
      </div>
    </div>
  );
}
