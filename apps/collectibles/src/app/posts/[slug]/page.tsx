import { MDXWrapper } from "@repo/ui/mdx-wrapper";
import { BlogPostLayout, FrontMatter } from "@repo/ui/blogpost-layout";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

async function fetchGitMdxData(
  slug: string,
): Promise<
  MDXRemoteSerializeResult & { frontmatter: Record<string, unknown> }
> {
  const res = await fetch(
    `https://raw.githubusercontent.com/DaveVED/my-posts/master/posts/${slug}.mdx`,
  );
  const mdxText = await res.text();
  const mdxSource = await serialize(mdxText, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: "frontMatter" }],
      ],
    },
    parseFrontmatter: true, // required
  });
  return mdxSource as MDXRemoteSerializeResult;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const mdxSource = await fetchGitMdxData(slug);
  const seralizedFrontMatter: FrontMatter = {
    title: mdxSource.frontmatter.title as string,
    author: mdxSource.frontmatter.author as string,
    date: mdxSource.frontmatter.date as string,
    coverImage: mdxSource.frontmatter.coverImage as string,
    excerpt: mdxSource.frontmatter.excerpt as string,
  };

  return (
    <BlogPostLayout frontmatter={seralizedFrontMatter}>
      <article className="prose prose-lg prose-gray text-gray-800">
        <MDXWrapper mdxSource={mdxSource} />
      </article>
    </BlogPostLayout>
  );
}
