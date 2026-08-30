import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Garage-industrial base: charcoal through near-black.
        ink: "#0A0B0D",
        graphite: "#101217",
        steel: "#171A20",
        line: "#282C34",
        fog: "#9BA3AF",
        chalk: "#F3F5F8",
        // Single accent: warm signal orange, the colour of a shop light.
        rust: {
          DEFAULT: "#FF6B2C",
          dim: "#E2510F",
          glow: "#FF8A55",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wordmark: "0.18em",
      },
      maxWidth: {
        page: "1180px",
      },
      keyframes: {
        nudge: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.55" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
      },
      animation: {
        nudge: "nudge 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
