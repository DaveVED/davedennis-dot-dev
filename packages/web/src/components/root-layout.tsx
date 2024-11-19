import React from "react";
import { AppSidebar } from "./app-sidebar";
import Navbar from "./navbar";
import { SidebarProvider } from "./ui/sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}