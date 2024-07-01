import { SimpleBackground } from "@repo/ui/simple-background";
import { SocialIcons } from "@repo/ui/profile-social-icons";
import { Scroll } from "@repo/ui/profile-scroll";
import { Posts } from "@repo/ui/profile-posts";
import Image from "next/image";
import DaveAvatar from "../../public/dave.jpg";

export default function LandingPage() {
  return (
    <main className="relative h-screen overflow-y-auto" id="top">
      <section id="introduction-section" className="h-screen relative">
        <SimpleBackground videoPath={"/recordplayer.mp4"} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-5 text-center text-mauve-12">
          <div className="relative flex flex-col items-center p-5 border border-transparent bg-opacity-80 backdrop-blur-md">
            <Image
              src={DaveAvatar}
              alt="Dave's face"
              className="w-32 rounded-lg object-cover"
            />
            <div className="mt-2 text-lg font-bold text-white">Dave Dennis</div>
            <SocialIcons />
            <div className="absolute top-0 left-0 w-full h-px bg-white animate-move-right"></div>
            <div className="absolute top-0 right-0 h-full w-px bg-white animate-move-down"></div>
            <div className="absolute bottom-0 right-0 w-full h-px bg-white animate-move-left"></div>
            <div className="absolute bottom-0 left-0 h-full w-px bg-white animate-move-up"></div>
          </div>
        </div>
        <Scroll direction="DOWN" scrollSection="blog-section" />
      </section>

      <section id="blog-section" className="relative">
        <div className="container max-w-5xl px-4 py-12 mx-auto">
          <div className="grid gap-4 mx-4 sm:grid-cols-12">
            <div className="col-span-12 sm:col-span-3">
              <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:dark:bg-violet-600">
                <h3 className="text-3xl font-semibold">Some Blog Posts</h3>
                <span className="text-sm font-bold tracking-wider uppercase dark:text-gray-600">
                  I try to write some posts when I can.
                </span>
              </div>
            </div>
            <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
              <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-300">
                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-600">
                  <h3 className="text-xl font-semibold tracking-wide">
                    Donec porta enim vel
                  </h3>
                  <time className="text-xs tracking-wide uppercase dark:text-gray-600">
                    Dec 2020
                  </time>
                  <p className="mt-3">
                    Pellentesque feugiat ante at nisl efficitur, in mollis orci
                    scelerisque. Interdum et malesuada fames ac ante ipsum
                    primis in faucibus.
                  </p>
                </div>
                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-600">
                  <h3 className="text-xl font-semibold tracking-wide">
                    Aliquam sit amet nunc ut
                  </h3>
                  <time className="text-xs tracking-wide uppercase dark:text-gray-600">
                    Jul 2019
                  </time>
                  <p className="mt-3">
                    Morbi vulputate aliquam libero non dictum. Aliquam sit amet
                    nunc ut diam aliquet tincidunt nec nec dui. Donec mollis
                    turpis eget egestas sodales.
                  </p>
                </div>
                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:dark:bg-violet-600">
                  <h3 className="text-xl font-semibold tracking-wide">
                    Pellentesque habitant morbi
                  </h3>
                  <time className="text-xs tracking-wide uppercase dark:text-gray-600">
                    Jan 2016
                  </time>
                  <p className="mt-3">
                    Suspendisse tincidunt, arcu nec faucibus efficitur, justo
                    velit consectetur nisl, sit amet condimentum lacus orci nec
                    purus. Mauris quis quam suscipit, vehicula felis id,
                    vehicula enim.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
