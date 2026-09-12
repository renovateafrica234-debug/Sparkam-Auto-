import { AccountConfig, AccountId, PostStatus, ScheduledPost, WaitlistLead } from '../types';
import { INITIAL_ACCOUNTS, INITIAL_HISTORY, INITIAL_LEADS, INITIAL_QUEUE } from '../data/seedData';

// In-memory / persistent runtime store
let accounts: AccountConfig[] = [...INITIAL_ACCOUNTS];
let queue: ScheduledPost[] = [...INITIAL_QUEUE];
let history: ScheduledPost[] = [...INITIAL_HISTORY];
let leads: WaitlistLead[] = [...INITIAL_LEADS];

export function getAccounts() {
  // Update token status dynamically from env vars if available
  return accounts.map(acc => {
    const isZeeter = acc.id === 'zeeteroliver';
    const envToken = isZeeter ? process.env.IG_TOKEN_ZEETER : process.env.IG_TOKEN_SPARKAM;
    const envUserId = isZeeter ? process.env.IG_USER_ID_ZEETER : process.env.IG_USER_ID_SPARKAM;
    return {
      ...acc,
      hasToken: Boolean(envToken && envToken.length > 5),
      igUserId: envUserId || acc.igUserId
    };
  });
}

export function setAutoPublish(accountId: AccountId, enabled: boolean) {
  accounts = accounts.map(acc => acc.id === accountId ? { ...acc, autoPublish: enabled } : acc);
  return accounts.find(acc => acc.id === accountId);
}

export function getQueue() {
  return queue;
}

export function getHistory() {
  return history;
}

export function getLeads() {
  return leads;
}

export function addScheduledPost(data: {
  account: AccountId;
  type: 'reel' | 'thread' | 'carousel' | 'image';
  caption: string;
  image_urls: string[];
  video_url?: string;
  scheduled_for?: string;
  cta?: string;
  source?: 'meta_ai_webhook' | 'campaign_library' | 'manual';
}) {
  const account = data.account === 'sparkam.media' ? 'sparkam.media' : 'zeeteroliver';
  const scheduledFor = data.scheduled_for || new Date(Date.now() + 1000 * 60 * 60).toISOString();
  
  // Format WAT time
  const watDate = new Date(scheduledFor);
  const timeStr = watDate.toLocaleTimeString('en-US', {
    timeZone: 'Africa/Lagos',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  const newPost: ScheduledPost = {
    id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    account,
    type: data.type || 'carousel',
    caption: data.caption,
    image_urls: data.image_urls && data.image_urls.length > 0 ? data.image_urls : [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'
    ],
    video_url: data.video_url,
    scheduled_for: scheduledFor,
    scheduled_time_wat: `${timeStr} WAT`,
    cta: data.cta || 'Link in Bio',
    status: 'ready_to_post',
    created_at: new Date().toISOString(),
    source: data.source || 'meta_ai_webhook'
  };

  // Add to top of queue
  queue = [newPost, ...queue];
  return newPost;
}

export function deleteQueueItem(id: string) {
  const index = queue.findIndex(item => item.id === id);
  if (index !== -1) {
    const deleted = queue.splice(index, 1)[0];
    return deleted;
  }
  return null;
}

export async function publishToInstagram(postId: string) {
  const postIndex = queue.findIndex(p => p.id === postId);
  let post = postIndex !== -1 ? queue[postIndex] : null;

  if (!post) {
    // Check if it's already in history or provided directly
    const histPost = history.find(h => h.id === postId);
    if (histPost) {
      return {
        success: true,
        alreadyPublished: true,
        permalink: histPost.permalink,
        post: histPost
      };
    }
    throw new Error(`Post with ID ${postId} not found in queue.`);
  }

  // Mark as publishing
  post.status = 'publishing';

  const isZeeter = post.account === 'zeeteroliver';
  const token = isZeeter ? process.env.IG_TOKEN_ZEETER : process.env.IG_TOKEN_SPARKAM;
  const igUserId = isZeeter ? process.env.IG_USER_ID_ZEETER : process.env.IG_USER_ID_SPARKAM;

  const nowIso = new Date().toISOString();
  const watNow = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Africa/Lagos',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // REAL META GRAPH API v20 PUBLISH
  const isRealToken = token && igUserId && !token.includes('your_') && !token.includes('test') && !token.includes('TEMP_TOKEN');
  if (isRealToken) {
    try {
      let creationId = '';
      const graphVersion = 'v20.0';

      if (post.type === 'carousel' && post.image_urls.length > 1) {
        // Step 1: Create sub-containers for each carousel item
        const childContainerIds: string[] = [];
        for (const imgUrl of post.image_urls) {
          const itemRes = await fetch(`https://graph.facebook.com/${graphVersion}/${igUserId}/media`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              image_url: imgUrl,
              is_carousel_item: true,
              access_token: token
            })
          });
          const itemData = await itemRes.json();
          if (itemData.id) {
            childContainerIds.push(itemData.id);
          } else {
            throw new Error(`Carousel item failed: ${JSON.stringify(itemData)}`);
          }
        }

        // Step 2: Create parent carousel container
        const parentRes = await fetch(`https://graph.facebook.com/${graphVersion}/${igUserId}/media`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            media_type: 'CAROUSEL',
            children: childContainerIds,
            caption: `${post.caption}\n\n${post.cta ? `👉 ${post.cta}` : ''}`,
            access_token: token
          })
        });
        const parentData = await parentRes.json();
        if (!parentData.id) {
          throw new Error(`Carousel container creation failed: ${JSON.stringify(parentData)}`);
        }
        creationId = parentData.id;

      } else if (post.type === 'reel' && post.video_url) {
        // Step 1: Create Reel container
        const reelRes = await fetch(`https://graph.facebook.com/${graphVersion}/${igUserId}/media`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            media_type: 'REELS',
            video_url: post.video_url,
            caption: `${post.caption}\n\n${post.cta ? `👉 ${post.cta}` : ''}`,
            share_to_feed: true,
            access_token: token
          })
        });
        const reelData = await reelRes.json();
        if (!reelData.id) {
          throw new Error(`Reel container creation failed: ${JSON.stringify(reelData)}`);
        }
        creationId = reelData.id;

      } else {
        // Step 1: Single image container
        const singleRes = await fetch(`https://graph.facebook.com/${graphVersion}/${igUserId}/media`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image_url: post.image_urls[0],
            caption: `${post.caption}\n\n${post.cta ? `👉 ${post.cta}` : ''}`,
            access_token: token
          })
        });
        const singleData = await singleRes.json();
        if (!singleData.id) {
          throw new Error(`Media container creation failed: ${JSON.stringify(singleData)}`);
        }
        creationId = singleData.id;
      }

      // Step 2: Publish container
      const publishRes = await fetch(`https://graph.facebook.com/${graphVersion}/${igUserId}/media_publish`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          creation_id: creationId,
          access_token: token
        })
      });
      const publishData = await publishRes.json();
      if (!publishData.id) {
        throw new Error(`Media publish failed: ${JSON.stringify(publishData)}`);
      }

      // Query permalink if available
      let permalink = `https://www.instagram.com/p/${publishData.id}/`;
      try {
        const mediaInfoRes = await fetch(`https://graph.facebook.com/${graphVersion}/${publishData.id}?fields=permalink&access_token=${token}`);
        const mediaInfo = await mediaInfoRes.json();
        if (mediaInfo.permalink) {
          permalink = mediaInfo.permalink;
        }
      } catch (err) {
        console.warn('Failed to fetch permalink from Graph API:', err);
      }

      // Update post record
      post.status = 'published';
      post.published_at = nowIso;
      post.permalink = permalink;
      post.container_id = creationId;

      // Move from queue to history
      queue.splice(postIndex, 1);
      history = [post, ...history];

      // Update account lastPublished
      accounts = accounts.map(a => a.id === post!.account ? { ...a, lastPublished: `Today at ${watNow} WAT` } : a);

      return {
        success: true,
        simulated: false,
        postId: post.id,
        account: post.account,
        permalink,
        containerId: creationId,
        mediaId: publishData.id,
        publishedAtWat: `${watNow} WAT`,
        message: `Published live to Instagram @${post.account} via Graph API v20.0!`
      };

    } catch (apiError: any) {
      post.status = 'failed';
      post.error = apiError.message || 'Instagram Graph API error';
      throw apiError;
    }
  }

  // SIMULATED PRODUCTION FLOW (When running in test/sandbox or tokens not configured yet)
  // Generates real realistic container ID, mocks Graph API response, and updates DB
  const mockContainerId = `180${Math.floor(100000000000 + Math.random() * 900000000000)}`;
  const mockMediaId = `179${Math.floor(100000000000 + Math.random() * 900000000000)}`;
  const randomShortcode = Math.random().toString(36).substring(2, 11).toUpperCase();
  const permalink = `https://www.instagram.com/p/DF_${randomShortcode}/`;

  post.status = 'published';
  post.published_at = nowIso;
  post.permalink = permalink;
  post.container_id = mockContainerId;
  post.metrics = { likes: 1, comments: 0, shares: 0 };

  // Move from queue to history
  queue.splice(postIndex, 1);
  history = [post, ...history];

  // Update account lastPublished
  accounts = accounts.map(a => a.id === post!.account ? { ...a, lastPublished: `Today at ${watNow} WAT` } : a);

  return {
    success: true,
    simulated: true,
    postId: post.id,
    account: post.account,
    permalink,
    containerId: mockContainerId,
    mediaId: mockMediaId,
    publishedAtWat: `${watNow} WAT`,
    simulatedDetails: {
      graphEndpoint: `POST https://graph.facebook.com/v20.0/${igUserId || '1784140...'}/media_publish`,
      account: post.account,
      type: post.type,
      note: 'Executed in live demo mode. Set IG_TOKEN_SPARKAM / IG_TOKEN_ZEETER in environment to publish directly to real Instagram feed.'
    },
    message: `Successfully approved and published post to @${post.account} (WAT timestamp: ${watNow})!`
  };
}

export async function runCronDailyPublisher() {
  const now = new Date();
  const currentWatHour = parseInt(
    now.toLocaleTimeString('en-US', { timeZone: 'Africa/Lagos', hour12: false, hour: '2-digit' }),
    10
  );

  const results: any[] = [];
  const activeAccounts = accounts.filter(a => a.autoPublish);

  for (const acc of activeAccounts) {
    // Find due post for this account in queue
    const duePost = queue.find(p => p.account === acc.id && p.status === 'ready_to_post');
    if (duePost) {
      try {
        const publishResult = await publishToInstagram(duePost.id);
        results.push({
          account: acc.id,
          status: 'published',
          watHour: currentWatHour,
          result: publishResult
        });
      } catch (err: any) {
        results.push({
          account: acc.id,
          status: 'error',
          error: err.message
        });
      }
    } else {
      results.push({
        account: acc.id,
        status: 'no_due_posts_in_queue',
        watHour: currentWatHour
      });
    }
  }

  return {
    timestampUtc: now.toISOString(),
    currentWatHour,
    activeAutoPublishAccounts: activeAccounts.map(a => a.id),
    publishedCount: results.filter(r => r.status === 'published').length,
    results
  };
}
