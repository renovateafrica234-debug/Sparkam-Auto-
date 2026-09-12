export const dynamic = 'force-dynamic';

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  return Response.json({
    success: true,
    deletedId: id,
    message: 'Post removed from queue'
  });
}
