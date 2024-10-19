import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Article from "./app/Article.tsx";
import './index.css'; 
import Blog from "./app/Blog.tsx";

export 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "blog/:contactId",
    element: <Article />
  },
  {
    path: "blog/",
    element: <Blog />
  },
]);


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);