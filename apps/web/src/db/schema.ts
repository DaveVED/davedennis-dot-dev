import { pgTable, uuid, text, timestamp, pgSchema } from "drizzle-orm/pg-core";

const schema = pgSchema("next_auth");

export const likesTable = schema.table("likes", {
  id: uuid("id").primaryKey().default("uuid_generate_v4()"),
  userId: uuid("user_id").notNull(),
  postId: text("post_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const commentsTable = schema.table("comments", {
  commentId: uuid("comment_id").primaryKey().default("uuid_generate_v4()"),
  userId: uuid("user_id").notNull(),
  postId: text("post_id").notNull(),
  parentCommentId: uuid("parent_comment_id"), // Nullable by default
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const usersTable = schema.table("users", {
  id: uuid("id").primaryKey().default("uuid_generate_v4()"),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified"), // Nullable by default
  image: text("image"), // Nullable by default
});

export type InsertLike = typeof likesTable.$inferInsert;
export type SelectLike = typeof likesTable.$inferSelect;

export type InsertComment = typeof commentsTable.$inferInsert;
export type SelectComment = typeof commentsTable.$inferSelect;

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;