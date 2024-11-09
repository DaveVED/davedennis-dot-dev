import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
    const date = new Date(input);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  
  export function formatPostSlug(input: string): string {
    const parts = input.split("/");
    return  parts[parts.length - 1].replace(".mdx", "")
  }

  export function parseTags(tags: string | undefined): string[] {
    if (!tags || typeof tags !== 'string') {
      return [];
    }
  
    return tags
      .split('|')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  }
  