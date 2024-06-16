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
        bodySecondary: "#D3D4DB",
        textPrimary: "#B3B3B3",
        textPrimaryHover: "#EBEBEB",
        textSecondary: "#666666",
      },
      dark: {
        bodyPrimary: "#171717",
        bodySecondary: "#1C1C1C",
        textPrimary: "#B3B3B3",
        textPrimaryHover: "#EBEBEB",
        textSecondary: "#666666",
      },
      purpleLight: {
        bodyPrimary: "#D2D5F2",
        bodySecondary: "#BCC1EC",
        textBase: "#8B8D98",
        textHover: "#1C2024",
      },
      purpleDark: {
        bodyPrimary: "#FFF",
        bodySecondary: "#D3D4DB",
        textBase: "#8B8D98",
        textHover: "#1C2024",
      },
    }),
  ],
} satisfies Config;

export default config;
