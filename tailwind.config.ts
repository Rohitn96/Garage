import type { Config } from "tailwindcss";

/**
 * One ground, one ink, one accent.
 *
 * The previous palette ran an orange (#D97F1F) on every hairline against an
 * emerald accent and a green car — three hues competing for the same job.
 * Rules are structure, not decoration: they now sit barely above the ground and
 * the accent is the only colour that ever means anything.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#0B0B0C",     // ground
        panel: "#141416",     // one step up, for insets and sticky chrome
        ink: "#EFEDE8",       // warm off-white
        graphite: "#94948E",  // secondary text
        rule: "#26262A",      // hairlines — structure, not accent
        ruleStrong: "#3A3A40", // hover / active hairline
        accent: {
          DEFAULT: "#35D68A", // electric mint: the only colour with meaning
          dim: "#1E7A4E",     // accent at rest, for rules and inactive marks
          wash: "#0F241B",    // accent ground for the rare filled surface
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
