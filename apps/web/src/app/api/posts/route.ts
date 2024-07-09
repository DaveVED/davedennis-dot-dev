import { NextResponse } from 'next/server';
import { addLike, removeLike } from '../../../db/queries';

export async function POST(req: Request) {
  const { action, userId, postId } = await req.json();

  if (!userId || !postId) {
    return NextResponse.json({ message: 'User ID and Post ID are required' }, { status: 400 });
  }

  try {
    if (action === 'add-like') {
      await addLike(userId, postId);
      return NextResponse.json({ message: 'Like added successfully' });
    } else if (action === 'remove-like') {
      await removeLike(userId, postId);
      return NextResponse.json({ message: 'Like removed successfully' });
    } else {
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
  }
}
