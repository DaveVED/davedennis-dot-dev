// tailwind.config.ts for apps/web
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx,md,js}", "../../packages/ui/src/**/*.{ts,tsx,mdx,md,js}"], // Add the path to the UI package
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        caveat: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
