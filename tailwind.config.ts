import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Sora", "system-ui", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--bg-base))",
        surface: "hsl(var(--bg-surface))",
        elevated: "hsl(var(--bg-elevated))",
        foreground: "hsl(var(--text-primary))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--text-muted))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          glow: "hsl(var(--accent-glow))",
        },
        border: {
          DEFAULT: "hsl(var(--border-subtle))",
          active: "hsl(var(--border-active))",
        },
        card: "hsl(var(--bg-surface))",
        primary: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(0 0% 100%)",
        },
        ring: "hsl(var(--accent))",
      },
      borderRadius: {
        card: "8px",
        feature: "20px",
        pill: "999px",
      },
      fontSize: {
        hero: "clamp(56px, 8vw, 96px)",
        section: "clamp(32px, 5vw, 56px)",
        card: "18px",
        meta: "13px",
        tag: "11px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        elevated: "var(--shadow-elevated)",
        glow: "var(--shadow-glow)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.4s ease-out both",
        shimmer: "shimmer 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
