"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface MDXWrapperProps {
  mdxSource: MDXRemoteSerializeResult;
}

const components = {
  table: (props: React.HTMLProps<HTMLTableElement>) => (
    <table className="ui-table-auto ui-w-full" {...props} />
  ),
};

export const MDXWrapper = ({ mdxSource }: MDXWrapperProps) => {
  return <MDXRemote {...mdxSource} components={components} />;
};
