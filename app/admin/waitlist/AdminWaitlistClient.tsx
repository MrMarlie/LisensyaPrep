'use client';

import { useState } from 'react';

type Lead = {
  id: string;
  name: string;
  email: string;
  tags: string[];
  source: string | null;
  created_at: string;
};

export default function AdminWaitlistClient({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState('');

  const filtered = filter
    ? leads.filter((l) => l.tags?.includes(filter))
    : leads;

  const allTags = Array.from(new Set(leads.flatMap((l) => l.tags ?? [])));

  function exportCSV() {
    const header = 'Name,Email,Tags,Source,Signed Up';
    const rows = filtered.map((l) =>
      [
        `"${l.name}"`,
        `"${l.email}"`,
        `"${(l.tags ?? []).join(', ')}"`,
        `"${l.source ?? ''}"`,
        `"${new Date(l.created_at).toLocaleString('en-PH')}"`,
      ].join(','),
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lisensyaprep-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter('')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              !filter
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            All ({leads.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag === filter ? '' : tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === tag
                  ? 'bg-yellow-400 text-gray-900'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {tag} ({leads.filter((l) => l.tags?.includes(tag)).length})
            </button>
          ))}
        </div>
        <button
          onClick={exportCSV}
          className="bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Export CSV ({filtered.length})
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-[#080d1b]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Source</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Tags</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Signed Up</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-600 text-sm">
                  No signups yet.
                </td>
              </tr>
            ) : (
              filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-white font-medium">{lead.name}</td>
                  <td className="px-4 py-3 text-gray-300 font-mono text-xs">{lead.email}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell max-w-[180px] truncate">
                    {lead.source || '—'}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex gap-1 flex-wrap">
                      {(lead.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="bg-yellow-400/10 text-yellow-400 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString('en-PH', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
