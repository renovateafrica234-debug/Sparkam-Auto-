export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const test = searchParams.get('test');

  return Response.json({
    status: 'active',
    endpoint: '/api/hooks/scheduled-post',
    description: 'Meta AI Scheduler Webhook Receiver for Sparkam Auto-Publisher (WAT = Africa/Lagos)',
    testMode: test === '1',
    samplePayload: {
      account: 'sparkam.media',
      type: 'reel',
      caption: 'Fri 6PM Idea → Sun 4PM Live | AI Business Launch System ₦35k (was ₦85k) | No code Paystack + Sheets + Vercel ⚡️',
      image_urls: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'],
      video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      scheduled_for: new Date(Date.now() + 3600000).toISOString(),
      cta: 'Comment LAUNCH'
    },
    metaAiInstructions: 'Send POST requests with JSON payload matching samplePayload. Post will appear immediately in Tonight’s Queue.'
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { account, type, caption, image_urls, video_url, scheduled_for, cta } = body;

    if (!account || !caption) {
      return Response.json({ error: 'Missing account or caption' }, { status: 400 });
    }

    const watTime = new Date(scheduled_for || Date.now()).toLocaleTimeString('en-US', {
      timeZone: 'Africa/Lagos',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const newPost = {
      id: `post-${Date.now()}`,
      account: account === 'sparkam.media' ? 'sparkam.media' : 'zeeteroliver',
      type: type || 'carousel',
      caption,
      image_urls: image_urls || [],
      video_url,
      scheduled_for: scheduled_for || new Date().toISOString(),
      scheduled_time_wat: `${watTime} WAT`,
      cta: cta || 'Link in Bio',
      status: 'ready_to_post',
      created_at: new Date().toISOString(),
      source: 'meta_ai_webhook'
    };

    return Response.json({
      success: true,
      message: 'Payload received from Meta AI and queued into Tonight’s Queue',
      post: newPost
    }, { status: 201 });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
