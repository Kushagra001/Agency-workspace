import type { Config } from "tailwindcss";

/** Base Tailwind config — extend this in every project */
const config: Partial<Config> = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Menlo", "monospace"],
      },
      colors: {
        surface: {
          DEFAULT: "#0a0a0a",
          1: "#111111",
          2: "#1a1a1a",
          3: "#222222",
        },
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
