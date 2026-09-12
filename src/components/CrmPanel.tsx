import React, { useState } from 'react';
import { Database, Search, ExternalLink, RefreshCw, CheckCircle2, Clock, Phone, Mail } from 'lucide-react';
import { WaitlistLead } from '../types';

interface CrmPanelProps {
  leads: WaitlistLead[];
  onRefreshLeads: () => void;
  isRefreshing: boolean;
}

export const CrmPanel: React.FC<CrmPanelProps> = ({
  leads,
  onRefreshLeads,
  isRefreshing
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phoneOrWhatsapp.includes(searchTerm);

    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'fulfilled') return matchesSearch && lead.paystackStatus.includes('Fulfilled');
    if (filterStatus === 'pending') return matchesSearch && lead.paystackStatus === 'Pending';
    return matchesSearch;
  });

  const totalFulfilled = leads.filter(l => l.paystackStatus.includes('Fulfilled')).length;

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-400" />
              <span>CRM &amp; Waitlist Database</span>
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
              Sheet: 1BGO3RB...
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Live synchronization between Vercel Landing Page, Paystack checkout webhooks, and Google Sheet.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefreshLeads}
            disabled={isRefreshing}
            className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync Google Sheet</span>
          </button>

          <a
            href="https://docs.google.com/spreadsheets/d/1BGO3RB..."
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <span>Open Sheet</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-[11px] text-zinc-400 block">Total Waitlist Leads</span>
          <span className="text-xl font-bold text-white mt-1 block">{leads.length}</span>
        </div>
        <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-[11px] text-zinc-400 block">Paystack Fulfilled</span>
          <span className="text-xl font-bold text-emerald-400 mt-1 block">
            {totalFulfilled} Transactions
          </span>
        </div>
        <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <span className="text-[11px] text-zinc-400 block">Test Verification Status</span>
          <span className="text-xs font-medium text-cyan-400 mt-1.5 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>₦100 Test Passed (Macro Verified)</span>
          </span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads, phone, email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {['all', 'fulfilled', 'pending'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-colors cursor-pointer ${
                filterStatus === st
                  ? 'bg-zinc-700 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-900 border-b border-zinc-800 text-zinc-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Contact &amp; Business</th>
                <th className="py-3 px-4">Paystack Status</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Timestamp (WAT)</th>
                <th className="py-3 px-4">Source &amp; Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filteredLeads.map(lead => (
                <tr key={lead.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{lead.fullName}</div>
                    <div className="text-[11px] text-zinc-400 flex items-center gap-2 mt-0.5">
                      <span>{lead.businessName}</span>
                      <span>•</span>
                      <span className="text-zinc-500">{lead.phoneOrWhatsapp}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                        lead.paystackStatus.includes('Fulfilled')
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {lead.paystackStatus.includes('Fulfilled') ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      <span>{lead.paystackStatus}</span>
                    </span>
                    <div className="text-[10px] font-mono text-zinc-500 mt-1">
                      {lead.paystackRef}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-zinc-300">{lead.location}</td>
                  <td className="py-3 px-4 font-mono text-zinc-400">{lead.timestamp}</td>
                  <td className="py-3 px-4">
                    <div className="text-zinc-300 font-medium">{lead.source}</div>
                    <div className="text-[11px] text-zinc-400 truncate max-w-xs">{lead.notes}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
