import { IncomingMessage, ServerResponse } from 'http';
import { Plugin } from 'vite';
import {
  addScheduledPost,
  deleteQueueItem,
  getAccounts,
  getHistory,
  getLeads,
  getQueue,
  publishToInstagram,
  runCronDailyPublisher,
  setAutoPublish
} from './apiHandlers';

function parseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function sendJson(res: ServerResponse, statusCode: number, data: any) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.end(JSON.stringify(data, null, 2));
}

export function apiServerPlugin(): Plugin {
  return {
    name: 'sparkam-api-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';

        // Handle CORS Preflight
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          res.end();
          return;
        }

        // 1. Meta AI Webhook: /api/hooks/scheduled-post
        if (url.startsWith('/api/hooks/scheduled-post')) {
          if (req.method === 'GET') {
            // Return sample payload format for Meta AI scheduler
            return sendJson(res, 200, {
              status: 'active',
              description: 'Webhook receiver for Meta AI Scheduler payloads in Sparkam Auto-Publisher',
              wat_timezone: 'Africa/Lagos (UTC+1)',
              sample_payload: {
                account: 'sparkam.media',
                type: 'reel',
                caption: 'Fri 6PM Idea → Sun 4PM Live | AI Business Launch System ₦35k (was ₦85k)',
                image_urls: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80'],
                video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                scheduled_for: new Date(Date.now() + 1000 * 60 * 120).toISOString(),
                cta: 'Comment LAUNCH'
              },
              target_accounts: ['sparkam.media', 'zeeteroliver'],
              valid_types: ['reel', 'thread', 'carousel', 'image']
            });
          }

          if (req.method === 'POST') {
            const body = await parseBody(req);
            if (!body.caption && !body.type) {
              return sendJson(res, 400, {
                error: 'Invalid payload. Expected account, type, caption, and image_urls.'
              });
            }

            const post = addScheduledPost({
              account: body.account,
              type: body.type,
              caption: body.caption,
              image_urls: body.image_urls,
              video_url: body.video_url,
              scheduled_for: body.scheduled_for,
              cta: body.cta,
              source: 'meta_ai_webhook'
            });

            return sendJson(res, 201, {
              success: true,
              message: 'Payload received from Meta AI and queued as Ready to Post',
              post
            });
          }
        }

        // 2. Real Instagram Publish: /api/instagram/publish
        if (url.startsWith('/api/instagram/publish') && req.method === 'POST') {
          try {
            const body = await parseBody(req);
            const postId = body.postId;
            if (!postId) {
              return sendJson(res, 400, { error: 'Missing postId in request body' });
            }

            const result = await publishToInstagram(postId);
            return sendJson(res, 200, result);
          } catch (err: any) {
            return sendJson(res, 500, {
              success: false,
              error: err.message || 'Failed to publish to Instagram'
            });
          }
        }

        // 3. Queue endpoints: /api/queue
        if (url.startsWith('/api/queue')) {
          if (url === '/api/queue/toggle-autopublish' && req.method === 'POST') {
            const body = await parseBody(req);
            const updated = setAutoPublish(body.account, Boolean(body.enabled));
            return sendJson(res, 200, { success: true, account: updated });
          }

          if (url.startsWith('/api/queue/delete') && req.method === 'DELETE') {
            const query = new URL(url, 'http://localhost').searchParams;
            const id = query.get('id');
            if (id) {
              deleteQueueItem(id);
              return sendJson(res, 200, { success: true, id });
            }
          }

          if (url === '/api/queue/add' && req.method === 'POST') {
            const body = await parseBody(req);
            const post = addScheduledPost(body);
            return sendJson(res, 201, { success: true, post });
          }

          if (req.method === 'GET') {
            return sendJson(res, 200, {
              queue: getQueue(),
              accounts: getAccounts()
            });
          }
        }

        // 4. History endpoint: /api/history
        if (url.startsWith('/api/history') && req.method === 'GET') {
          return sendJson(res, 200, {
            history: getHistory()
          });
        }

        // 5. CRM endpoint: /api/crm
        if (url.startsWith('/api/crm') && req.method === 'GET') {
          return sendJson(res, 200, {
            sheetId: process.env.GOOGLE_SHEET_ID || '1BGO3RB...',
            leads: getLeads(),
            metrics: {
              totalWaitlist: getLeads().length,
              fulfilledPaystack: getLeads().filter(l => l.paystackStatus.includes('Fulfilled')).length,
              pending: getLeads().filter(l => l.paystackStatus === 'Pending').length
            }
          });
        }

        // 6. Vercel Cron: /api/cron/daily-publisher
        if (url.startsWith('/api/cron/daily-publisher')) {
          try {
            const result = await runCronDailyPublisher();
            return sendJson(res, 200, {
              success: true,
              cron: '0 * * * *',
              executedAt: new Date().toISOString(),
              result
            });
          } catch (err: any) {
            return sendJson(res, 500, { success: false, error: err.message });
          }
        }

        // 7. Setup & Env diagnostics: /api/setup/status
        if (url.startsWith('/api/setup/status') && req.method === 'GET') {
          return sendJson(res, 200, {
            watTime: new Date().toLocaleTimeString('en-US', {
              timeZone: 'Africa/Lagos',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true
            }),
            env: {
              IG_USER_ID_SPARKAM: Boolean(process.env.IG_USER_ID_SPARKAM),
              IG_TOKEN_SPARKAM: Boolean(process.env.IG_TOKEN_SPARKAM),
              IG_USER_ID_ZEETER: Boolean(process.env.IG_USER_ID_ZEETER),
              IG_TOKEN_ZEETER: Boolean(process.env.IG_TOKEN_ZEETER),
              FB_PAGE_ID: Boolean(process.env.FB_PAGE_ID),
              GOOGLE_SHEET_ID: Boolean(process.env.GOOGLE_SHEET_ID),
              GOOGLE_SERVICE_ACCOUNT_JSON: Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
              PAYSTACK_SECRET: Boolean(process.env.PAYSTACK_SECRET),
              VERCEL_KV_URL: Boolean(process.env.VERCEL_KV_URL)
            },
            accounts: getAccounts()
          });
        }

        next();
      });
    }
  };
}
