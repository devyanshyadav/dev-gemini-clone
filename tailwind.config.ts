import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        rtlDark: '#1E1F20',
        rtlLight:'#F0F4F9',
        accentGray:'#94a3b8',
        accentBlue:"#3b82f6"
      }
    },
  },
  plugins: [],
};
export default config;
