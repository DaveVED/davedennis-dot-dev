"use client";

type ScrollDirection = "UP" | "DOWN";

interface ScrollProps {
  direction: ScrollDirection;
  scrollSection: string;
}

export const Scroll = ({ direction, scrollSection }: ScrollProps) => {
  const scrollPath = direction === "DOWN" ? "M19 9l-7 7-7-7" : "M5 15l7-7 7 7";
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="ui-absolute ui-bottom-5 ui-right-5 ui-cursor-pointer"
      onClick={() => scrollToSection(scrollSection)}
    >
      <div className="ui-w-8 ui-h-8 ui-text-yellow-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          className="ui-animate-bounce"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={scrollPath} />
        </svg>
      </div>
    </div>
  );
};
