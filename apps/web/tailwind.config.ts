import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {},
      keyframes: {},
      animation: {},
    },
  },
  plugins: [],
} satisfies Config;

export default config;
