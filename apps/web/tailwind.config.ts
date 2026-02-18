import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sora)"]
      },
      colors: {
        ink: "#0b0f1a",
        haze: "#eef2f6",
        ocean: "#0f6fff",
        mint: "#9ff0d0",
        tangerine: "#ffb267",
        violet: "#5b4cff"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
        glass: "0 8px 40px rgba(15, 23, 42, 0.12)"
      },
      backgroundImage: {
        glow: "radial-gradient(circle at top, rgba(255,255,255,0.7), rgba(255,255,255,0))",
        grid: "linear-gradient(to right, rgba(15, 23, 42, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
