import React, { useEffect, useState } from 'react';
import { Clock, RefreshCw, Send, ShieldCheck, Sparkles, Terminal } from 'lucide-react';
import { AccountConfig } from '../types';

interface HeaderProps {
  accounts: AccountConfig[];
  onRefresh: () => void;
  isRefreshing: boolean;
  onOpenWebhookTester: () => void;
  onOpenSetup: () => void;
  onOpenDriftBami: () => void;
  onTriggerCron: () => void;
  isCronRunning: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  accounts,
  onRefresh,
  isRefreshing,
  onOpenWebhookTester,
  onOpenSetup,
  onOpenDriftBami,
  onTriggerCron,
  isCronRunning
}) => {
  const [watTime, setWatTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setWatTime(`${formatted} WAT`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Left: Brand & Owner */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <Send className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Sparkam Auto-Publisher
              </h1>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                V20 Graph API
              </span>
            </div>
            <p className="text-xs text-zinc-400 flex items-center gap-1.5">
              <span>Owner: <strong className="text-zinc-200">ZEE ZAIN</strong></span>
              <span className="text-zinc-600">•</span>
              <span>Abuja, Nigeria</span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 font-mono font-medium">{watTime || 'Loading WAT...'}</span>
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto justify-end">
          <button
            onClick={onOpenWebhookTester}
            className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-lg flex items-center gap-1.5 transition-colors"
            title="Inspect Meta AI Webhook format"
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Meta AI Webhook</span>
          </button>

          <button
            onClick={onOpenDriftBami}
            className="px-3 py-1.5 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-950/40 hover:bg-amber-950/60 border border-amber-800/60 rounded-lg flex items-center gap-1.5 transition-colors"
            title="Drift Bami EP2 Zuma Rock Climbing vault"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Drift Bami EP2</span>
          </button>

          <button
            onClick={onTriggerCron}
            disabled={isCronRunning}
            className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
            title="Test Vercel Hourly Cron"
          >
            <Clock className={`w-3.5 h-3.5 text-cyan-400 ${isCronRunning ? 'animate-spin' : ''}`} />
            <span>{isCronRunning ? 'Evaluating...' : 'Run Cron'}</span>
          </button>

          <button
            onClick={onOpenSetup}
            className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            <span>Setup & Tokens</span>
          </button>

          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-lg transition-colors disabled:opacity-50"
            title="Refresh status"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
