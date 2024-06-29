"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface MDXWrapperProps {
    mdxSource: MDXRemoteSerializeResult;
}

export const MDXWrapper = ({ mdxSource }: MDXWrapperProps) => {
    return <MDXRemote {...mdxSource} />;
};
