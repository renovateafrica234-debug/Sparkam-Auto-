import { INITIAL_LEADS } from '../../../src/data/seedData';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    leads: INITIAL_LEADS,
    total: INITIAL_LEADS.length,
    sheetId: process.env.GOOGLE_SHEET_ID || '1BGO3RB...'
  });
}
