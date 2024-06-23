import { AnimatedHeaderWithLines } from "@repo/ui/animated-title-with-lines";
import Image from "next/image";
import DaveAvatar from "../../public/dave.jpg";
export default async function LandingPage() {
  return (
    <main className="relative h-screen overflow-y-hidden">
      <div className="pointer-events-none fixed inset-0 flex flex-col items-center justify-center gap-10 px-5 text-center text-mauve-12">
        <Image src={DaveAvatar} alt="Dave's face" className="w-32 rounded-lg" />
        <div className="flex h-8 items-center justify-center gap-5">
          <AnimatedHeaderWithLines lineColor="bg-purple-500">
            Dave Dennis
          </AnimatedHeaderWithLines>{" "}
        </div>
      </div>
    </main>
  );
}
