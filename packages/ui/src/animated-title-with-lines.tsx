import { type ReactNode } from "react";

interface AnimatedHeaderWithLinesProps {
  children: ReactNode;
  lineSize?: string;
  lineColor?: string;
  fontClassName?: string;
}

export const AnimatedHeaderWithLines = ({
  children,
  lineSize = "ui-w-full",
  lineColor = "ui-bg-blue-500",
  fontClassName = "ui-text-2xl ui-font-bold ui-text-center",
}: AnimatedHeaderWithLinesProps) => {
  return (
    <div className="ui-flex ui-flex-col ui-items-center ui-gap-2 ui-p-4">
      <div
        className={`${lineSize} ui-h-1 ${lineColor} ui-animate-move-left-to-right`}
      ></div>
      <div className={fontClassName}>{children}</div>
      <div
        className={`${lineSize} ui-h-1 ${lineColor} ui-animate-move-right-to-left`}
      ></div>
    </div>
  );
};
