import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BlogPost } from "@/components/blog-post";
import { Blog } from "@/components/blog";
import RootLayout from "./components/root-layout";
import { SidebarProvider } from "./components/ui/sidebar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SidebarProvider>
        <RootLayout>
          <App />
        </RootLayout>
      </SidebarProvider>

    ),
  },
  {
    path: "/blog",
    element: (
      <RootLayout>
        <Blog />
      </RootLayout>
    ),
  },
  {
    path: "/blog/:postId",
    element: (
      <RootLayout>
        <BlogPost />
      </RootLayout>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
