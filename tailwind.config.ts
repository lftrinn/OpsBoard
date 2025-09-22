import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg:     'rgb(var(--bg) / <alpha-value>)',
        fg:     'rgb(var(--fg) / <alpha-value>)',
        card:   'rgb(var(--card) / <alpha-value>)',
        muted:  'rgb(var(--muted) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        brand:  'rgb(var(--brand) / <alpha-value>)',
        "brand-600": 'rgb(var(--brand-600) / <alpha-value>)',
        "brand-700": 'rgb(var(--brand-700) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)'
      }
    }
  },
  plugins: []
} satisfies Partial<Config>
