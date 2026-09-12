export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { account, type, caption, cta, image_urls, video_url, scheduled_for, source } = body;

    const watTime = new Date(scheduled_for || Date.now()).toLocaleTimeString('en-US', {
      timeZone: 'Africa/Lagos',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    const newPost = {
      id: `post-${Date.now()}`,
      account: account || 'sparkam.media',
      type: type || 'reel',
      caption,
      cta: cta || 'Link in Bio',
      image_urls: image_urls || ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'],
      video_url,
      scheduled_for: scheduled_for || new Date().toISOString(),
      scheduled_time_wat: `${watTime} WAT`,
      status: 'ready_to_post',
      created_at: new Date().toISOString(),
      source: source || 'manual'
    };

    return Response.json({
      success: true,
      message: 'Post added to Tonight’s Queue',
      post: newPost
    }, { status: 201 });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
