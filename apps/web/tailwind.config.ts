import type { Config } from "tailwindcss";

const config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {},
      fontFamily: {
        sans: ["var(--font-jakarta)"],
        geist: ["var(--font-geist-mono)"],
        bebas: ["var(--font-bebas)"],
        holbeard: ["var(--font-holbeard)"],
        digital: ["var(--font-digital)"],
      },
      keyframes: {},
      animation: {},
    },
  },
  plugins: [require("tailwind-gradient-mask-image")],
} satisfies Config;

export default config;