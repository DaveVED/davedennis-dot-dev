import Image from "next/image";
import DaveAvatar from "../../public/dave.jpg";
import { SimpleBackground } from "@repo/ui/simple-background";
import { Twitter, Github, Twitch, Linkedin } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="relative h-screen overflow-y-hidden">
      {/* Render the SimpleBackground component as the background */}
      <SimpleBackground videoPath={"/recordplayer.mp4"} />

      {/* Content on top of the background */}
      <div className="pointer-events-none fixed inset-0 flex flex-col items-center justify-center gap-10 px-5 text-center text-mauve-12">
        <div className="relative p-5 border border-transparent">
          <Image src={DaveAvatar} alt="Dave's face" className="w-32 rounded-lg" />

          {/* Your name */}
          <div className="mt-2 text-lg font-bold text-white">Dave Dennis</div>

          {/* Social Icons */}
          <div className="mt-4 flex gap-4">
            <a href="https://x.com/DaveVED_" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-6 h-6 text-white" />
            </a>
            <a href="https://github.com/DaveVED/" target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6 text-white" />
            </a>
            <a href="https://www.twitch.tv/daveved" target="_blank" rel="noopener noreferrer">
              <Twitch className="w-6 h-6 text-white" />
            </a>
            <a href="https://www.linkedin.com/in/davedennis93" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 text-white" />
            </a>
          </div>

          {/* Animations */}
          <div className="absolute top-0 left-0 w-full h-px bg-white animate-move-right"></div>
          <div className="absolute top-0 right-0 h-full w-px bg-white animate-move-down"></div>
          <div className="absolute bottom-0 right-0 w-full h-px bg-white animate-move-left"></div>
          <div className="absolute bottom-0 left-0 h-full w-px bg-white animate-move-up"></div>
        </div>
      </div>
    </main>
  );
}
