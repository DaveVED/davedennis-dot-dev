import useSWR from 'swr';
import frontMatter from 'front-matter';

const GITHUB_BASE_URI = "https://raw.githubusercontent.com/DaveVED/my-posts/main/posts";

export interface HeaderAttribute {
  title: string;
  summary: string;
  date: string;
  path: string;
  coverImage: string;
  tags?: string;
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.text())
    .then((mdxContent) => {
      const { attributes, body } = frontMatter<HeaderAttribute>(mdxContent);
      return {
        title: attributes.title || "Blog Post Title",
        date: attributes.date || new Date().toISOString(),
        image: attributes.coverImage || "https://via.placeholder.com/720x405",
        body,
      };
    });

export const usePost = (postId: string | undefined) => {
  const { data, error } = useSWR(postId ? `${GITHUB_BASE_URI}/${postId}.mdx` : null, fetcher);
  console.log(`Error: ${error}`);
  return {
    post: data,
    isLoading: !error && !data,
    isError: error,
  };
};
