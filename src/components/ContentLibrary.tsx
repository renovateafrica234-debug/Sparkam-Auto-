import React, { useState } from 'react';
import { BookOpen, Copy, Check, Plus, Sparkles, Layers, Play, ExternalLink } from 'lucide-react';
import { CampaignTemplate } from '../types';
import { CAMPAIGN_TEMPLATES } from '../data/seedData';

interface ContentLibraryProps {
  onQueueCampaign: (template: CampaignTemplate) => void;
}

export const ContentLibrary: React.FC<ContentLibraryProps> = ({ onQueueCampaign }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>Content Library &amp; Campaign Packs</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Pre-loaded verified campaigns for ZEE ZAIN (Abuja 27-Point Checklist, 48hr AI Kit, &amp; Drift Bami EP2).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CAMPAIGN_TEMPLATES.map(campaign => {
          const isZeeter = campaign.account === 'zeeteroliver';

          return (
            <div
              key={campaign.id}
              className="rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 p-4.5 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-200 uppercase">
                    @{campaign.account}
                  </span>
                  <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {campaign.scheduledTimeWat}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white line-clamp-2 mb-2">
                  {campaign.title}
                </h3>

                {/* Thumbnail Preview */}
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-zinc-950 border border-zinc-800">
                  <img
                    src={campaign.image_urls[0]}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                    {campaign.type === 'reel' ? (
                      <>
                        <Play className="w-2.5 h-2.5 fill-current text-cyan-400" />
                        <span>Reel</span>
                      </>
                    ) : (
                      <>
                        <Layers className="w-2.5 h-2.5 text-emerald-400" />
                        <span>{campaign.image_urls.length} Slides</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Hook Box */}
                <div className="bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800/80 mb-3">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                    Primary Hook
                  </span>
                  <p className="text-xs text-zinc-300 font-medium italic line-clamp-2">
                    "{campaign.hook}"
                  </p>
                </div>

                {/* Description & Tags */}
                <p className="text-xs text-zinc-400 line-clamp-2 mb-3">
                  {campaign.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {campaign.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] text-zinc-400 bg-zinc-800/60 px-1.5 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2">
                <button
                  onClick={() => onQueueCampaign(campaign)}
                  className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Queue for Tonight</span>
                </button>

                <button
                  onClick={() => handleCopy(campaign.id, campaign.caption)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  title="Copy full caption"
                >
                  {copiedId === campaign.id ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
