/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0B",
        slate: "#6B6B6B",
        mist: "#E5E5E5",
        sky: "#FEFEFE",
        accent: "#0B0B0B",
        accentMuted: "#1A1A1A"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
}
