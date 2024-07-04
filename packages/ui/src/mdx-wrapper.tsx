"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface MDXWrapperProps {
  mdxSource: MDXRemoteSerializeResult;
}

const components = {

};

export const MDXWrapper = ({ mdxSource }: MDXWrapperProps) => {
  return <MDXRemote {...mdxSource} components={components} />;
};
