import type { Config } from "tailwindcss";

/**
 * One ground, one ink, one accent.
 *
 * Three brand colours, and NOTHING else is invented:
 *
 *   charcoal  #14181B   the ground
 *   cream     #F2F0EB   the ink
 *   orange    #FF5A1F   the accent, and the only colour that ever means anything
 *
 * Every other value below is one of those three mixed into the charcoal at a
 * fixed opacity, so the palette stays three colours deep however many tints the
 * layout needs. The percentage is written beside each one; recompute rather than
 * eyeballing a replacement.
 *
 * Contrast on the charcoal ground: cream 15.7:1, graphite 6.0:1, orange 5.7:1,
 * and charcoal on an orange button 5.7:1. All clear AA.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#14181B",      // charcoal: the ground
        panel: "#1F2325",      // cream 5%, for insets and sticky chrome
        ink: "#F2F0EB",        // cream: the ink
        graphite: "#959594",   // cream 58%, secondary text
        rule: "#2C3032",       // cream 11% — structure, not accent
        ruleStrong: "#454849", // cream 22%, hover / active hairline
        accent: {
          DEFAULT: "#FF5A1F", // orange: the only colour with meaning
          dim: "#7E361D",     // orange 45%, at rest, for rules and inactive marks
          wash: "#30201B",    // orange 12%, ground for the rare filled surface
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
