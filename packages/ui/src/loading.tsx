import { type ReactNode } from "react";

interface LoadingProps {
  children?: ReactNode;
  spinnerColor?: string;
  textColor?: string;
  spinnerSize?: number;
  className?: string;
}

const sizeMap: { [key: number]: string } = {
  1: "ui-w-1 ui-h-1",
  2: "ui-w-2 ui-h-2",
  3: "ui-w-3 ui-h-3",
  4: "ui-w-4 ui-h-4",
  5: "ui-w-5 ui-h-5",
  6: "ui-w-6 ui-h-6",
  8: "ui-w-8 ui-h-8",
  10: "ui-w-10 ui-h-10",
  12: "ui-w-12 ui-h-12",
  16: "ui-w-16 ui-h-16",
  20: "ui-w-20 ui-h-20",
  24: "ui-w-24 ui-h-24",
  32: "ui-w-32 ui-h-32",
  40: "ui-w-40 ui-h-40",
  48: "ui-w-48 ui-h-48",
  56: "ui-w-56 ui-h-56",
  64: "ui-w-64 ui-h-64",
};

const getSizeClass = (size: number): string => {
  return sizeMap[size] || (sizeMap[12] as string);
};

export const Loading = ({
  children,
  spinnerColor = "ui-border-t-purple-500 ui-border-r-transparent",
  textColor = "ui-text-black",
  spinnerSize = 12,
  className,
}: LoadingProps) => {
  const spinnerSizeClass = getSizeClass(spinnerSize);

  return (
    <div className={`ui-flex ui-flex-col ${className}`}>
      <div
        className={`ui-animate-spin ui-inline-block ui-border-4 ui-rounded-full ${spinnerSizeClass} ${spinnerColor}`}
      ></div>
      <h1 className={`ui-mt-4 ui-text-4xl ui-font-bold ${textColor}`}>
        {children ?? "Loading..."}
      </h1>
    </div>
  );
};
