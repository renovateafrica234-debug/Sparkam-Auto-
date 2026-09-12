import React, { useState } from 'react';
import { X, Send, Copy, Check, Terminal, Sparkles, AlertCircle } from 'lucide-react';
import { AccountId, PostType } from '../types';

interface WebhookTesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendPayload: (payload: any) => Promise<void>;
}

export const WebhookTesterModal: React.FC<WebhookTesterModalProps> = ({
  isOpen,
  onClose,
  onSendPayload
}) => {
  const [account, setAccount] = useState<AccountId>('zeeteroliver');
  const [type, setType] = useState<PostType>('thread');
  const [caption, setCaption] = useState(
    `Developers charge ₦200k-₦500k in Abuja for website templates that don't convert. 🙅‍♂️

Here is the exact 27-Point Abuja Website Conversion Checklist we used to revamp Glow Salon & Spa Wuse II:
1. 3-second Hero value proposition
2. WhatsApp instant chat anchor (1-tap booking)
3. Local currency checkout + Paystack instant verification
4. Real social proof + mobile load time under 1.8s

Result? 34 qualified appointments in the first 72 hours.
Drop a comment below with 'CHECKLIST' and I'll DM you the free 27-point PDF breakdown right now! 👇`
  );
  const [cta, setCta] = useState('Comment CHECKLIST');
  const [scheduledWat, setScheduledWat] = useState('6:00 PM WAT');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80');
  const [isSending, setIsSending] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);

  if (!isOpen) return null;

  const payload = {
    account,
    type,
    caption,
    image_urls: [imageUrl],
    scheduled_for: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
    cta
  };

  const curlCommand = `curl -X POST https://sparkam-auto-publisher.vercel.app/api/hooks/scheduled-post \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(payload, null, 2)}'`;

  const handleCopyCurl = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      await onSendPayload(payload);
      onClose();
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Meta AI Webhook Receiver</h3>
            <span className="text-[11px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">
              POST /api/hooks/scheduled-post
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-zinc-400 leading-relaxed">
            Meta AI can send scheduled campaign payloads directly into Sparkam Auto-Publisher.
            Test incoming payloads below to preview how they queue into Tonight’s Queue for one-tap publishing.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Target Account</label>
              <select
                value={account}
                onChange={e => setAccount(e.target.value as AccountId)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="zeeteroliver">@zeeteroliver (Daily 6 PM WAT)</option>
                <option value="sparkam.media">@sparkam.media (Daily 8 PM WAT)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Content Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as PostType)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="thread">Thread / Carousel</option>
                <option value="reel">Reel (Video)</option>
                <option value="image">Single Image</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Caption Text</label>
            <textarea
              rows={4}
              value={caption}
              onChange={e => setCaption(e.target.value)}
              className="w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white font-sans focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Call to Action (CTA)</label>
              <input
                type="text"
                value={cta}
                onChange={e => setCta(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Sample Media Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* cURL snippet */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-zinc-400">cURL for Meta AI Automation</span>
              <button
                type="button"
                onClick={handleCopyCurl}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                {copiedCurl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCurl ? 'Copied' : 'Copy cURL'}</span>
              </button>
            </div>
            <pre className="p-2.5 rounded-lg bg-zinc-950 text-[11px] font-mono text-zinc-400 overflow-x-auto border border-zinc-800/80">
              {curlCommand}
            </pre>
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
              disabled={isSending}
              className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 fill-current" />
              <span>{isSending ? 'Sending to Queue...' : 'Simulate Incoming Webhook'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
