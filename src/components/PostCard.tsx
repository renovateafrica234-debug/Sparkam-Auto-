import React, { useState, useEffect } from 'react';
import {
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Play,
  Layers,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Tag,
  Trash2
} from 'lucide-react';
import { ScheduledPost } from '../types';

interface PostCardProps {
  post: ScheduledPost;
  onPublish: (postId: string) => Promise<void>;
  onDelete?: (postId: string) => void;
  isPublishing: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onPublish,
  onDelete,
  isPublishing
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [countdown, setCountdown] = useState('');
  const [isDue, setIsDue] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const isZeeter = post.account === 'zeeteroliver';
  const isCarousel = (post.type === 'carousel' || post.type === 'thread') && post.image_urls.length > 1;

  // Calculate live countdown to WAT scheduled time
  useEffect(() => {
    const updateCountdown = () => {
      const scheduledMs = new Date(post.scheduled_for).getTime();
      const nowMs = Date.now();
      const diffMs = scheduledMs - nowMs;

      if (diffMs <= 0) {
        setCountdown('DUE NOW FOR WAT RELEASE');
        setIsDue(true);
      } else {
        setIsDue(false);
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
        
        if (hours > 0) {
          setCountdown(`In ${hours}h ${minutes}m ${seconds}s`);
        } else {
          setCountdown(`In ${minutes}m ${seconds}s`);
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [post.scheduled_for]);

  const handlePublishClick = async () => {
    await onPublish(post.id);
  };

  return (
    <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800 shadow-xl overflow-hidden flex flex-col justify-between transition-all hover:border-zinc-700">
      {/* Top Meta Bar */}
      <div className="px-5 py-3.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-700">
            <img
              src={
                isZeeter
                  ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'
                  : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80'
              }
              alt={post.account}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">@{post.account}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 uppercase tracking-wider">
                {post.type}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              <span className="text-zinc-300 font-medium">{post.scheduled_time_wat}</span>
              <span>•</span>
              <span className={isDue ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-medium'}>
                {countdown}
              </span>
            </div>
          </div>
        </div>

        {/* Source badge */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="capitalize">{post.source.replace(/_/g, ' ')}</span>
          </span>
          {onDelete && (
            <button
              onClick={() => onDelete(post.id)}
              className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded transition-colors"
              title="Remove from queue"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area: Preview Mockup & Text */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Visual Preview (5 cols) */}
        <div className="lg:col-span-5 bg-black rounded-xl overflow-hidden border border-zinc-800 relative group aspect-square flex items-center justify-center">
          {post.type === 'reel' ? (
            <div className="relative w-full h-full">
              <img
                src={post.image_urls[0]}
                alt="Reel thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/90 text-zinc-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <span className="mt-2 text-xs font-semibold text-white bg-black/60 px-2.5 py-1 rounded-full">
                  60s Reel Video
                </span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img
                src={post.image_urls[activeSlide] || post.image_urls[0]}
                alt={`Slide ${activeSlide + 1}`}
                className="w-full h-full object-cover"
              />

              {isCarousel && (
                <>
                  <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Layers className="w-3 h-3 text-cyan-400" />
                    <span>{activeSlide + 1}/{post.image_urls.length}</span>
                  </div>

                  {/* Carousel slide controls */}
                  <button
                    onClick={() => setActiveSlide(prev => (prev > 0 ? prev - 1 : post.image_urls.length - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveSlide(prev => (prev < post.image_urls.length - 1 ? prev + 1 : 0))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    {post.image_urls.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          idx === activeSlide ? 'bg-emerald-400 w-3' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Caption & Metadata (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
              <span className="font-semibold text-zinc-300">Campaign Payload</span>
              {post.cta && (
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  CTA: {post.cta}
                </span>
              )}
            </div>

            <div className="bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80 font-sans text-xs text-zinc-200 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
              {post.caption}
            </div>
          </div>

          {/* Quick Stats / Info */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400 pt-1">
            <span className="flex items-center gap-1 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>WAT Schedule: <strong className="text-zinc-200">{post.scheduled_time_wat}</strong></span>
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">
              Media: <strong className="text-zinc-200">{post.image_urls.length} item{post.image_urls.length > 1 ? 's' : ''}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* ONE BIG GREEN BUTTON: APPROVE & POST TO IG NOW */}
      <div className="p-5 pt-0">
        <button
          onClick={handlePublishClick}
          disabled={isPublishing || post.status === 'published'}
          className={`w-full py-4 px-6 rounded-xl font-bold text-base md:text-lg flex items-center justify-center gap-3 transition-all duration-150 cursor-pointer shadow-xl ${
            post.status === 'published'
              ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700'
              : isPublishing
              ? 'bg-emerald-600/80 text-white cursor-wait animate-pulse'
              : 'bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-zinc-950 hover:shadow-emerald-500/25 hover:scale-[1.01] active:scale-[0.99]'
          }`}
        >
          {isPublishing ? (
            <>
              <div className="w-5 h-5 border-3 border-zinc-950 border-t-transparent rounded-full animate-spin" />
              <span>PUBLISHING VIA GRAPH API V20.0...</span>
            </>
          ) : post.status === 'published' ? (
            <>
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <span>PUBLISHED TO INSTAGRAM</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5 fill-current" />
              <span>APPROVE &amp; POST TO IG NOW</span>
              <span className="text-xs bg-zinc-950/20 text-zinc-900 px-2 py-0.5 rounded font-mono font-medium hidden sm:inline-block">
                NO COPY-PASTE
              </span>
            </>
          )}
        </button>

        {post.permalink && (
          <div className="mt-3 p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between text-xs text-emerald-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Live on Instagram feed</span>
            </span>
            <a
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline hover:text-white flex items-center gap-1"
            >
              <span>View Post</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
