export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Check authorization if CRON_SECRET is set
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized cron invocation' }, { status: 401 });
  }

  const now = new Date();
  const watHour = parseInt(
    now.toLocaleTimeString('en-US', { timeZone: 'Africa/Lagos', hour12: false, hour: '2-digit' }),
    10
  );

  // 6 PM WAT = 18:00 (17:00 UTC) -> @zeeteroliver checklist thread
  // 8 PM WAT = 20:00 (19:00 UTC) -> @sparkam.media macro reel
  return Response.json({
    success: true,
    status: 'Daily Publisher Cron Executed',
    timestampUtc: now.toISOString(),
    watHour,
    scheduleMatches: {
      isZeeterTime: watHour === 18,
      isSparkamTime: watHour === 20
    },
    message: `Vercel hourly cron evaluated at ${watHour}:00 WAT.`
  });
}
