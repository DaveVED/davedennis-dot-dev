import { NextRequest, NextResponse } from 'next/server';
import { addComment, getComments } from '../../../db/queries';

// Handler for GET requests to fetch comments for a specific post
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ message: 'Post ID is required' }, { status: 400 });
  }

  try {
    const comments = await getComments(postId);
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error }, { status: 500 });
  }
}

// Handler for POST requests to add a new comment
export async function POST(req: NextRequest) {
  const { userId, postId, content, parentCommentId } = await req.json();

  if (!userId || !postId || !content) {
    return NextResponse.json({ message: 'User ID, Post ID, and Content are required' }, { status: 400 });
  }

  try {
    const comment = await addComment(userId, postId, content, parentCommentId);
    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error }, { status: 500 });
  }
}
