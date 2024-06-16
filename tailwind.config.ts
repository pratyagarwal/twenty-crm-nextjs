import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";

const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    screens: {
      xs: "360px",
      "2sm": "768px",
      md: "1024px",
      "2md": "1280px",
    },
    extend: {
      animation: {
        slideIn: "slideIn 200ms ease-out",
        slideOut: "slideOut 200ms ease-out",
      },
      keyframes: {
        slideIn: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        slideOut: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    createThemes({
      light: {
        bodyPrimary: "#FFF",
        bodySecondary: "#F1F1F1",
        text100: "#666666",
        text200: "#333333",
        text300: "#B3B3B3",
        text400: "#999999",
        border100: "#EBEBEB",
      },
      dark: {
        bodyPrimary: "#171717",
        bodySecondary: "#1C1C1C",
        text100: "#B3B3B3",
        text200: "#EBEBEB",
        text300: "#666666",
        text400: "#818181",
        border100: "#333333",
      },
      purpleLight: {
        bodyPrimary: "#FFFFFF",
        bodySecondary: "#F4F1FF",
        text100: "#666666",
        text200: "#333333",
        text300: "#B3B3B3",
        text400: "#999999",
        border100: "#EBEBEB",
      },
      purpleDark: {
        bodyPrimary: "#1C1C2C",
        bodySecondary: "#262636",
        text100: "#B3B3B3",
        text200: "#EBEBEB",
        text300: "#666666",
        text400: "#818181",
        border100: "#333333",
      },
    }),
  ],
} satisfies Config;

export default config;
