import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

interface BlogPostCardCoverImageProps {
  title: string;
  src: string;
  slug?: string;
}

export const BlogPostCardCoverImage = ({ title, src, slug }: BlogPostCardCoverImageProps) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("w-full max-w-[800px] max-h-[200px] rounded-md object-cover", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      layout="responsive"
      width={1300}
      height={630}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default BlogPostCardCoverImage;
