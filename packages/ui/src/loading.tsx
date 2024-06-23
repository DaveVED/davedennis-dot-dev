import { ReactNode } from "react";

interface LoadingProps {
  children?: ReactNode;
  spinnerColor?: string;
  textColor?: string;
  spinnerSize?: number;
  className?: string;
}

const sizeMap: { [key: number]: string } = {
  1: 'w-1 h-1',
  2: 'w-2 h-2',
  3: 'w-3 h-3',
  4: 'w-4 h-4',
  5: 'w-5 h-5',
  6: 'w-6 h-6',
  8: 'w-8 h-8',
  10: 'w-10 h-10',
  12: 'w-12 h-12',
  16: 'w-16 h-16',
  20: 'w-20 h-20',
  24: 'w-24 h-24',
  32: 'w-32 h-32',
  40: 'w-40 h-40',
  48: 'w-48 h-48',
  56: 'w-56 h-56',
  64: 'w-64 h-64',
};

const getSizeClass = (size: number): string => {
  return sizeMap[size] || sizeMap[12] as string;
};

export const Loading = ({
  children,
  spinnerColor = "border-t-purple-500 border-r-transparent",
  textColor = "text-white",
  spinnerSize = 12,
  className,
}: LoadingProps) => {
  const spinnerSizeClass = getSizeClass(spinnerSize);

  return (
    <div className={`flex flex-col ${className}`}>
      <div className={`animate-spin inline-block border-4 rounded-full ${spinnerSizeClass} ${spinnerColor}`}></div>
      <h1 className={`mt-4 text-4xl font-bold ${textColor}`}>
        {children ?? "Loading..."}
      </h1>
    </div>
  );
};
