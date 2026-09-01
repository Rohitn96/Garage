import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // Replacing rather than extending: a tight, deliberate palette is most of
    // what separates a designed page from a themed template.
    extend: {
      colors: {
        paper: "#0C0C0C",      // matte black ground
        panel: "#161616",      // one step UP, for insets
        ink: "#EDEBE6",        // warm off-white
        graphite: "#ABABA4",   // secondary text
        rule: "#D97F1F",       // borders and frames
        pine: {
          DEFAULT: "#35D68A",  // accent: emerald, live against matte black
          deep: "#6FE7AC",
          pale: "#12291F",
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
