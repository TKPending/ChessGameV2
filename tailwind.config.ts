import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "light-tile": "#f0d9b5",
        "dark-tile": "#b58863",
        "enemy-tile": "#FF0000",
        "available-tile": "#0A4612",
        "error-red": "#CE0B0B",
        "page-background": "#B5B4C9",
      },
    },
  },
  plugins: [],
};
export default config;
