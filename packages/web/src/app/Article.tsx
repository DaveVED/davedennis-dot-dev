// src/pages/Article.tsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { cn } from "@/lib/utils";
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import DynamicMdx from '@/components/mdx-components';
import frontMatter from 'front-matter';

const author = {
  _id: "1",
  name: "Dave Cave",
  avatar: "https://github.com/davecave.png",
  twitter: "davecave"
};

export default function Article() {
  const [post, setPost] = useState<any>(null);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const fetchPost = async () => {
      // Replace with dynamic URL based on slug
      const response = await fetch(`https://raw.githubusercontent.com/DaveVED/my-posts/main/posts/deploy-go-cli-to-npm.mdx`);

      if (!response.ok) {
        // Handle error (e.g., post not found)
        setPost(null);
        return;
      }

      const mdxContent = await response.text();
      const { attributes, body } = frontMatter(mdxContent);
      // Placeholder logic to set post details
      // Ideally, parse the MDX frontmatter to extract these details
      setPost({
        title: "Blog Post Title", // Extract from MDX frontmatter
        date: new Date().toISOString(), // Extract from MDX frontmatter
        image: "https://via.placeholder.com/720x405", // Extract from MDX frontmatter
        body: body,
      });
    };

    fetchPost();
  }, [slug]);

  if (post === null) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        to="/blog"
        className={cn(
          "absolute left-[-200px] top-14 hidden xl:inline-flex",
          "px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>

      <div>
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(post.date)}
          </time>
        )}
        <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
          {post.title}
        </h1>
        <div className="mt-4 flex space-x-4">
          <a
            href={`https://twitter.com/${author.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm"
          >
            <img
              src={author.avatar}
              alt={author.name}
              width={42}
              height={42}
              className="rounded-full bg-white"
            />
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{author.name}</p>
              <p className="text-[12px] text-muted-foreground">
                @{author.twitter}
              </p>
            </div>
          </a>
        </div>
      </div>
      <img
        src={post.image}
        alt={post.title}
        width={720}
        height={405}
        className="my-8 rounded-md border bg-muted transition-colors"
      />
      {/* Render the MDX content */}
      <DynamicMdx>{post.body}</DynamicMdx>
      <div className="flex justify-center py-6 lg:py-10">
        <Link to="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  );
}
