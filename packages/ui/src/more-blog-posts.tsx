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
};

export const MoreBlogPosts = ({ posts }: MoreBlogPostsProps) => {
  return (
    <>
      <header className="ui-text-center ui-mb-8">
        <h1 className="ui-text-5xl ui-font-extrabold ui-mb-2 ui-text-gray-900 ui-leading-snug sm:ui-text-6xl">
          Cotent
        </h1>
        <p className="ui-text-base ui-text-gray-500 sm:ui-text-lg">
          I try and write sometimes.
        </p>
      </header>
      <div className="ui-container ui-mx-auto ui-grid ui-grid-cols-1 md:ui-grid-cols-2 ui-gap-6 ui-px-4">
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
    </>
  );
};
