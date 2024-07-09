"use client";

import { type ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { Avatar } from "./avatar";
import { MessageCircle, Heart } from "lucide-react";
import cn from "classnames";

export interface FrontMatter {
  title: string;
  author: string;
  date: string;
  coverImage: string;
  excerpt: string;
}

interface BlogLayoutProps {
  children: ReactNode;
  frontmatter: FrontMatter;
}

export const BlogPostLayout = ({ children, frontmatter }: BlogLayoutProps) => {
  const { title, author, date, coverImage } = frontmatter;
  const readTime = "5 min read"; // Hardcoded read time for now
  const commentsCount = 5; // Hardcoded comments count for now
  const likesCount = 5; // Hardcoded likes count for now

  const handleCommentClick = () => {
    alert("Comment icon clicked!");
  };

  const handleLikeClick = () => {
    alert("Like icon clicked!");
  };

  /*const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const contentElement = document.querySelector(".blog-content");
    if (!contentElement) return;

    const headingElements = contentElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const headingsArray = Array.from(headingElements).map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
    }));

    setHeadings(headingsArray);
  }, []);*/

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
                className="ui-w-5 ui-h-5 ui-mr-1 ui-cursor-pointer hover:ui-text-red-500"
                onClick={handleLikeClick}
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
