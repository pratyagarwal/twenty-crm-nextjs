import type {Config} from "tailwindcss"

const config = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    prefix: "",
    theme: {
        screens: {
            xs: "360px",
            "2sm": "768px",
            md: "1024px",
            "2md": "1280px",
        },
        extend: {},
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
