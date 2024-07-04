import { BackgroundLoop } from "@repo/ui/background-loop";
import { LandingSocialIcons } from "@repo/ui/landing-social-icons";
import { LandingScroll } from "@repo/ui/landing-scroll";
import Image from "next/image";
import DaveAvatar from "../../public/dave.jpg";

export default function LandingPage() {
  const hardcodedDate = "2023-07-01T00:00:00Z";

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
        <h2 className="mb-4 text-5xl md:text-7xl font-bold tracking-tighter leading-tight text-center">
          Blog Posts
        </h2>
        <h3 className="mb-8 text-2xl md:text-4xl font-light text-center text-gray-600">
          I like to write sometimes
        </h3>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-5">
          <StoryCard
            slug="next-js-cloudfront-analytics"
            title="Title"
            src="/dave.jpg"
            date={hardcodedDate}
            excerpt="Some excerpt"
            author={{ name: "test", picture: "/dave.jpg" }}
          />
          <StoryCard
            slug="next-js-cloudfront-analytics"
            title="Title"
            src="/dave.jpg"
            date={hardcodedDate}
            excerpt="Some excerpt"
            author={{ name: "test", picture: "/dave.jpg" }}
          />
          <StoryCard
            slug="next-js-cloudfront-analytics"
            title="Title"
            src="/dave.jpg"
            date={hardcodedDate}
            excerpt="Some excerpt"
            author={{ name: "test", picture: "/dave.jpg" }}
          />
        </div>
      </section>
    </main>
  );
}
type AvatarProps = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: AvatarProps) => (
  <div className="flex items-center mt-4">
    <Image src={picture} className="w-10 h-10 rounded-full mr-3" alt={name} width={40} height={40} />
    <div className="text-lg font-medium text-gray-700">{name}</div>
  </div>
);
