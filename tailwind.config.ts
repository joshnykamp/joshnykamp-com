import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — dark, sophisticated, bridges tech + photography
        stone: {
          950: "#0d0d0d",
          900: "#161616",
          800: "#1e1e1e",
          700: "#2a2a2a",
          500: "#666666",
          400: "#888888",
          200: "#cccccc",
          100: "#f0ede6",
        },
        gold: {
          DEFAULT: "#e8c97a",
          light: "#f0d99a",
          dark: "#c4a050",
        },
        sky: {
          brand: "#7ab8e8",
        },
        sage: {
          brand: "#b8e87a",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#f0ede6",
            a: { color: "#e8c97a", "&:hover": { color: "#f0d99a" } },
            strong: { color: "#f0ede6" },
            h1: { color: "#f0ede6", fontFamily: "var(--font-playfair)" },
            h2: { color: "#f0ede6", fontFamily: "var(--font-playfair)" },
            h3: { color: "#f0ede6", fontFamily: "var(--font-playfair)" },
            code: { color: "#7ab8e8", backgroundColor: "#1e1e1e", padding: "2px 6px", borderRadius: "3px" },
            blockquote: { borderLeftColor: "#e8c97a", color: "#888888" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
