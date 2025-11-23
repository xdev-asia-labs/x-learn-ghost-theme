module.exports = {
  darkMode: 'class',
  mode: "jit",
  content: [
    "./.hbs",
    "./**/.hbs",
    "./**/*.js",
    "./**/**/*.hbs",
    "!./node_modules/**/*",
  ],
  corePlugins: {
    container: true,
  },
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#111827",
          800: "#1F2937",
          700: "#374151",
          600: "#4B5563",
          500: "#6B7280",
          400: "#9CA3AF",
          300: "#D1D5DB",
          200: "#E5E7EB",
          100: "#F3F4F6",
          50: "#F9FAFB",
        },
        blue: {
          900: "#1E3A8A",
          800: "#1E40AF",
          700: "#1D4ED8",
          600: "#2563EB",
          500: "#3B82F6",
          400: "#60A5FA",
          300: "#93C5FD",
          200: "#BFDBFE",
          100: "#DBEAFE",
          50: "#EFF6FF",
        },
        primary: {
          DEFAULT: "#0052D4", // Logo Dark Blue
          50: "#F0F7FF",
          100: "#E5F1FF",
          200: "#CCE4FF",
          300: "#9ECAFF",
          400: "#6FB1FC", // Logo Light Blue
          500: "#4364F7", // Logo Middle Blue
          600: "#0052D4", // Logo Dark Blue
          700: "#004BBD",
          800: "#003F9E",
          900: "#002C7A",
        },
        red: {
          800: "#FD4A00",
        },
        violet: {
          800: "#9747FF",
        },
        rose: {
          800: "#E43CB5",
        },
        amber: {
          100: "#FFFBDC",
          50: "#FFFEF2",
        },
        facebook: {
          100: "#3b5998",
        },
        twitter: {
          100: "#00acee",
        },
        linkedin: {
          100: "#0a66c2",
        },
      },
      container: {
        center: true, // centers the container
        padding: "1rem", // default padding
        screens: {
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1240px",
        },
      },
      fontFamily: {
        sans: [
          "'Be Vietnam Pro'",
          "var(--gh-font-body)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "'Be Vietnam Pro'",
          "var(--gh-font-heading)",
          "ui-serif",
          "Georgia",
          "serif",
        ],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        "extra-bold": 800,
        black: 900,
      },
      placeholderColor: {
        "gray-600": "#99A1A6",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        none: "none",
        // Liquid Glass shadows
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-sm": "0 4px 16px 0 rgba(31, 38, 135, 0.25)",
        "glass-lg": "0 16px 64px 0 rgba(31, 38, 135, 0.45)",
        "glass-colored": "0 8px 32px 0 rgba(99, 102, 241, 0.3)",
        "glow": "0 0 20px rgba(99, 102, 241, 0.5), 0 0 40px rgba(99, 102, 241, 0.3)",
        "glow-lg": "0 0 30px rgba(99, 102, 241, 0.6), 0 0 60px rgba(99, 102, 241, 0.4)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "40px",
        "3xl": "64px",
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      keyframes: {
        stretch: {
          "0%": { transform: "translateY(-10%)" },
          "50%": { transform: "translateY(-5%)" },
          "100%": { transform: "translateY(0%)" },
        },
        "liquid-flow": {
          "0%": {
            backgroundPosition: "0% 50%",
            transform: "scale(1)",
          },
          "50%": {
            backgroundPosition: "100% 50%",
            transform: "scale(1.02)",
          },
          "100%": {
            backgroundPosition: "0% 50%",
            transform: "scale(1)",
          },
        },
        "glass-float": {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
            opacity: "1",
          },
          "50%": {
            transform: "translateY(-10px) rotate(1deg)",
            opacity: "0.9",
          },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
            opacity: "1",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(99, 102, 241, 0.8)",
            opacity: "0.8",
          },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "bounce-slow": "ping 5s linear infinite",
        stretch: "stretch 5s ease-out 0s alternate infinite none running;",
        "liquid-flow": "liquid-flow 8s ease-in-out infinite",
        "glass-float": "glass-float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "scan": "scan 3s ease-in-out infinite",
      },
    },
  },

  // Other stuff
};
