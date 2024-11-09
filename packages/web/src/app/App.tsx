import { useRef } from 'react';
import { FeedItem, usePosts } from "@/hooks/use-posts";
import daveCaveAvatar from "../assets/dave-cave-avatar.png";
import Introduction from "@/components/introduction";
import Article from '@/components/article';
import { parseTags } from '@/lib/utils';

export default function App() {
  const introductionRef = useRef<HTMLElement>(null);
  const latestBlogsRef = useRef<HTMLElement>(null);

  const { feed, isLoading, isError } = usePosts();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load posts.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <main className="container mx-auto max-w-4xl px-4 py-6 lg:py-10">
        <section ref={introductionRef} className="container mx-auto px-4 py-6">
          <Introduction avatar={daveCaveAvatar} />
        </section>

        <section ref={latestBlogsRef} className="mb-16">
          <h3 className="text-3xl font-semibold mb-8">Latest Blog Posts</h3>
          <hr className="my-8" />
          {feed?.length ? (
            <div className="grid gap-10 sm:grid-cols-2">
              {feed.map((post: FeedItem, index) => {
                const updatedPost = {
                  ...post,
                  tags: parseTags(post.tags),
                };
                return <Article key={post.path} post={updatedPost} index={index} />;
              })}
            </div>
          ) : (
            <p>No posts published.</p>
          )}
        </section>
      </main>
    </div>
  );
}