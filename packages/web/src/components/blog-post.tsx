import {
    useParams
  } from "react-router-dom";
import DynamicMdx from "./dynamic-mdx";
import frontMatter from 'front-matter';
import { useEffect, useState } from "react";

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
      <div>
        <h3>ID: {postId}</h3>
        <DynamicMdx>{post.body}</DynamicMdx>
      </div>
    );
}