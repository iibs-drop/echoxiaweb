import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Identité EchoXIA
        brand: {
          DEFAULT: "#2A4D85", // bleu principal
          dark: "#14254A", // texte principal / bleu profond
        },
        accent: {
          DEFAULT: "#268AA6", // cyan d'accent
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F1F6FB", // fond secondaire légèrement bleuté
        },
        line: "#E1E9F2", // bordures discrètes
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20, 37, 74, 0.04), 0 8px 24px rgba(20, 37, 74, 0.06)",
        card: "0 2px 8px rgba(20, 37, 74, 0.05), 0 16px 40px rgba(20, 37, 74, 0.08)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
