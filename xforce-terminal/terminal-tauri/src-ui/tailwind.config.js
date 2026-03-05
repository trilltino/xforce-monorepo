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
          bg: '#0a0a0f',
          panel: '#12121a',
          border: '#1e1e2e',
          text: '#e0e0e0',
          muted: '#6b7280',
          accent: '#3b82f6',
          success: '#10b981',
          danger: '#ef4444',
          warning: '#f59e0b',
        },
        neon: {
          blue: '#00d4ff',
          green: '#00ff88',
          purple: '#b829dd',
          orange: '#ff6b35',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}
