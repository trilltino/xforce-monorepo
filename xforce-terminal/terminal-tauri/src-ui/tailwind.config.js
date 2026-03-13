/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        terminal: {
          bg: '#000000',
          panel: '#000000',
          border: '#ffffff',
          text: '#ffffff',
          muted: '#888888',
          accent: '#ffffff',
          success: '#ffffff',
          danger: '#ffffff',
          warning: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
