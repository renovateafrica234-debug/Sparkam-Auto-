import React, { useState, useEffect, useCallback } from 'react';
import {
  AccountId,
  CampaignTemplate,
  ScheduledPost
} from './types';
import {
  CAMPAIGN_TEMPLATES,
  INITIAL_HISTORY,
  INITIAL_QUEUE
} from './data/seedData';
import {
  Send,
  CheckCircle2,
  ExternalLink,
  Plus,
  RefreshCw,
  Clock,
  Layers,
  Play,
  Trash2
} from 'lucide-react';

export default function App() {
  const [queue, setQueue] = useState<ScheduledPost[]>(INITIAL_QUEUE);
  const [history, setHistory] = useState<ScheduledPost[]>(INITIAL_HISTORY);
  const [activeTab, setActiveTab] = useState<'queue' | 'library' | 'history'>('queue');
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [watTime, setWatTime] = useState('');
  const [toastMessage, setToastMessage] = useState<{ text: string; url?: string } | null>(null);

  // Live Africa/Lagos (WAT, UTC+1) Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setWatTime(`${timeString} WAT`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (text: string, url?: string) => {
    setToastMessage({ text, url });
    setTimeout(() => setToastMessage(null), 5000);
  };

  // Sync state from server API
  const fetchData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [queueRes, histRes] = await Promise.all([
        fetch('/api/queue'),
        fetch('/api/history')
      ]);
      if (queueRes.ok) {
        const qData = await queueRes.json();
        if (qData.queue) setQueue(qData.queue);
      }
      if (histRes.ok) {
        const hData = await histRes.json();
        if (hData.history) setHistory(hData.history);
      }
    } catch (err) {
      console.warn('API sync fallback:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ONE BUTTON PUSH TO PUBLISH
  const handlePublish = async (postId: string) => {
    setPublishingId(postId);
    try {
      const res = await fetch('/api/instagram/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Publishing failed');
      }

      showToast(
        `Published successfully to @${data.account}!`,
        data.permalink
      );
      await fetchData();
    } catch (err: any) {
      showToast(`Error: ${err.message}`);
    } finally {
      setPublishingId(null);
    }
  };

  // Add campaign from Content Library
  const handleAddCampaignToQueue = async (template: CampaignTemplate) => {
    try {
      const res = await fetch('/api/queue/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          account: template.account,
          type: template.type,
          caption: template.caption,
          cta: template.cta,
          image_urls: template.image_urls,
          video_url: template.video_url,
          source: 'campaign_library'
        })
      });

      if (res.ok) {
        await fetchData();
        showToast(`Queued: ${template.title}`);
        setActiveTab('queue');
      }
    } catch {
      showToast(`Added ${template.title} to queue`);
      setActiveTab('queue');
    }
  };

  // Remove post from queue
  const handleDeleteFromQueue = async (postId: string) => {
    try {
      await fetch(`/api/queue/delete?id=${postId}`, { method: 'DELETE' });
      setQueue(prev => prev.filter(p => p.id !== postId));
      showToast('Removed from queue');
    } catch {
      setQueue(prev => prev.filter(p => p.id !== postId));
    }
  };

  // Primary Tonight's Queue (first 2 items for side-by-side hero)
  const heroQueue = queue.slice(0, 2);
  const additionalQueue = queue.slice(2);

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] font-sans antialiased selection:bg-[#00FF85] selection:text-black">
      {/* Top Bar: Sparkam logo + Auto-Publisher + 2 Account Pills */}
      <header className="border-b border-[#1A1A1A] bg-[#000000] sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#FFFFFF] rounded flex items-center justify-center">
              <span className="text-black font-black text-xs tracking-tighter">SP</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-sm tracking-tight text-white">Sparkam</span>
              <span className="text-xs text-[#888888] font-normal">Auto-Publisher</span>
            </div>
          </div>

          {/* Account Pills & WAT Clock */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Account 1: @sparkam.media */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#222222] bg-[#0A0A0A] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00FF85]" />
              <span className="text-[#FFFFFF]">@sparkam.media</span>
            </div>

            {/* Account 2: @zeeteroliver */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#222222] bg-[#0A0A0A] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00FF85]" />
              <span className="text-[#FFFFFF]">@zeeteroliver</span>
            </div>

            {/* WAT Clock */}
            <div className="hidden md:flex items-center text-xs font-mono text-[#888888] pl-2">
              <span>{watTime || 'WAT (UTC+1)'}</span>
            </div>

            {/* Refresh */}
            <button
              onClick={fetchData}
              disabled={isRefreshing}
              className="p-2 text-[#888888] hover:text-[#FFFFFF] transition-colors"
              title="Refresh queue"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* HERO SECTION: TONIGHT'S QUEUE (2 BIG CARDS SIDE BY SIDE) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Tonight's Queue
              </h1>
              <p className="text-xs text-[#888888] mt-0.5">
                Africa/Lagos (WAT) daily scheduled campaigns. One-tap direct publish.
              </p>
            </div>
            <div className="text-xs font-mono text-[#888888]">
              {queue.length} ready to post
            </div>
          </div>

          {heroQueue.length === 0 ? (
            <div className="border border-[#1A1A1A] rounded-lg p-12 text-center bg-[#050505]">
              <p className="text-sm text-[#888888]">Tonight's queue is clear.</p>
              <button
                onClick={() => setActiveTab('library')}
                className="mt-4 px-4 py-2 bg-[#FFFFFF] text-black font-semibold text-xs rounded hover:bg-[#E5E5E5] transition-colors"
              >
                Select from Content Library
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {heroQueue.map(post => {
                const isZeeter = post.account === 'zeeteroliver';
                const isCarousel = (post.type === 'carousel' || post.type === 'thread') && post.image_urls.length > 1;
                const isPostPublishing = publishingId === post.id;
                const isPublished = post.status === 'published';

                return (
                  <div
                    key={post.id}
                    className="border border-[#1F1F1F] bg-[#0A0A0A] rounded-xl p-5 sm:p-6 flex flex-col justify-between space-y-5"
                  >
                    {/* Card Top: Account & Schedule */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#1A1A1A]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">@{post.account}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A1A1A] text-[#888888] uppercase">
                          {post.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#00FF85]">
                          {post.scheduled_time_wat}
                        </span>
                        <button
                          onClick={() => handleDeleteFromQueue(post.id)}
                          className="text-[#555555] hover:text-[#FF4D4D] p-1 transition-colors"
                          title="Remove from queue"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Image Preview */}
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-[#000000] border border-[#1A1A1A]">
                      <img
                        src={post.image_urls[0]}
                        alt="Post media preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 rounded text-[10px] font-mono text-[#888888] flex items-center gap-1.5">
                        {post.type === 'reel' ? (
                          <>
                            <Play className="w-2.5 h-2.5 text-[#00FF85]" />
                            <span>Video Reel</span>
                          </>
                        ) : (
                          <>
                            <Layers className="w-2.5 h-2.5 text-[#00FF85]" />
                            <span>{post.image_urls.length} Image{post.image_urls.length > 1 ? 's' : ''}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Caption Preview */}
                    <div className="bg-[#000000] p-3.5 rounded-lg border border-[#1A1A1A]">
                      <p className="text-xs text-[#D4D4D8] leading-relaxed line-clamp-4 font-sans whitespace-pre-wrap">
                        {post.caption}
                      </p>
                      {post.cta && (
                        <div className="mt-2 text-[11px] font-mono text-[#00FF85]">
                          👉 {post.cta}
                        </div>
                      )}
                    </div>

                    {/* ONE HUGE GREEN BUTTON: [APPROVE & POST TO IG NOW] */}
                    <div className="pt-2">
                      <button
                        onClick={() => handlePublish(post.id)}
                        disabled={isPostPublishing || isPublished}
                        className={`w-full py-4 px-6 rounded-lg font-extrabold text-base sm:text-lg tracking-tight transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer ${
                          isPublished
                            ? 'bg-[#1A1A1A] text-[#888888] cursor-not-allowed'
                            : isPostPublishing
                            ? 'bg-[#00FF85]/70 text-black cursor-wait animate-pulse'
                            : 'bg-[#00FF85] text-black hover:bg-[#00E577] active:scale-[0.99]'
                        }`}
                      >
                        {isPostPublishing ? (
                          <span>POSTING TO IG GRAPH API...</span>
                        ) : isPublished ? (
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-5 h-5 text-[#00FF85]" />
                            <span>PUBLISHED TO IG</span>
                          </span>
                        ) : (
                          <span>APPROVE &amp; POST TO IG NOW</span>
                        )}
                      </button>

                      {post.permalink && (
                        <div className="mt-2 text-center">
                          <a
                            href={post.permalink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-[#00FF85] hover:underline inline-flex items-center gap-1"
                          >
                            <span>View Live on Instagram</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* If there are more than 2 items in queue */}
          {additionalQueue.length > 0 && (
            <div className="mt-6 space-y-3">
              <span className="text-xs font-mono text-[#888888] block">Next in Queue ({additionalQueue.length})</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additionalQueue.map(post => (
                  <div key={post.id} className="border border-[#1A1A1A] bg-[#0A0A0A] rounded-lg p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={post.image_urls[0]} alt="" className="w-12 h-12 rounded object-cover border border-[#1A1A1A] shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">@{post.account} • {post.scheduled_time_wat}</div>
                        <div className="text-[11px] text-[#888888] truncate">{post.caption}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePublish(post.id)}
                      disabled={publishingId === post.id}
                      className="px-4 py-2 rounded bg-[#00FF85] text-black font-bold text-xs hover:bg-[#00E577] shrink-0"
                    >
                      Publish
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 3 TABS ONLY: Queue | Content Library | History */}
        <section className="space-y-6 pt-4 border-t border-[#1A1A1A]">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-[#1A1A1A] pb-3">
            {[
              { id: 'queue', label: `Queue (${queue.length})` },
              { id: 'library', label: 'Content Library (4 Packs)' },
              { id: 'history', label: `History (${history.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#FFFFFF] text-black'
                    : 'text-[#888888] hover:text-[#FFFFFF] bg-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: QUEUE LIST */}
          {activeTab === 'queue' && (
            <div className="space-y-3">
              <div className="text-xs text-[#888888]">
                All active scheduled payloads awaiting execution or webhook arrival.
              </div>
              <div className="divide-y divide-[#1A1A1A] border border-[#1A1A1A] rounded-lg bg-[#0A0A0A] overflow-hidden">
                {queue.map(item => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#111111] transition-colors">
                    <div className="flex items-start sm:items-center gap-3">
                      <img
                        src={item.image_urls[0]}
                        alt=""
                        className="w-14 h-14 rounded object-cover border border-[#1A1A1A] shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">@{item.account}</span>
                          <span className="text-[10px] font-mono text-[#888888] uppercase">{item.type}</span>
                          <span className="text-[11px] font-mono text-[#00FF85]">{item.scheduled_time_wat}</span>
                        </div>
                        <p className="text-xs text-[#AAAAAA] mt-1 line-clamp-1 max-w-xl">
                          {item.caption}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleDeleteFromQueue(item.id)}
                        className="p-2 text-[#555555] hover:text-[#FF4D4D] transition-colors"
                        title="Delete from queue"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handlePublish(item.id)}
                        disabled={publishingId === item.id || item.status === 'published'}
                        className="px-4 py-2 rounded bg-[#00FF85] text-black font-bold text-xs hover:bg-[#00E577] transition-colors cursor-pointer"
                      >
                        {publishingId === item.id ? 'Posting...' : 'Post Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CONTENT LIBRARY (GRID OF 4 CARDS) */}
          {activeTab === 'library' && (
            <div className="space-y-4">
              <div className="text-xs text-[#888888]">
                Pre-loaded verified campaigns for ZEE ZAIN (Abuja 27-Point Checklist, 48hr AI Kit, Drift Bami Zuma Rock, &amp; Glow Salon).
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {CAMPAIGN_TEMPLATES.map(template => (
                  <div
                    key={template.id}
                    className="border border-[#1A1A1A] bg-[#0A0A0A] rounded-xl p-4 flex flex-col justify-between hover:border-[#333333] transition-colors"
                  >
                    <div>
                      {/* Top Meta */}
                      <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                        <span className="text-white">@{template.account}</span>
                        <span className="text-[#00FF85]">{template.scheduledTimeWat}</span>
                      </div>

                      {/* Thumbnail */}
                      <div className="aspect-video rounded-lg overflow-hidden bg-black border border-[#1A1A1A] mb-3">
                        <img
                          src={template.image_urls[0]}
                          alt={template.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-xs text-white line-clamp-2 leading-snug mb-2">
                        {template.title}
                      </h3>

                      {/* Hook */}
                      <p className="text-[11px] text-[#888888] line-clamp-3 mb-4 leading-relaxed">
                        "{template.hook}"
                      </p>
                    </div>

                    {/* Add to Queue Button */}
                    <button
                      onClick={() => handleAddCampaignToQueue(template)}
                      className="w-full py-2.5 px-3 rounded bg-[#1A1A1A] hover:bg-[#00FF85] hover:text-black text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add to Queue</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="text-xs text-[#888888]">
                Last 7 days of published Instagram campaigns via Graph API v20.0.
              </div>

              <div className="divide-y divide-[#1A1A1A] border border-[#1A1A1A] rounded-lg bg-[#0A0A0A] overflow-hidden">
                {history.map(item => (
                  <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-3">
                      <img
                        src={item.image_urls[0]}
                        alt=""
                        className="w-14 h-14 rounded object-cover border border-[#1A1A1A] shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">@{item.account}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A1A1A] text-[#888888] uppercase">
                            {item.type}
                          </span>
                          <span className="text-[11px] font-mono text-[#888888]">
                            {item.scheduled_time_wat}
                          </span>
                        </div>
                        <p className="text-xs text-[#D4D4D8] mt-1 line-clamp-2 max-w-xl">
                          {item.caption}
                        </p>
                      </div>
                    </div>

                    {item.permalink && (
                      <a
                        href={item.permalink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono text-[#00FF85] hover:underline flex items-center gap-1 self-end sm:self-center"
                      >
                        <span>View on Instagram</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#111111] border border-[#262626] rounded-lg text-xs text-white flex items-center gap-3">
          <CheckCircle2 className="w-4 h-4 text-[#00FF85]" />
          <span>{toastMessage.text}</span>
          {toastMessage.url && (
            <a
              href={toastMessage.url}
              target="_blank"
              rel="noreferrer"
              className="text-[#00FF85] hover:underline font-mono ml-2"
            >
              Open Post →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
