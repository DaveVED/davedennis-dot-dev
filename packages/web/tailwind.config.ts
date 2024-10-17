// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Pick<Config, "content" | "presets" | "theme" | "darkMode"> = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-mode="dark"]'],
};

export default config;
