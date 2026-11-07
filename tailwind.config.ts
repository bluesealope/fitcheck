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
        ivory: "#F7F5F0",
        beige: "#E8E0D5",
        charcoal: "#252525",
        taupe: "#A58E79",
        editorial: {
          bg: "#F7F5F0",
          surface: "#FFFFFF",
          muted: "#E8E0D5",
          border: "#DED5C8",
          text: "#252525",
          subtext: "#6E655C",
          accent: "#A58E79",
          dark: "#1A1918",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        editorial: "0.18em",
        wide: "0.08em",
      },
    },
  },
  plugins: [],
};
export default config;

