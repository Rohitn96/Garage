import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // Replacing rather than extending: a tight, deliberate palette is most of
    // what separates a designed page from a themed template.
    extend: {
      colors: {
        paper: "#CFD2D4",      // platinum ground
        panel: "#BFC3C6",      // one step down, for insets
        ink: "#15160F",        // near-black with a green cast
        graphite: "#454B50",   // secondary text
        rule: "#A8ADB1",       // hairlines
        pine: {
          DEFAULT: "#1B5E43",  // accent: British racing green
          deep: "#123D2C",
          pale: "#D5E0DA",
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
