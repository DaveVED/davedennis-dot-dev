import { MDXWrapper } from "@repo/ui/mdx-wrapper";
import { BlogPostLayout } from "@repo/ui/blogpost-layout";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

async function fetchGitMdxData(
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
