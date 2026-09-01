import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // Replacing rather than extending: a tight, deliberate palette is most of
    // what separates a designed page from a themed template.
    extend: {
      colors: {
        paper: "#141414",      // ground
        panel: "#1E1E1E",      // one step UP, for insets
        ink: "#EDEBE6",        // warm off-white
        graphite: "#ABABA4",   // secondary text
        rule: "#D97F1F",       // borders and frames
        pine: {
          DEFAULT: "#7FBF9B",  // accent: sage, lifted for a dark ground
          deep: "#A6D7BC",
          pale: "#2A3F35",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { page: "1240px" },
      letterSpacing: { label: "0.14em" },
    },
  },
  plugins: [],
};

export default config;
