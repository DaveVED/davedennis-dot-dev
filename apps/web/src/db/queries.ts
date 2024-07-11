import { and, count, eq, asc } from "drizzle-orm";
import { db } from ".";
import { likesTable, commentsTable, usersTable } from "./schema";

// Function to get total likes for a post
export async function getPostsTotalLikes(postId: string): Promise<number> {
  const results = await db
    .select({
      totalLikes: count(likesTable.id),
    })
    .from(likesTable)
    .where(eq(likesTable.postId, postId));

  return results[0]?.totalLikes ?? 0;
}

// Function to check if a user has liked a post
export async function hasUserLikedPost(userId: string, postId: string): Promise<boolean> {
  const results = await db
    .select({
      hasLiked: count(likesTable.id).as("hasLiked"),
    })
    .from(likesTable)
    .where(and(eq(likesTable.userId, userId), eq(likesTable.postId, postId)));

  return results[0]?.hasLiked !== undefined && results[0].hasLiked > 0;
}

// Function to add a like to a post
export async function addLike(userId: string, postId: string): Promise<void> {
  await db.insert(likesTable).values({
    userId,
    postId,
    createdAt: new Date(),
  });
}

// Function to remove a like from a post
export async function removeLike(userId: string, postId: string): Promise<void> {
  await db
    .delete(likesTable)
    .where(and(eq(likesTable.userId, userId), eq(likesTable.postId, postId)));
}

export async function getComments(postId: string): Promise<any[]> {
  try {
    const result = await db
      .select({
        commentId: commentsTable.commentId,
        userId: commentsTable.userId,
        postId: commentsTable.postId,
        parentCommentId: commentsTable.parentCommentId,
        content: commentsTable.content,
        createdAt: commentsTable.createdAt,
        userName: usersTable.name,
      })
      .from(commentsTable)
      .innerJoin(usersTable, eq(commentsTable.userId, usersTable.id))
      .where(eq(commentsTable.postId, postId))
      .orderBy(asc(commentsTable.createdAt));

    console.log('Fetched comments:', result);
    return result;
  } catch (error) {
    console.error('Error in getComments:', error);
    throw error;
  }
}

// Function to add a comment to a post
export async function addComment(userId: string, postId: string, content: string, parentCommentId?: string): Promise<any> {
  try {
    const result = await db
      .insert(commentsTable)
      .values({
        userId,
        postId,
        content,
        parentCommentId,
        createdAt: new Date(),
      })
      .returning();

    console.log('Added comment:', result[0]);
    return result[0];
  } catch (error) {
    console.error('Error in addComment:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string): Promise<any> {
  const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
  return result[0];
}
