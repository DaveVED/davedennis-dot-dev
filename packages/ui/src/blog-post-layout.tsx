"use client";

import { type ReactNode } from "react";

interface BlogLayoutProps {
  children: ReactNode;
}

export const BlogPostLayout = ({ children }: BlogLayoutProps) => {
  return (
    <div className="ui-container ui-mx-auto ui-px-4 ui-sm:px-6 ui-lg:px-8">
      <div className="ui-max-w-2xl ui-mx-auto ui-py-8">{children}</div>
    </div>
  );
};
