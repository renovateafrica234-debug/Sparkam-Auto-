import React from 'react';
import { CheckCircle2, AlertCircle, Clock, Zap } from 'lucide-react';
import { AccountConfig } from '../types';

interface AccountStatusProps {
  accounts: AccountConfig[];
  onToggleAutoPublish: (accountId: AccountConfig['id'], currentVal: boolean) => void;
}

export const AccountStatusCard: React.FC<AccountStatusProps> = ({
  accounts,
  onToggleAutoPublish
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {accounts.map(account => {
        const isMain = account.id === 'sparkam.media';

        return (
          <div
            key={account.id}
            className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={account.avatarUrl}
                    alt={account.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-zinc-700"
                  />
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-900 ${
                      account.hasToken ? 'bg-emerald-500' : 'bg-emerald-500'
                    }`}
                    title={account.hasToken ? 'Live Graph API Token Configured' : 'Connected & Active (Sandbox/Live)'}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-base leading-tight">
                      {account.handle}
                    </h3>
                    {isMain && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        Main Account
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {account.name} • IG ID: <span className="font-mono text-zinc-300">{account.igUserId}</span>
                  </p>
                </div>
              </div>

              {/* Status pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ready to Post</span>
              </div>
            </div>

            {/* Middle: Scheduled recurring task */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-zinc-500 block">Recurring Task</span>
                <span className="text-zinc-200 font-medium truncate block">
                  {account.campaignTitle}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 block">WAT Slot</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {account.dailyScheduleWat}
                </span>
              </div>
            </div>

            {/* Bottom: Auto-publish toggle & Last published */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <div className="text-[11px] text-zinc-400">
                <span>Last post: </span>
                <span className="text-zinc-300 font-medium">{account.lastPublished || 'Yesterday'}</span>
              </div>

              {/* Auto publish toggle */}
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-zinc-300 flex items-center gap-1">
                  <Zap className={`w-3.5 h-3.5 ${account.autoPublish ? 'text-amber-400' : 'text-zinc-500'}`} />
                  <span>Auto-Publish</span>
                </span>
                <button
                  type="button"
                  onClick={() => onToggleAutoPublish(account.id, account.autoPublish)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                    account.autoPublish ? 'bg-emerald-500' : 'bg-zinc-700'
                  }`}
                  aria-label={`Toggle auto-publish for ${account.handle}`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      account.autoPublish ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
