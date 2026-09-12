import { INITIAL_QUEUE, INITIAL_ACCOUNTS } from '../../../src/data/seedData';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({
    queue: INITIAL_QUEUE,
    accounts: INITIAL_ACCOUNTS,
    total: INITIAL_QUEUE.length
  });
}
