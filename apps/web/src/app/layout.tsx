import type { Metadata } from "next";
import "../../styles/globals.css";
import "@repo/ui/styles.css";

export const metadata: Metadata = {
  title: "Dave Dennis",
  description: "Dave Dennis personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-full w-full overflow-y-auto"> {children} </body>
    </html>
  );
}
