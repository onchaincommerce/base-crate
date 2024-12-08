import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        csgo: {
          dark: '#1b2838',
          darker: '#0e1623',
          blue: {
            light: '#66c0f4',
            DEFAULT: '#4b69ff',
            dark: '#3b59ef'
          },
          purple: {
            light: '#d32ce6',
            dark: '#c31cd5'
          },
          gold: '#ffd700',
          gray: {
            light: '#b8b6b4',
            dark: '#2a475e'
          }
        }
      },
      boxShadow: {
        'csgo': '0 0 20px rgba(102,192,244,0.15)',
        'csgo-selected': '0 0 25px rgba(255,215,0,0.2)',
      },
      backgroundImage: {
        'csgo-gradient': 'linear-gradient(to bottom, #1d2f42, #0e1623)',
        'csgo-button': 'linear-gradient(to right, #4b69ff, #3b59ef)',
        'csgo-button-premium': 'linear-gradient(to right, #d32ce6, #c31cd5)',
      },
    },
  },
  plugins: [],
};

export default config;
