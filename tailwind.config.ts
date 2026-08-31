import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    // Replacing rather than extending: a tight, deliberate palette is most of
    // what separates a designed page from a themed template.
    extend: {
      colors: {
        paper: "#F4F2EC",      // warm off-white ground
        panel: "#EBE7DE",      // one step down, for insets
        ink: "#15160F",        // near-black with a green cast
        graphite: "#4E5147",   // secondary text
        rule: "#D6D1C4",       // hairlines
        pine: {
          DEFAULT: "#1B5E43",  // accent
          deep: "#123D2C",
          pale: "#DDE6DE",
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
