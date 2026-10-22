import type { Config } from "tailwindcss";

/**
 * Tailwind reads the design tokens in app/globals.css. No colour, size or
 * duration is written here directly: each one is a CSS variable with a dark
 * and a light value, so a component styled once works in both themes.
 */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts", "./lib/**/*.{ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ground: token("ground"),
        surface: token("surface"),
        raised: token("raised"),
        ink: token("ink"),
        muted: token("muted"),
        faint: token("faint"),
        rule: token("rule"),
        ruleStrong: token("rule-strong"),
        accent: token("accent"),
        onAccent: token("on-accent"),
        ok: token("ok"),
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "step--2": ["var(--step--2)", { lineHeight: "1.4" }],
        "step--1": ["var(--step--1)", { lineHeight: "1.5" }],
        "step-0": ["var(--step-0)", { lineHeight: "1.65" }],
        "step-1": ["var(--step-1)", { lineHeight: "1.35" }],
        "step-2": ["var(--step-2)", { lineHeight: "1.2" }],
        "step-3": ["var(--step-3)", { lineHeight: "1.08" }],
        "step-4": ["var(--step-4)", { lineHeight: "1.02" }],
        "step-5": ["var(--step-5)", { lineHeight: "0.98" }],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius)",
        lg: "var(--radius-lg)",
      },
      transitionDuration: {
        1: "var(--dur-1)",
        2: "var(--dur-2)",
        3: "var(--dur-3)",
      },
      transitionTimingFunction: { out: "var(--ease-out)" },
      maxWidth: { page: "1240px", prose: "68ch" },
      letterSpacing: { label: "0.12em" },
    },
  },
  plugins: [],
};

export default config;
