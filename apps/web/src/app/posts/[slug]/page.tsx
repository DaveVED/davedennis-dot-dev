import { MDXWrapper } from "@repo/ui/mdx-wrapper";
import { BlogPostLayout } from "@repo/ui/blogpost-layout";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

type Post = {
  content: string;
  date: string;
  path: string;
  title: string;
};

export async function fetchGitMdxData(
  slug: string,
): Promise<MDXRemoteSerializeResult> {
  const res = await fetch(
    `https://raw.githubusercontent.com/DaveVED/my-posts/master/posts/${slug}.mdx`,
  );
  const mdxText = await res.text();
  const mdxSource = await serialize(mdxText, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  return mdxSource;
}

export async function generateStaticParams() {
  const response = await fetch(
    "https://raw.githubusercontent.com/DaveVED/my-posts/master/feed.json",
  );
  const body = await response.text();

  let posts: Post[];

  try {
    posts = JSON.parse(body) as Post[];
    posts = posts.map((item) => ({
      ...item,
      path: item.path.substring(0, item.path.lastIndexOf(".")),
    }));
  } catch (e) {
    throw new Error("Unable to parse TIL Feed", { cause: e });
  }

  return posts.map((post) => ({ slug: post.path }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const mdxSource = await fetchGitMdxData(slug);

  return (
    <BlogPostLayout>
      <article className="prose prose-lg prose-gray text-gray-800">
        <MDXWrapper mdxSource={mdxSource} />
      </article>
    </BlogPostLayout>
  );
}
