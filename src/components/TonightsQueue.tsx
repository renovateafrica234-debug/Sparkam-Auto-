import React from 'react';
import { Clock, Plus, Zap, AlertCircle } from 'lucide-react';
import { ScheduledPost } from '../types';
import { PostCard } from './PostCard';

interface TonightsQueueProps {
  queue: ScheduledPost[];
  onPublish: (postId: string) => Promise<void>;
  onDelete?: (postId: string) => void;
  publishingId: string | null;
  onOpenCreateModal: () => void;
}

export const TonightsQueue: React.FC<TonightsQueueProps> = ({
  queue,
  onPublish,
  onDelete,
  publishingId,
  onOpenCreateModal
}) => {
  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span>Tonight's Queue</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {queue.length} Ready
              </span>
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Abuja WAT automated campaigns (Daily 6 PM WAT @zeeteroliver thread &amp; Daily 8 PM WAT @sparkam.media reel).
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="px-3.5 py-1.5 text-xs font-semibold text-zinc-200 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>New Scheduled Post</span>
        </button>
      </div>

      {queue.length === 0 ? (
        <div className="p-12 rounded-2xl bg-zinc-900/40 border border-dashed border-zinc-800 text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-3 text-zinc-500">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-zinc-300">All campaigns published for tonight!</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            Meta AI scheduler will push tomorrow's 6 PM and 8 PM payloads, or you can restore from Content Library below.
          </p>
          <button
            onClick={onOpenCreateModal}
            className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors cursor-pointer"
          >
            Create or Restore Post
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {queue.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onPublish={onPublish}
              onDelete={onDelete}
              isPublishing={publishingId === post.id}
            />
          ))}
        </div>
      )}
    </section>
  );
};
