import { BlogPostStoryCard } from "./blog-post-card";

export type BlogPost = {
  excerpt: string;
  coverImage: string;
  date: string;
  path: string;
  title: string;
  author: string;
};

export interface MoreBlogPostsProps {
  posts: BlogPost[];
}

export const generateSlugFromMdxPath = (path: string) => {
  return path.replace(".mdx", "");
}

export const MoreBlogPosts = ({ posts }: MoreBlogPostsProps) => {
  return (
    <div className="ui-container ui-mx-auto ui-grid ui-grid-cols-1 md:ui-grid-cols-2 ui-gap-8 ui-px-5">
    {posts.map(({ path, title, coverImage, date, excerpt, author }) => {
        const slug = generateSlugFromMdxPath(path);
        return (
          <BlogPostStoryCard
            key={slug}
            slug={slug}
            title={title}
            src={coverImage}
            date={date}
            excerpt={excerpt}
            author={author}
          />
        );
      })}
    </div>
  );
};
