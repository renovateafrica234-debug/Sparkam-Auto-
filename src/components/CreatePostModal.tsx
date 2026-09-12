import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon, Send, Sparkles } from 'lucide-react';
import { AccountId, PostType } from '../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (postData: any) => Promise<void>;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onCreate
}) => {
  const [account, setAccount] = useState<AccountId>('sparkam.media');
  const [type, setType] = useState<PostType>('reel');
  const [caption, setCaption] = useState('');
  const [cta, setCta] = useState('Comment LAUNCH');
  const [scheduledTime, setScheduledTime] = useState('8:00 PM WAT');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption) return;
    setIsSubmitting(true);
    try {
      await onCreate({
        account,
        type,
        caption,
        cta,
        image_urls: [imageUrl],
        scheduled_for: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
        source: 'manual'
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Add Post to Tonight's Queue</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Target Account</label>
              <select
                value={account}
                onChange={e => setAccount(e.target.value as AccountId)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="sparkam.media">@sparkam.media (8 PM Reel)</option>
                <option value="zeeteroliver">@zeeteroliver (6 PM Thread)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Post Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as PostType)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="reel">Reel (Video)</option>
                <option value="thread">Thread / Carousel</option>
                <option value="carousel">Multi-image Carousel</option>
                <option value="image">Single Image</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Caption &amp; Hashtags</label>
            <textarea
              required
              rows={4}
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="Write your campaign caption here..."
              className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white font-sans focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">CTA</label>
              <input
                type="text"
                value={cta}
                onChange={e => setCta(e.target.value)}
                placeholder="e.g. Comment CHECKLIST"
                className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Media URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !caption}
              className="px-4 py-2 text-xs font-bold text-zinc-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>{isSubmitting ? 'Adding...' : 'Add to Tonight\'s Queue'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
