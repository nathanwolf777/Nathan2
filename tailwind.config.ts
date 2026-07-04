import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0a0b",
        graphite: "#131316",
        smoke: "#1c1c21",
        mist: "#8a8a94",
        pearl: "#f4f4f5",
        accent: "#c9a24b",
        "accent-soft": "#e2c987",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(135deg,#e2c987 0%,#c9a24b 40%,#8f6f2c 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
