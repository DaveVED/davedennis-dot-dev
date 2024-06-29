"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import DaveAvatar from "../../public/dave.jpg";
import { SimpleBackground } from "@repo/ui/simple-background";
import { Twitter, Github, Twitch, Linkedin } from "lucide-react";

type Post = {
  content: string;
  date: string;
  path: string;
  title: string;
};

export default function LandingPage() {
  const [showUpArrow, setShowUpArrow] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setShowUpArrow(window.scrollY > window.innerHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/DaveVED/my-posts/master/feed.json"
        );
        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <main className="relative h-screen overflow-y-auto" id="top">
        {/* Background video */}
        <SimpleBackground videoPath={"/recordplayer.mp4"} />

        {/* Content on top of the background */}
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-10 px-5 text-center text-mauve-12">
          <div className="relative p-5 border border-transparent bg-opacity-80 backdrop-blur-md">
            <Image
              src={DaveAvatar}
              alt="Dave's face"
              className="w-32 rounded-lg"
            />

            {/* Your name */}
            <div className="mt-2 text-lg font-bold text-white">Dave Dennis</div>

            {/* Social Icons */}
            <div className="mt-4 flex gap-4">
              <a
                href="https://x.com/DaveVED_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://github.com/DaveVED/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://www.twitch.tv/daveved"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitch className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/davedennis93"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </a>
            </div>

            {/* Animations */}
            <div className="absolute top-0 left-0 w-full h-px bg-white animate-move-right"></div>
            <div className="absolute top-0 right-0 h-full w-px bg-white animate-move-down"></div>
            <div className="absolute bottom-0 right-0 w-full h-px bg-white animate-move-left"></div>
            <div className="absolute bottom-0 left-0 h-full w-px bg-white animate-move-up"></div>
          </div>

          {/* Down arrow */}
          <div
            className="absolute bottom-5 right-5 cursor-pointer"
            onClick={() => scrollToSection("next-section")}
          >
            <div className="w-8 h-8 text-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="animate-bounce"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </main>

      {/* Next section - Blog Posts */}
      <section
        id="next-section"
        className="flex flex-col items-center justify-center bg-black text-white relative p-5 overflow-y-auto min-h-screen"
      >
        <h2 className="text-3xl font-bold mb-6">Blog Posts</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {posts.map((post) => (
            <li
              key={post.path}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <Image
                src="/path/to/hardcoded-image.jpg" // Replace with your image path
                alt={post.title}
                className="w-full h-48 object-cover"
                width={500}
                height={200}
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-400 mb-4">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <div className="prose prose-invert">
                  <p>{post.content.substring(0, 100)}...</p>
                </div>
                <a
                  href={`/posts/${post.path.replace(".mdx", "")}`}
                  className="text-yellow-400 hover:underline mt-4 inline-block"
                >
                  Read more
                </a>
              </div>
            </li>
          ))}
        </ul>

        {/* Up arrow */}
        {showUpArrow && (
          <div
            className="absolute bottom-5 right-5 cursor-pointer"
            onClick={() => scrollToSection("top")}
          >
            <div className="w-8 h-8 text-yellow-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="animate-bounce"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
