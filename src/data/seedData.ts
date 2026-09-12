import { AccountConfig, CampaignTemplate, ScheduledPost, WaitlistLead } from '../types';

export const INITIAL_ACCOUNTS: AccountConfig[] = [
  {
    id: 'zeeteroliver',
    name: 'ZEE ZAIN',
    handle: '@zeeteroliver',
    igUserId: process.env.IG_USER_ID_ZEETER || '17841400000000001',
    hasToken: Boolean(process.env.IG_TOKEN_ZEETER || true),
    autoPublish: false,
    dailyScheduleWat: '6:00 PM WAT (17:00 UTC)',
    campaignTitle: 'Daily 6 PM WAT Checklist Thread',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    lastPublished: 'Yesterday at 6:00 PM WAT'
  },
  {
    id: 'sparkam.media',
    name: 'Sparkam Media',
    handle: '@sparkam.media',
    igUserId: process.env.IG_USER_ID_SPARKAM || '17841400000000000',
    hasToken: Boolean(process.env.IG_TOKEN_SPARKAM || true),
    autoPublish: true,
    dailyScheduleWat: '8:00 PM WAT (19:00 UTC)',
    campaignTitle: 'Daily 8 PM WAT Macro Reel',
    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=160&auto=format&fit=crop&q=80',
    lastPublished: 'Yesterday at 8:00 PM WAT'
  }
];

export const CAMPAIGN_TEMPLATES: CampaignTemplate[] = [
  {
    id: 'thread-pack-abuja-checklist',
    title: '6 PM Thread Pack: Abuja 27-Point Website Checklist',
    account: 'zeeteroliver',
    type: 'thread',
    scheduledTimeWat: '6:00 PM WAT',
    hook: 'Developers charge ₦200k-₦500k in Abuja for websites that get zero sales.',
    caption: `Developers charge ₦200k-₦500k in Abuja for website templates that don't convert. 🙅‍♂️

Here is the exact 27-Point Abuja Website Conversion Checklist we used to revamp Glow Salon & Spa Wuse II:

1. 3-second Hero value proposition (Abuja local context)
2. WhatsApp instant chat anchor (1-tap direct booking)
3. Local currency checkout + Paystack instant verification
4. Real social proof + mobile load time under 1.8s

Result? 34 qualified appointments in the first 72 hours.
Drop a comment below with "CHECKLIST" and I'll DM you the free 27-point PDF breakdown right now! 👇

#AbujaWebsites #AbujaBusiness #ConversionRate #Wuse2 #AbujaEntrepreneurs #WebsiteAudit`,
    cta: 'Comment CHECKLIST',
    tags: ['#AbujaBusiness', '#WebDesignAbuja', '#GlowSalonCaseStudy', '#ConversionOptimization'],
    image_urls: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=1200&auto=format&fit=crop&q=80'
    ],
    description: '4-part carousel breakdown featuring Glow Salon Wuse II case study and 27-point checklist.'
  },
  {
    id: 'reel-pack-ai-launch-system',
    title: '8 PM Reel Pack: 48hr AI Business Launch System',
    account: 'sparkam.media',
    type: 'reel',
    scheduledTimeWat: '8:00 PM WAT',
    hook: 'Fri 6PM Idea → Sun 4PM Live | AI Business Launch System ₦35k (was ₦85k)',
    caption: `Fri 6PM Idea → Sun 4PM Live | AI Business Launch System ₦35k (was ₦85k) | No code Paystack + Sheets + Vercel ⚡️

Stop waiting weeks for a developer. In 48 hours, launch:
✅ High-converting landing page on Vercel
✅ Automated Google Sheet CRM (ID 1BGO3RB...)
✅ Paystack instant NGN payment checkout
✅ 24/7 Meta AI lead responder

Lock in the ₦35,000 launch offer (limited to 10 Abuja founders this week). Link in bio or comment "LAUNCH" for direct access! 🚀

#AbujaBusiness #AIKit #48hrLaunch #SparkamMedia #NoCodeAbuja #NigerianTech #PaystackNG`,
    cta: 'Comment LAUNCH or click link in bio',
    tags: ['#AbujaBusiness', '#AIKit', '#48hrLaunch', '#PaystackNG', '#SparkamMedia'],
    image_urls: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'
    ],
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: 'High-impact 60s Reel with macroeconomic payment dashboard demo and 48hr launch workflow.'
  },
  {
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
  },
  {
    id: 'glow-salon-testimonial',
    title: 'Glow Salon Wuse II Case Study & Testimonial',
    account: 'zeeteroliver',
    type: 'carousel',
    scheduledTimeWat: 'Special Feature WAT',
    hook: 'How Glow Salon & Spa Wuse II booked 34 appointments in 72 hours without paying influencers.',
    caption: `Client Spotlight: Glow Salon & Spa, Wuse II Abuja 💆‍♀️✨

Before: Relying solely on walk-ins and DM inquiries that took hours to answer manually.
After Sparkam Auto-Publisher & 27-Point funnel:
• 3-second mobile load time on Vercel
• 1-tap WhatsApp booking trigger
• Automated Paystack deposit confirmation
• 34 paid bookings in the first 72 hours.

"We stopped chasing DMs and started welcoming booked clients." — Amina Bello, Glow Salon Wuse II.

Want the exact blueprint for your Abuja service business? Comment 'GLOW' below! 👇

#GlowSalonAbuja #AbujaEntrepreneurs #Wuse2Abuja #SparkamMedia #LocalBusinessAbuja #PaystackAutomation`,
    cta: 'Comment GLOW for Full Case Study',
    tags: ['#GlowSalonAbuja', '#AbujaEntrepreneurs', '#Wuse2Abuja', '#SparkamMedia'],
    image_urls: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80'
    ],
    description: 'Real testimonial and before/after metrics from Glow Salon & Spa in Wuse II.'
  }
];

export const INITIAL_QUEUE: ScheduledPost[] = [
  {
    id: 'post-tonight-6pm-zeeter',
    account: 'zeeteroliver',
    type: 'thread',
    scheduled_for: new Date(Date.now() + 1000 * 60 * 45).toISOString(), // dynamically ~45 mins from now or 6 PM WAT
    scheduled_time_wat: '6:00 PM WAT (Tonight)',
    cta: 'Comment CHECKLIST',
    caption: `Developers charge ₦200k-₦500k in Abuja for website templates that don't convert. 🙅‍♂️

Here is the exact 27-Point Abuja Website Conversion Checklist we used to revamp Glow Salon & Spa Wuse II:

1. 3-second Hero value proposition (Abuja local context)
2. WhatsApp instant chat anchor (1-tap direct booking)
3. Local currency checkout + Paystack instant verification
4. Real social proof + mobile load time under 1.8s

Result? 34 qualified appointments in the first 72 hours.
Drop a comment below with "CHECKLIST" and I'll DM you the free 27-point PDF breakdown right now! 👇

#AbujaWebsites #AbujaBusiness #ConversionRate #Wuse2 #AbujaEntrepreneurs #WebsiteAudit`,
    image_urls: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=1200&auto=format&fit=crop&q=80'
    ],
    status: 'ready_to_post',
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    source: 'meta_ai_webhook'
  },
  {
    id: 'post-tonight-8pm-sparkam',
    account: 'sparkam.media',
    type: 'reel',
    scheduled_for: new Date(Date.now() + 1000 * 60 * 165).toISOString(),
    scheduled_time_wat: '8:00 PM WAT (Tonight)',
    cta: 'Comment LAUNCH',
    caption: `Fri 6PM Idea → Sun 4PM Live | AI Business Launch System ₦35k (was ₦85k) | No code Paystack + Sheets + Vercel ⚡️

Stop waiting weeks for a developer. In 48 hours, launch:
✅ High-converting landing page on Vercel
✅ Automated Google Sheet CRM (ID 1BGO3RB...)
✅ Paystack instant NGN payment checkout
✅ 24/7 Meta AI lead responder

Lock in the ₦35,000 launch offer (limited to 10 Abuja founders this week). Link in bio or comment "LAUNCH" for direct access! 🚀

#AbujaBusiness #AIKit #48hrLaunch #SparkamMedia #NoCodeAbuja #NigerianTech #PaystackNG`,
    image_urls: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'
    ],
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    status: 'ready_to_post',
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    source: 'meta_ai_webhook'
  }
];

export const INITIAL_HISTORY: ScheduledPost[] = [
  {
    id: 'hist-1',
    account: 'sparkam.media',
    type: 'carousel',
    caption: 'Why Paystack + Google Sheets is the ultimate lean stack for Abuja SMEs in 2026. Zero monthly SaaS fees, 100% automated receipting. Slide 3 breaks down the NGN webhook flow.',
    image_urls: [
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'
    ],
    scheduled_for: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    scheduled_time_wat: '8:00 PM WAT (Yesterday)',
    cta: 'Save this post',
    status: 'published',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    permalink: 'https://www.instagram.com/p/DF9u28zKxY1/',
    container_id: '18029384710293841',
    source: 'meta_ai_webhook',
    metrics: { likes: 142, comments: 28, shares: 19 }
  },
  {
    id: 'hist-2',
    account: 'zeeteroliver',
    type: 'reel',
    caption: 'Abuja sunset run through Millennium Park. Don’t build a business that chains you to an office chair. Automation is modern freedom.',
    image_urls: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80'
    ],
    video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    scheduled_for: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    scheduled_time_wat: '6:00 PM WAT (Yesterday)',
    cta: 'Comment FREEDOM',
    status: 'published',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(),
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    permalink: 'https://www.instagram.com/p/DF7o10pqWe2/',
    container_id: '17928374829102934',
    source: 'campaign_library',
    metrics: { likes: 310, comments: 45, shares: 33 }
  },
  {
    id: 'hist-3',
    account: 'sparkam.media',
    type: 'thread',
    caption: 'How we set up a ₦100 test payment on Paystack to verify end-to-end webhook delivery into Google Sheet 1BGO3RB... in under 8 minutes.',
    image_urls: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80'
    ],
    scheduled_for: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    scheduled_time_wat: '8:00 PM WAT (2 days ago)',
    cta: 'Check bio',
    status: 'published',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    permalink: 'https://www.instagram.com/p/DF5c81mQpRt/',
    container_id: '17849102938401928',
    source: 'meta_ai_webhook',
    metrics: { likes: 98, comments: 15, shares: 11 }
  }
];

export const INITIAL_LEADS: WaitlistLead[] = [
  {
    id: 'lead-1',
    timestamp: '2026-09-12 10:14 WAT',
    fullName: 'ZEE ZAIN (Test Checkout)',
    phoneOrWhatsapp: '+234 803 000 7712',
    email: 'renovateafrica234@gmail.com',
    businessName: 'Sparkam Media Lab',
    location: 'Garki 2, Abuja',
    paystackStatus: 'Fulfilled (₦100 Test)',
    paystackRef: 'T_PAY_8921829031_WAT',
    notes: 'Macro payment clean test passed. Webhook verified.',
    source: 'Vercel Landing Page'
  },
  {
    id: 'lead-2',
    timestamp: '2026-09-12 08:30 WAT',
    fullName: 'Amina Bello',
    phoneOrWhatsapp: '+234 812 443 8910',
    email: 'amina@glowsalon.ng',
    businessName: 'Glow Salon & Spa',
    location: 'Wuse II, Abuja',
    paystackStatus: 'Fulfilled (₦35,000)',
    paystackRef: 'PSTK_LIVE_90238128_GLOW',
    notes: '27-point checklist subscriber. Ready for 48hr launch.',
    source: 'Instagram @zeeteroliver (6 PM Checklist)'
  },
  {
    id: 'lead-3',
    timestamp: '2026-09-11 21:05 WAT',
    fullName: 'Emeka Okafor',
    phoneOrWhatsapp: '+234 809 111 4482',
    email: 'emeka@garkiautohub.com',
    businessName: 'Garki Auto Hub',
    location: 'Ahmadu Bello Way, Area 11',
    paystackStatus: 'Fulfilled (₦35,000)',
    paystackRef: 'PSTK_LIVE_88291039_EMK',
    notes: 'Saw 8 PM Macro Reel on @sparkam.media. Paystack verified.',
    source: 'Instagram @sparkam.media (8 PM Reel)'
  },
  {
    id: 'lead-4',
    timestamp: '2026-09-11 16:40 WAT',
    fullName: 'Fatima Al-Hassan',
    phoneOrWhatsapp: '+234 805 777 2209',
    email: 'fatima@maitamaconsults.com',
    businessName: 'Maitama Strategic Consults',
    location: 'Maitama, Abuja',
    paystackStatus: 'Pending',
    paystackRef: 'PSTK_PND_77182930_MAIT',
    notes: 'Requested invoice for 3 team seats. Followed up on WhatsApp.',
    source: 'Vercel Landing Page'
  }
];
