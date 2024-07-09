import { and, count, eq } from "drizzle-orm";
import { db } from ".";
import { likesTable } from "./schema";

export async function getPostsTotalLikes(postId: string): Promise<number> {
  const results = await db
    .select({
      totalLikes: count(likesTable.id),
    })
    .from(likesTable)
    .where(eq(likesTable.postId, postId));

  // Return the totalLikes value or 0 if results is undefined or empty
  return results[0]?.totalLikes ?? 0;
}

export async function hasUserLikedPost(
  userId: string,
  postId: string,
): Promise<boolean> {
  const results = await db
    .select({
      hasLiked: count(likesTable.id).as("hasLiked"),
    })
    .from(likesTable)
    .where(and(eq(likesTable.userId, userId), eq(likesTable.postId, postId)));

  // Return true if the user has liked the post, false otherwise
  return results[0]?.hasLiked !== undefined && results[0].hasLiked > 0;
}

export async function addLike(userId: string, postId: string): Promise<void> {
  await db.insert(likesTable).values({
    userId,
    postId,
    createdAt: new Date(),
  });
}

export async function removeLike(
  userId: string,
  postId: string,
): Promise<void> {
  await db
    .delete(likesTable)
    .where(and(eq(likesTable.userId, userId), eq(likesTable.postId, postId)));
}
