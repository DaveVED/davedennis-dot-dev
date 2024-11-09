// src/components/DynamicMdx.tsx
import React, { useEffect, useState } from 'react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { cn } from '@/lib/utils';

import { Callout } from '@/components/callout';
import { MdxCard } from '@/components/mdx-card';

const components = {
  // Emphasis
  em: (props: React.HTMLAttributes<HTMLElement>) => {
    console.log("BINGBONG");
    return <em {...props} />;
  },

  // Headings (h1 - h6)
  h1: ({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    console.log('Rendering custom h1');
    return (
      <h1
        className={cn(
          "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
          className
        )}
        {...props}
      />
    );
  },
  h2: ({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    console.log('Rendering custom h2');
    return (
      <h2
        className={cn(
          "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
          className
        )}
        {...props}
      />
    );
  },
  h3: ({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),

  // Links
  a: ({ className = '', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "font-medium underline underline-offset-4 text-blue-500 hover:text-blue-700",
        className
      )}
      {...props}
    />
  ),

  // Paragraphs
  p: ({ className = '', ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),

  // Lists
  ul: ({ className = '', ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className = '', ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className = '', ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),

  // Blockquote
  blockquote: ({ className = '', ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic text-gray-600",
        className
      )}
      {...props}
    />
  ),

  // Images
  img: ({
    className = '',
    alt = '',
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      className={cn("rounded-md border", className)}
      alt={alt}
      {...props}
    />
  ),

  // Horizontal Rule
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8 border-gray-300" {...props} />
  ),

  // Tables
  table: ({ className = '', ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className = '', ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className = '', ...props }: React.ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className = '', ...props }: React.TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className = '', ...props }: React.HTMLAttributes<HTMLElement>) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black text-white py-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className = '', ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm bg-gray-800 text-white",
        className
      )}
      {...props}
    />
  ),
  Callout,
  Card: MdxCard,
};


interface DynamicMdxProps {
    children: string; // MDX content as a string
  }
  
  const DynamicMdx: React.FC<DynamicMdxProps> = ({ children }) => {
    const [Content, setContent] = useState<React.ComponentType | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const compileMdx = async () => {
        try {
          const { default: ContentComponent } = await evaluate(children, {
            ...runtime,
            jsx: runtime.jsx,
          });
          setContent(() => ContentComponent);
        } catch (err) {
          console.error('Error compiling MDX:', err);
          setError('Failed to compile MDX content.');
        }
      };
  
      compileMdx();
    }, [children]);
  
    if (error) {
      return <div className="text-red-500">{error}</div>;
    }
  
    if (!Content) {
      return <div>Loading content...</div>;
    }
  
    // Pass components prop here to the rendered Content component
    return <Content components={components} />;
  };
  
  export default DynamicMdx;

  import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  disabled?: boolean;
}

export function MdxCard({
  href,
  className,
  children,
  disabled,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      {...props}
    >
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-muted-foreground">
          {children}
        </div>
      </div>
      {href && (
        <Link to={disabled ? "#" : href} className="absolute inset-0">
          <span className="sr-only">View</span>
        </Link>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils"

interface CalloutProps {
  icon?: string
  children?: React.ReactNode
  type?: "default" | "warning" | "danger"
}

export function Callout({
  children,
  icon,
  type = "default",
  ...props
}: CalloutProps) {
  return (
    <div
      className={cn("my-6 flex items-start rounded-md border border-l-4 p-4", {
        "border-red-900 bg-red-50": type === "danger",
        "border-yellow-900 bg-yellow-50": type === "warning",
      })}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div>{children}</div>
    </div>
  )
}