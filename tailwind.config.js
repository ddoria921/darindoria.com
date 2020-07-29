module.exports = {
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" },
        light: { raw: "(prefers-color-scheme: light)" },
      },
    },
  },
  variants: {
    translate: ["responsive", "hover", "focus", "group-hover"],
  },
  plugins: [require("@tailwindcss/typography")],
};
