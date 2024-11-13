import { FeedItem, usePosts } from "@/hooks/use-posts";
import { parseTags } from "@/lib/utils";
import Article from "./article";

export const Blog = () => {
    const { feed, isLoading, isError } = usePosts();
    
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Failed to load posts.</p>;
  
    return (
      <div className="container max-w-4xl py-6 lg:py-10">
        <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
          <div className="flex-1 space-y-4">
            <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              Random thoughts and learings from my day to day life.
            </p>
          </div>
        </div>
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
        </div>
        )
}