import { BlogPostCardCoverImage } from "./blog-post-card-cover-image.js";
import Link from "next/link";
import { DateFormatter } from "./date-formater.js";

interface StoryCardProps {
    slug: string;
    title: string;
    src: string;
    date: string;
    excerpt: string;
    author: {
      name: string;
      picture: string;
    };
  };
  
  export const StoryCard = ({ slug, title, src, date, excerpt, author }: StoryCardProps) => (
    <div className="p-6 transition-shadow duration-300">
      <div className="mb-5">
        <BlogPostCardCoverImage slug={slug} title={title} src={src} />
      </div>
      <h3 className="text-2xl font-semibold mb-3">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-gray-600 mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );

  