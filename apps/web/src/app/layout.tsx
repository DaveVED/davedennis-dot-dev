import type { Metadata } from "next";
import "../../styles/globals.css";
import "@repo/ui/styles.css";
import { Navbar } from "@repo/ui/navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/auth";

export const metadata: Metadata = {
  title: "Dave Dennis",
  description: "Dave Dennis personal portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="h-full w-full overflow-y-auto">
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}
