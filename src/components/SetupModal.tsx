import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, Copy, Check, ExternalLink, Key } from 'lucide-react';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  envStatus?: Record<string, boolean>;
}

export const SetupModal: React.FC<SetupModalProps> = ({
  isOpen,
  onClose,
  envStatus = {}
}) => {
  const [copiedEnv, setCopiedEnv] = useState(false);

  if (!isOpen) return null;

  const envTemplate = `# Meta Graph API Credentials for @sparkam.media
IG_USER_ID_SPARKAM="17841409823471011"
IG_TOKEN_SPARKAM="EAA..."

# Meta Graph API Credentials for @zeeteroliver
IG_USER_ID_ZEETER="17841405928371920"
IG_TOKEN_ZEETER="EAA..."

# Facebook Page ID
FB_PAGE_ID="109283748291029"

# Google Sheet CRM & Paystack
GOOGLE_SHEET_ID="1BGO3RB..."
GOOGLE_SERVICE_ACCOUNT_JSON="{\\"type\\": \\"service_account\\", ...}"
PAYSTACK_SECRET="sk_live_..."
VERCEL_KV_URL="redis://..."`;

  const handleCopy = () => {
    navigator.clipboard.writeText(envTemplate);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  const envVars = [
    { key: 'IG_USER_ID_SPARKAM', label: '@sparkam.media IG User ID', desc: 'Instagram Business Account ID' },
    { key: 'IG_TOKEN_SPARKAM', label: '@sparkam.media Graph API Token', desc: 'Long-lived token with instagram_content_publish' },
    { key: 'IG_USER_ID_ZEETER', label: '@zeeteroliver IG User ID', desc: 'Instagram Business Account ID' },
    { key: 'IG_TOKEN_ZEETER', label: '@zeeteroliver Graph API Token', desc: 'Long-lived token with instagram_content_publish' },
    { key: 'FB_PAGE_ID', label: 'Facebook Page ID', desc: 'Connected Facebook Page' },
    { key: 'GOOGLE_SHEET_ID', label: 'Google Sheet ID', desc: '1BGO3RB... Waitlist & CRM' },
    { key: 'PAYSTACK_SECRET', label: 'Paystack Secret Key', desc: 'sk_live_... / sk_test_...' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Setup &amp; Meta Graph API Credentials</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Status banner */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-start gap-3">
            <Key className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-semibold text-white block">Publishing Engine Status</span>
              <p className="text-zinc-400 leading-relaxed">
                Sparkam Auto-Publisher supports both <strong className="text-zinc-200">Real Meta Graph API v20.0</strong> and instant <strong className="text-zinc-200">Sandbox Preview Mode</strong>. When tokens are provided in the environment, the One-Tap button publishes directly to the real Instagram accounts. Without tokens, it simulates container creation and permalink generation for safe previewing.
              </p>
            </div>
          </div>

          {/* Environment Variables Table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Environment Variables Matrix
              </h4>
              <button
                onClick={handleCopy}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
              >
                {copiedEnv ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEnv ? 'Copied .env template' : 'Copy .env snippet'}</span>
              </button>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 divide-y divide-zinc-800/80">
              {envVars.map(v => {
                const isConfigured = Boolean(envStatus[v.key]);
                return (
                  <div key={v.key} className="p-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-mono text-zinc-200 font-semibold">{v.key}</div>
                      <div className="text-[11px] text-zinc-500">{v.label} • {v.desc}</div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1 shrink-0 ${
                        isConfigured
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-zinc-800 text-zinc-400 border border-zinc-700/60'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isConfigured ? 'text-emerald-400' : 'text-zinc-500'}`} />
                      <span>{isConfigured ? 'Configured' : 'Ready in .env'}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Meta Developers Step by Step Guide */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              How to get your Instagram Graph API tokens (5 Minutes)
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                <span className="font-bold text-white block mb-1">1. Meta Developers Portal</span>
                Visit <a href="https://developers.facebook.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline inline-flex items-center gap-1">developers.facebook.com <ExternalLink className="w-3 h-3" /></a> and create a <strong>Business</strong> App called <em>Sparkam Auto-Publisher</em>.
              </div>

              <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                <span className="font-bold text-white block mb-1">2. Required Permissions in Graph API Explorer</span>
                In the Graph API Explorer, select your App and request scopes:
                <code className="block mt-1 p-2 bg-zinc-900 rounded font-mono text-[11px] text-emerald-300">
                  instagram_basic, instagram_content_publish, pages_read_engagement, pages_show_list
                </code>
              </div>

              <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                <span className="font-bold text-white block mb-1">3. Query Your Instagram Business Account ID</span>
                Run query: <code className="text-cyan-300 font-mono">GET /v20.0/me/accounts?fields=name,instagram_business_account</code>. The resulting numerical ID is your <code>IG_USER_ID_SPARKAM</code> or <code>IG_USER_ID_ZEETER</code>.
              </div>

              <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/80">
                <span className="font-bold text-white block mb-1">4. Generate Long-Lived Token</span>
                Paste your user token into the Access Token Debugger and click <strong>Extend Access Token</strong> for a 60-day or permanent token.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-900 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-950 bg-white hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer"
          >
            Close Setup
          </button>
        </div>
      </div>
    </div>
  );
};
