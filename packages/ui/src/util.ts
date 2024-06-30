import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from 'remark-gfm';

export async function fetchGitMdxData(slug: string): Promise<MDXRemoteSerializeResult> {
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
