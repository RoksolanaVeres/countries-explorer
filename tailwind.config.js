import { defineConfig } from "vite";
import tailwindAnimate from "tailwindcss-animate";

export default defineConfig({
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      sans: ["Poppins", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        oxford: {
          blue: "#001427",
          green: "#708d81",
          jasmine: "#f4d58d",
          orange: "#bf0603",
          red: "#8d0801",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-in",
      },
    },
  },
  plugins: [tailwindAnimate],
});
