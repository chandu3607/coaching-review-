import type { Config } from "tailwindcss";

/**
 * Dark-first theme. The `slate` and `brand` scales are intentionally INVERTED
 * (50 = darkest page tone, 900 = lightest text) so every utility in the app
 * flips to dark without per-component overrides.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          50: "#0a0b10", 100: "#11131a", 200: "#1c2030", 300: "#2a3042", 400: "#667089",
          500: "#8791a8", 600: "#a4adc2", 700: "#c0c7d8", 800: "#dde1ec", 900: "#f2f4f9", 950: "#ffffff",
        },
        brand: {
          50: "#0b1a2b", 100: "#0e2640", 200: "#133a5f", 300: "#1b5d94", 400: "#2e8fd9",
          500: "#3ba4f0", 600: "#2b8ee6", 700: "#8cc8fb", 800: "#b4daff", 900: "#d9ecff", 950: "#ffffff",
        },
        surface: { DEFAULT: "#0f1118", raised: "#151824" },
        ink: { DEFAULT: "#07080c", soft: "#10131c" },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 0 0 1px rgba(255,255,255,.03) inset, 0 10px 30px -12px rgba(0,0,0,.6)",
        glow: "0 0 0 1px rgba(59,164,240,.35), 0 18px 50px -18px rgba(59,164,240,.45)",
      },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        grow: { "0%": { transform: "scaleX(0)" }, "100%": { transform: "scaleX(1)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      animation: {
        "fade-up": "fade-up .6s cubic-bezier(.2,.7,.2,1) both",
        grow: "grow .9s cubic-bezier(.2,.7,.2,1) both",
        float: "float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
