import { INITIAL_HISTORY } from '../../../src/data/seedData';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    history: INITIAL_HISTORY,
    total: INITIAL_HISTORY.length
  });
}
