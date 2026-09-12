import React from 'react';
import { History, ExternalLink, Heart, MessageCircle, Share2, CheckCircle2, Clock } from 'lucide-react';
import { ScheduledPost } from '../types';

interface HistorySectionProps {
  history: ScheduledPost[];
}

export const HistorySection: React.FC<HistorySectionProps> = ({ history }) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-400" />
            <span>Published History (Last 7 Days)</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Confirmed Instagram Graph API v20.0 publications for @sparkam.media and @zeeteroliver.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {history.map(item => {
          const isZeeter = item.account === 'zeeteroliver';

          return (
            <div
              key={item.id}
              className="rounded-xl bg-zinc-900/70 border border-zinc-800 p-4 flex flex-col justify-between hover:border-zinc-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-white">@{item.account}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {item.scheduled_time_wat}
                  </span>
                </div>

                <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-zinc-950 border border-zinc-800">
                  <img
                    src={item.image_urls[0]}
                    alt="Published media"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-xs text-zinc-300 line-clamp-3 mb-3 font-sans leading-relaxed">
                  {item.caption}
                </p>
              </div>

              <div>
                {/* Metrics */}
                {item.metrics && (
                  <div className="flex items-center gap-4 text-xs text-zinc-400 py-2 border-t border-zinc-800/80 mb-2">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-400" />
                      <span>{item.metrics.likes}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.metrics.comments}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Share2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{item.metrics.shares}</span>
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs pt-2 border-t border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 font-mono">
                    ID: {item.container_id?.substring(0, 10)}...
                  </span>
                  {item.permalink && (
                    <a
                      href={item.permalink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      <span>IG Permalink</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
