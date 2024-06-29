// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx, md, js}"],
  theme: {},
  plugins: [require("@tailwindcss/typography")],
};

export default config;
