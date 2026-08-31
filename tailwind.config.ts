import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // Replacing rather than extending: a tight, deliberate palette is most of
    // what separates a designed page from a themed template.
    extend: {
      colors: {
        paper: "#ADB5BD",      // cool slate ground
        panel: "#9CA6AF",      // one step down, for insets
        ink: "#15160F",        // near-black with a green cast
        graphite: "#3C4148",   // secondary text — darkened for AA on this ground
        rule: "#8B959E",       // hairlines
        pine: {
          DEFAULT: "#174A35",  // accent — darkened for AA on this ground
          deep: "#0F3526",
          pale: "#C3CFC9",
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
