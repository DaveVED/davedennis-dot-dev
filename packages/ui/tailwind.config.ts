import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx,md,js}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: "#333",
            h1: {
              fontWeight: "700",
              fontSize: "2.5rem",
              lineHeight: "1.2",
              marginBottom: "1rem",
            },
            h2: {
              fontWeight: "600",
              fontSize: "2rem",
              lineHeight: "1.3",
              marginBottom: "0.75rem",
            },
            p: {
              marginBottom: "1.5rem",
              lineHeight: "1.8",
            },
            a: {
              color: "#1a0dab",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
            blockquote: {
              fontStyle: "italic",
              color: "#555",
              borderLeftColor: "#ddd",
              paddingLeft: "1rem",
              marginBottom: "1.5rem",
            },
            img: {
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
            },
            ul: {
              marginBottom: "1.5rem",
              paddingLeft: "1.5rem",
            },
            ol: {
              marginBottom: "1.5rem",
              paddingLeft: "1.5rem",
            },
            table: {
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "1.5rem",
            },
            th: {
              textAlign: "left",
              borderBottom: "2px solid #ddd",
              padding: "0.5rem",
            },
            td: {
              padding: "0.5rem",
              borderBottom: "1px solid #ddd",
            },
          },
        },
      },
    },
  },
  prefix: "ui-",
  plugins: [require("@tailwindcss/typography")],
};

export default config;
