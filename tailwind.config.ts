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
        slideInLtr: "slideInLtr 200ms ease-out",
        slideOutLtr: "slideOutLtr 200ms ease-out",
        slideInRtl: "slideInRtl 200ms ease-out",
        slideOutRtl: "slideOutRtl 200ms ease-out",
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade: "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade: "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade: "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        slideInLtr: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        slideOutLtr: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        slideInRtl: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        slideOutRtl: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
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
        border200: "#F1F1F1",
        bgHover100: "#0000000A",
        activeCell: "#F5F9FD",
      },
      dark: {
        bodyPrimary: "#171717",
        bodySecondary: "#1C1C1C",
        text100: "#B3B3B3",
        text200: "#EBEBEB",
        text300: "#666666",
        text400: "#818181",
        border100: "#333333",
        border200: "#222222",
        bgHover100: "#FFFFFF0F",
        activeCell: "#141A25",
      },
      purpleLight: {
        bodyPrimary: "#FFFFFF",
        bodySecondary: "#F4F1FF",
        text100: "#666666",
        text200: "#333333",
        text300: "#B3B3B3",
        text400: "#999999",
        border100: "#EBEBEB",
        border200: "#F1F1F1",
        bgHover100: "#0000000A",
        activeCell: "#F5F9FD",
      },
      purpleDark: {
        bodyPrimary: "#1C1C2C",
        bodySecondary: "#262636",
        text100: "#B3B3B3",
        text200: "#EBEBEB",
        text300: "#666666",
        text400: "#818181",
        border100: "#333333",
        border200: "#222222",
        bgHover100: "#FFFFFF0F",
        activeCell: "#141A25",
      },
    }),
  ],
} satisfies Config;

export default config;
