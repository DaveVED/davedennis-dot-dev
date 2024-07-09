# davedennis-dot-dev

we learning.

```sql
--
-- Name: next_auth; Type: SCHEMA;
--
CREATE SCHEMA next_auth;
 
GRANT USAGE ON SCHEMA next_auth TO service_role;
GRANT ALL ON SCHEMA next_auth TO postgres;
 
--
-- Create users table
--
CREATE TABLE IF NOT EXISTS next_auth.users
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    name text,
    email text,
    "emailVerified" timestamp with time zone,
    image text,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email)
);
 
GRANT ALL ON TABLE next_auth.users TO postgres;
GRANT ALL ON TABLE next_auth.users TO service_role;
 
--- uid() function to be used in RLS policies
CREATE FUNCTION next_auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select
  	coalesce(
		nullif(current_setting('request.jwt.claim.sub', true), ''),
		(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
	)::uuid
$$;
 
--
-- Create sessions table
--
CREATE TABLE IF NOT EXISTS  next_auth.sessions
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    expires timestamp with time zone NOT NULL,
    "sessionToken" text NOT NULL,
    "userId" uuid,
    CONSTRAINT sessions_pkey PRIMARY KEY (id),
    CONSTRAINT sessionToken_unique UNIQUE ("sessionToken"),
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES  next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);
 
GRANT ALL ON TABLE next_auth.sessions TO postgres;
GRANT ALL ON TABLE next_auth.sessions TO service_role;
 
--
-- Create accounts table
--
CREATE TABLE IF NOT EXISTS  next_auth.accounts
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at bigint,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    oauth_token_secret text,
    oauth_token text,
    "userId" uuid,
    CONSTRAINT accounts_pkey PRIMARY KEY (id),
    CONSTRAINT provider_unique UNIQUE (provider, "providerAccountId"),
    CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES  next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);
 
GRANT ALL ON TABLE next_auth.accounts TO postgres;
GRANT ALL ON TABLE next_auth.accounts TO service_role;
 
--
-- Create verification_tokens table
--
CREATE TABLE IF NOT EXISTS  next_auth.verification_tokens
(
    identifier text,
    token text,
    expires timestamp with time zone NOT NULL,
    CONSTRAINT verification_tokens_pkey PRIMARY KEY (token),
    CONSTRAINT token_unique UNIQUE (token),
    CONSTRAINT token_identifier_unique UNIQUE (token, identifier)
);
 
GRANT ALL ON TABLE next_auth.verification_tokens TO postgres;
GRANT ALL ON TABLE next_auth.verification_tokens TO service_role;

-- Create likes table with post_id as a slug (text)
CREATE TABLE IF NOT EXISTS next_auth.likes (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    post_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT likes_pkey PRIMARY KEY (id),
    CONSTRAINT user_post_unique UNIQUE (user_id, post_id),
    CONSTRAINT likes_user_fkey FOREIGN KEY (user_id)
        REFERENCES next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

GRANT ALL ON TABLE next_auth.likes TO postgres;
GRANT ALL ON TABLE next_auth.likes TO service_role;

CREATE TABLE IF NOT EXISTS next_auth.likes (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    post_id text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    CONSTRAINT likes_pkey PRIMARY KEY (id),
    CONSTRAINT user_post_unique UNIQUE (user_id, post_id),
    CONSTRAINT likes_user_fkey FOREIGN KEY (user_id)
        REFERENCES next_auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
);

GRANT ALL ON TABLE next_auth.likes TO postgres;
GRANT ALL ON TABLE next_auth.likes TO service_role;

INSERT INTO next_auth.likes (user_id, post_id)
VALUES ('cfd405f2-d697-4c98-b126-5ccbc9f7a0fb', 'deploy-go-cli-to-npm');

SELECT COUNT(*) AS total_likes
FROM next_auth.likes
WHERE post_id = 'deploy-go-cli-to-npm';

SELECT * FROM next_auth.likes;

GRANT USAGE ON SCHEMA next_auth TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA next_auth TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA next_auth TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA next_auth TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA next_auth GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA next_auth GRANT ALL ON ROUTINES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA next_auth GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

```

```
"use client"
import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { Avatar } from "./avatar";
import { MessageCircle, Heart } from "lucide-react";
import cn from "classnames";
import { SupabaseClient } from "@supabase/supabase-js";
import { Session } from "next-auth";

interface FrontMatter {
  title: string;
  author: string;
  date: string;
  coverImage: string;
  excerpt: string;
}

interface BlogLayoutProps {
  children: ReactNode;
  frontmatter: FrontMatter;
  likes: number | null;
  postId: string;
  supabaseClient: SupabaseClient;
  session: Session | null;
}

export const BlogPostLayout = ({
  children,
  frontmatter,
  likes,
  postId,
  supabaseClient,
  session
}: BlogLayoutProps) => {
  const { title, author, date, coverImage } = frontmatter;
  const readTime = "5 min read";
  const commentsCount = 5;
  const likesCount = likes ?? 0;

  const [userLiked, setUserLiked] = useState(false);

  useEffect(() => {
    async function checkUserLiked() {
      try {
        const { data, error } = await supabaseClient
          .from("next_auth.likes")
          .select("id")
          .eq("post_id", postId)
          .eq("user_id", "cfd405f2-d697-4c98-b126-5ccbc9f7a0fb");

        if (error) {
          console.error("Error fetching like status:", error.message);
          return;
        }

        setUserLiked(data?.length > 0);
      } catch (error) {
        console.error("Error checking user like status:");
      }
    }

    checkUserLiked();
  }, [supabaseClient, postId]);

  const handleCommentClick = () => {
    alert("Comment icon clicked!");
  };

  /*const handleLikeClick = async () => {
    if (userLiked) {

      return;
    }

    try {
      const { data, error } = await supabaseClient.from("next_auth.likes").insert([
        {
          user_id: supabaseClient.auth.user()?.id,
          post_id: postId,
        },
      ]);

      if (error) {
        console.error("Error inserting like:", error.message);
        return;
      }

      setUserLiked(true);
    } catch (error) {
      console.error("Error liking post:", error.message);
    }
  };*/

  return (
    <div className="ui-container ui-mx-auto ui-px-4 ui-sm:px-6 ui-lg:px-8">
      <div className="ui-max-w-2xl ui-mx-auto ui-py-8">
        <header className="ui-mb-8">
          <h1 className="ui-text-3xl ui-font-bold ui-mt-4">{title}</h1>
          <Image
            src={coverImage}
            alt={`Cover Image for ${title}`}
            className={cn(
              "ui-w-full ui-max-w-[800px] ui-max-h-[200px] ui-rounded-md ui-object-cover",
            )}
            layout="responsive"
            width={1300}
            height={630}
          />
          <div className="ui-flex ui-items-center ui-text-gray-600 ui-mt-2">
            <Image
              src={"/dave.jpg"}
              className="ui-w-10 ui-h-10 ui-rounded-full ui-mr-3"
              alt={author}
              width={40}
              height={40}
            />
            <div className="ui-ml-4">
              <div>{author}</div>
              <div className="ui-flex ui-items-center ui-text-sm">
                <span>{readTime}</span>
                <span className="ui-mx-1">•</span>
                <time>{new Date(date).toDateString()}</time>
              </div>
            </div>
          </div>
          <hr className="ui-my-4" />
          <div className="ui-flex ui-items-center ui-text-gray-600 ui-mt-2">
            <div className="ui-flex ui-items-center ui-mr-4">
              <MessageCircle
                className="ui-w-5 ui-h-5 ui-mr-1 ui-cursor-pointer hover:ui-text-blue-500"
                onClick={handleCommentClick}
              />
              <span>{commentsCount}</span>
            </div>
            <div className="ui-flex ui-items-center">
              <Heart
                className={cn(
                  "ui-w-5 ui-h-5 ui-mr-1 ui-cursor-pointer",
                  { "hover:ui-text-red-500": !userLiked },
                  { "ui-text-red-500": userLiked }
                )}
                /*onClick={handleLikeClick}*/
              />
              <span>{likesCount}</span>
            </div>
          </div>
          <hr className="ui-my-4" />
        </header>
        {children}
      </div>
    </div>
  );
};
```