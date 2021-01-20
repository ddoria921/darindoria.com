module.exports = {
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "7rem",
      },
      lineHeight: {
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        15: "4rem",
        16: "4.5rem",
        18: "5.5rem",
        19: "6rem",
        20: "7rem",
      },
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" },
        light: { raw: "(prefers-color-scheme: light)" },
      },
      colors: {
        code: {
          green: "#b5f4a5",
          yellow: "#ffe484",
          purple: "#d9a9ff",
          red: "#ff8383",
          blue: "#93ddfd",
          white: "#fff",
        },
      },
    },
  },
  variants: {
    translate: ["responsive", "hover", "focus", "group-hover"],
    borderWidth: ["hover", "focus"],
  },
  plugins: [require("@tailwindcss/typography")],
};
