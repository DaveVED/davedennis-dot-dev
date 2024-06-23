import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {},
      keyframes: {},
      animation: {},
    },
  },
  prefix: "ui-",
  plugins: [],
} satisfies Config;

export default config;
