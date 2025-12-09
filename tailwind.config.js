/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f8ff",
          100: "#e6f0ff",
          200: "#bfe0ff",
          300: "#99d1ff",
          400: "#4daeff",
          500: "#187bff", // primary blue
          600: "#0f63d6",
          700: "#0b49a0",
          800: "#08306f",
          900: "#05163a"
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f7f9fc",
          alt: "#f2f6fb"
        },
        ui: {
          border: "#e6eefc",
          muted: "#6b7280"
        }
      },
      borderRadius: {
        lgx: "14px"
      },
      boxShadow: {
        soft: "0 6px 18px rgba(2,6,23,0.06)"
      }
    }
  },
  plugins: []
};
