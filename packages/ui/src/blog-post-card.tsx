import { Avatar } from "./avatar";
import { BlogPostCardCoverImage } from "./blog-post-card-cover-image";
import Link from "next/link";
import { DateFormatter } from "./date-formater";

export interface BlogPostStoryCardProps {
  slug: string;
  title: string;
  src: string;
  date: string;
  excerpt: string;
  author: string;
}

export const BlogPostStoryCard = ({
  slug,
  title,
  src,
  date,
  excerpt,
  author,
}: BlogPostStoryCardProps) => (
  <div className="ui-p-6 ui-transition-shadow ui-duration-300">
    <div className="ui-mb-5">
      <BlogPostCardCoverImage slug={slug} title={title} src={src} />
    </div>
    <h3 className="ui-text-2xl ui-font-semibold ui-mb-3">
      <Link href={`/posts/${slug}`} legacyBehavior>
        <a className="ui-hover:ui-underline">{title}</a>
      </Link>
    </h3>
    <div className="ui-text-gray-600 ui-mb-4">
      <DateFormatter dateString={date} />
    </div>
    <p className="ui-text-gray-700 ui-leading-relaxed ui-mb-4">{excerpt}</p>
    <Avatar name={author} picture={"/dave.jpg"} />
  </div>
);
