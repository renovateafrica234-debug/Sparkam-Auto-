import React from 'react';
import { X, Sparkles, Play, Plus, Compass, MapPin, Film } from 'lucide-react';
import { CampaignTemplate } from '../types';

interface DriftBamiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onQueueZuma: (campaign: CampaignTemplate) => void;
}

export const DriftBamiModal: React.FC<DriftBamiModalProps> = ({
  isOpen,
  onClose,
  onQueueZuma
}) => {
  if (!isOpen) return null;

  const zumaTemplate: CampaignTemplate = {
    id: 'drift-bami-ep2-zuma',
    title: 'Drift Bami EP2: Zuma Rock Climbing Challenge',
    account: 'zeeteroliver',
    type: 'reel',
    scheduledTimeWat: 'Weekend Special WAT',
    hook: 'We took 3 cameras and zero safety ropes halfway up Zuma Rock at 6 AM...',
    caption: `Zuma Rock has stood guard over Abuja for millennia, but very few have seen the crest from this angle. 🧗‍♂️🇳🇬

Drift Bami EP2 is officially in the vault. When we started Sparkam Media, everyone said high-production adventure content couldn't be sustained locally in Abuja without 7-figure foreign gear.

We shot this whole 12-minute breakdown on an iPhone 15 Pro, a DJI Mini 3, and raw grit.

Episode 2 drops this Sunday. Drop a 🧗‍♂️ if you're ready for the full drone sequence!

#DriftBami #ZumaRock #AbujaCreators #AbujaHikes #SparkamMedia #VisitAbuja #ExploreNigeria`,
    cta: 'Comment 🧗‍♂️ for YouTube Premiere Link',
    tags: ['#DriftBami', '#ZumaRock', '#AbujaHikes', '#SparkamMedia', '#VisitAbuja'],
    image_urls: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=80'
    ],
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'Drift Bami outdoor adventure series Episode 2: High-angle drone and rock climbing footage at Zuma Rock.'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Drift Bami Content Vault</h3>
            <span className="text-[11px] font-semibold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
              Episode 2
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800 group">
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80"
              alt="Zuma Rock Ascent"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col justify-end">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Zuma Rock, Madalla (Abuja Expressway)</span>
              </div>
              <h4 className="text-lg font-bold text-white leading-tight">
                Drift Bami EP2: Zuma Rock Climbing Challenge
              </h4>
              <p className="text-xs text-zinc-300 line-clamp-2 mt-1">
                Raw grit, dawn drone footage, and sunrise perspective over the iconic Abuja monolith.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
              <span className="text-zinc-500 block mb-1 font-semibold">Creator Account</span>
              <span className="text-white font-medium">@zeeteroliver (ZEE ZAIN)</span>
            </div>
            <div className="p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
              <span className="text-zinc-500 block mb-1 font-semibold">Series / Format</span>
              <span className="text-amber-400 font-medium flex items-center gap-1">
                <Film className="w-3 h-3" />
                <span>Drift Bami Outdoor Reel</span>
              </span>
            </div>
          </div>

          <div className="bg-zinc-950 p-3.5 rounded-lg border border-zinc-800 text-xs text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto">
            {zumaTemplate.caption}
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <div className="text-xs text-zinc-400">
              Media assets ready in <code className="text-zinc-300">/public/content/drift-bami-ep2/</code>
            </div>
            <button
              onClick={() => {
                onQueueZuma(zumaTemplate);
                onClose();
              }}
              className="px-4 py-2.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Push Zuma Rock Reel to Queue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
