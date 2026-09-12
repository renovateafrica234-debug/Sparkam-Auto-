export type AccountId = 'sparkam.media' | 'zeeteroliver';
export type PostType = 'reel' | 'thread' | 'carousel' | 'image';
export type PostStatus = 'ready_to_post' | 'publishing' | 'published' | 'failed' | 'draft';

export interface ScheduledPost {
  id: string;
  account: AccountId;
  type: PostType;
  caption: string;
  image_urls: string[];
  video_url?: string;
  scheduled_for: string; // ISO string
  scheduled_time_wat: string; // e.g. "6:00 PM WAT"
  cta: string;
  status: PostStatus;
  created_at: string;
  published_at?: string;
  permalink?: string;
  container_id?: string;
  error?: string;
  source: 'meta_ai_webhook' | 'campaign_library' | 'manual';
  metrics?: {
    likes?: number;
    comments?: number;
    shares?: number;
  };
}

export interface AccountConfig {
  id: AccountId;
  name: string;
  handle: string;
  igUserId: string;
  hasToken: boolean;
  autoPublish: boolean;
  dailyScheduleWat: string;
  campaignTitle: string;
  avatarUrl: string;
  lastPublished?: string;
}

export interface WaitlistLead {
  id: string;
  timestamp: string;
  fullName: string;
  phoneOrWhatsapp: string;
  email: string;
  businessName: string;
  location: string;
  paystackStatus: 'Fulfilled (₦100 Test)' | 'Fulfilled (₦35,000)' | 'Pending' | 'Abandoned';
  paystackRef: string;
  notes: string;
  source: string;
}

export interface CampaignTemplate {
  id: string;
  title: string;
  account: AccountId;
  type: PostType;
  scheduledTimeWat: string;
  hook: string;
  caption: string;
  cta: string;
  tags: string[];
  image_urls: string[];
  video_url?: string;
  description: string;
}
