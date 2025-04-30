/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom colors for Vercel-like dark theme
        "vercel-black": "#000000",
        "vercel-gray-100": "#111111",
        "vercel-gray-200": "#222222",
        "vercel-gray-300": "#333333",
        "vercel-gray-400": "#444444",
      },
    },
  },
  plugins: [],
};
