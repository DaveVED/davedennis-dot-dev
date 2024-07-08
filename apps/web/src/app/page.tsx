import { BackgroundLoop } from "@repo/ui/background-loop";
import { LandingSocialIcons } from "@repo/ui/landing-social-icons";
import { LandingScroll } from "@repo/ui/landing-scroll";
import Image from "next/image";
import DaveAvatar from "../../public/dave.jpg";
import { MoreBlogPosts, BlogPost } from "@repo/ui/more-blog-posts";

async function fetchBlogPostFeed() {
  const response = await fetch(
    "https://raw.githubusercontent.com/DaveVED/my-posts/main/feed.json",
  );
  const blogPosts: BlogPost[] = await response.json();

  return blogPosts;
}

export default async function LandingPage() {
  const blogPosts = await fetchBlogPostFeed();

  return (
    <main className="relative h-screen overflow-y-auto" id="top">
      <section id="introduction-section" className="h-screen relative">
        <BackgroundLoop videoPath={"/recordplayer.mp4"} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-5 text-center text-mauve-12">
          <div className="relative flex flex-col items-center p-5 border border-transparent bg-opacity-60 backdrop-blur-md">
            <Image
              src={DaveAvatar}
              alt="Dave's face"
              className="w-32 rounded-lg object-cover"
            />
            <div className="mt-2 text-lg font-bold text-white">Dave Dennis</div>
            <LandingSocialIcons />
            <div className="absolute top-0 left-0 w-full h-px bg-white animate-move-right"></div>
            <div className="absolute top-0 right-0 h-full w-px bg-white animate-move-down"></div>
            <div className="absolute bottom-0 right-0 w-full h-px bg-white animate-move-left"></div>
            <div className="absolute bottom-0 left-0 h-full w-px bg-white animate-move-up"></div>
          </div>
        </div>
        <LandingScroll direction="DOWN" scrollSection="blog-section" />
      </section>

      <section id="blog-section" className="relative py-20 bg-gray-50">
        {blogPosts.length > 0 && <MoreBlogPosts posts={blogPosts} />}
        <LandingScroll direction="UP" scrollSection="introduction-section" />
      </section>
    </main>
  );
}