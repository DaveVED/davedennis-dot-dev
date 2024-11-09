import React, { useEffect, useState } from 'react';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';

const components = {
  // Emphasis
  em: (props: React.HTMLAttributes<HTMLElement>) => {
    console.log("BINGBONG");
    return <em {...props} />;
  },
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