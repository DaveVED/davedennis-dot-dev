import {
    useParams,
  } from "react-router-dom";
import DynamicMdx from "./dynamic-mdx";
import frontMatter from 'front-matter';
import { useEffect, useState } from "react";
import  { formatDate } from "@/lib/utils";
import daveCaveAvatar from "../assets/dave-cave-avatar.png"
export const BlogPost = () => {
    const [post, setPost] = useState<any>(null);
    let { postId } = useParams();
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
      }, [postId]);
    
      if (post === null) {
        return <div>Loading...</div>;
      }
    return (
        <article className="container relative max-w-3xl py-6 lg:py-10">
    
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
            href={`https://twitter.com/DaveVED_`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm"
          >
            <img
              src={daveCaveAvatar}
              alt={"Dave Dennis"}
              width={42}
              height={42}
              className="rounded-full bg-white"
            />
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{"Dave Dennis"}</p>
              <p className="text-[12px] text-muted-foreground">
                @{"DaveVED_"}
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
      </article>
    );
}