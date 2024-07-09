import { pgTable, uuid, text, timestamp, pgSchema } from "drizzle-orm/pg-core";

const schema = pgSchema("next_auth");

export const likesTable = schema.table("likes", {
  id: uuid("id").primaryKey().default("uuid_generate_v4()"),
  userId: uuid("user_id").notNull(),
  postId: text("post_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type InsertUser = typeof likesTable.$inferInsert;
export type SelectUser = typeof likesTable.$inferSelect;
