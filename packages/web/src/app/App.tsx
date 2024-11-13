import { useRef } from 'react';
import { FeedItem, usePosts } from "@/hooks/use-posts";
import daveCaveAvatar from "../assets/dave-cave-avatar.png";
import Introduction from "@/components/introduction";
import Article from '@/components/article';
import { parseTags } from '@/lib/utils';
import { Icons } from "@/components/icons";
import { Link } from 'react-router-dom';

export default function App() {
  const introductionRef = useRef<HTMLElement>(null);
  const latestBlogsRef = useRef<HTMLElement>(null);

  const { feed, isLoading, isError } = usePosts();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load posts.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <main className="container mx-auto max-w-4xl px-4 py-6 lg:py-10">
        <section ref={introductionRef} className="container mx-auto px-4 py-6">
          <Introduction avatar={daveCaveAvatar} />
          <div className="flex justify-center space-x-4 mt-6">
            <SocialIcon href="https://twitter.com/DaveVED_" icon={Icons.twitter} label="Twitter" />
            <SocialIcon href="https://linkedin.com/in/davedennis93" icon={Icons.linkedIn} label="LinkedIn" />
            <SocialIcon href="https://github.com/DaveVED" icon={Icons.gitHub} label="GitHub" />
            <SocialIcon href="https://twitch.tv/daveved" icon={Icons.twitch} label="Twitch" />
            <SocialIcon href="https://instagram.com/davedennis" icon={Icons.instagram} label="Instagram" />
          </div>
        </section>

        <section ref={latestBlogsRef} className="mb-16">
          <h3 className="text-3xl font-semibold mb-8">Latest Blog Posts</h3>
          <hr className="my-8" />
          {feed?.length ? (
            <div className="grid gap-10 sm:grid-cols-2">
              {feed.map((post: FeedItem, index) => {
                const updatedPost = {
                  ...post,
                  tags: parseTags(post.tags),
                };
                return <Article key={post.path} post={updatedPost} index={index} />;
              })}
            </div>
          ) : (
            <p>No posts published.</p>
          )}
        </section>
      </main>
    </div>
  );
}

function SocialIcon({ href, icon: Icon, label }: { href: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string }) {
  // Map social platforms to their colors
  const colorMap: { [key: string]: string } = {
    Twitter: "hover:text-gray-800",
    LinkedIn: "hover:text-blue-700",
    GitHub: "hover:text-gray-800",
    Twitch: "hover:text-purple-600",
    Instagram: "hover:text-pink-500",
  };

  // Default color if no mapping is found
  const hoverColor = colorMap[label] || "hover:text-foreground";

  return (
    <Link
      to={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-foreground/60 ${hoverColor} transition-colors`}
    >
      <Icon className="w-6 h-6" />
      <span className="sr-only">{label}</span>
    </Link>
  );
}
