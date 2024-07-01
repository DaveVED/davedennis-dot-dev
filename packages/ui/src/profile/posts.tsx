import React from "react";
import { SimpleBackground } from "../simple-background";
import { Post } from "./post";
import { title } from "process";

export type Post = {
  content: string;
  date: string;
  path: string;
  title: string;
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(
    "https://raw.githubusercontent.com/DaveVED/my-posts/master/feed.json"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts: Post[] = await response.json();
  return posts;
};

export const Posts = async () => {
  const posts = await getPosts();

  return (
      <div className="ui-w-full ui-max-w-6xl ui-mx-auto ui-px-4 md:ui-px-6 ui-py-24">
        <div className="ui-flex ui-flex-col ui-justify-center ui-divide-y ui-divide-slate-200 [&>*]:ui-py-16">
          <div className="ui-w-full ui-max-w-3xl ui-mx-auto">
            {posts.map((post, index) => (
                <Post
                index={index}
                title={post.title}
                date={post.date}
                content={post.content}
                path={post.path}
                />
            ))}
          </div>
        </div>
    </div>
  );
};
