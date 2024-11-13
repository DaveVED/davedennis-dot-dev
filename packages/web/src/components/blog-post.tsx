import { useParams, Link } from "react-router-dom";
import DynamicMdx from "./dynamic-mdx";
import { usePost } from "@/hooks/use-post";
import { BlogPostHeader } from "./blog-post-header";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  ChevronLeft,
} from "lucide-react"
export const BlogPost = () => {
  const { postId } = useParams();
  const { post, isLoading, isError } = usePost(postId);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load post.</p>;
  if (!post) return <p>No post...</p>;

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
        <Link to="/blog"  className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      <BlogPostHeader date={post.date} title={post.title} image={post.image} />
      <DynamicMdx>{post.body}</DynamicMdx>
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link to="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  );
};
