import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0f172a",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          800: "#1e293b",
          900: "#0f172a",
        },
        gold: {
          DEFAULT: "#c9a84c",
          light: "#dfc27a",
          dark: "#8c6520",
        },
        cream: "#fbfaf6",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        soft: "0 18px 50px rgba(8, 38, 92, 0.08)",
        card: "0 4px 20px -2px rgba(15, 23, 42, 0.05)",
      },
      fontFamily: {
        display: ["Segoe UI", "system-ui", "-apple-system", "sans-serif"],
        sans: ["Segoe UI", "system-ui", "-apple-system", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;