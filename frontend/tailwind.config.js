/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Все значения — через CSS-переменные из src/styles/tokens.css.
        // Никаких хардкод-хексов в компонентах фич.
        bg: {
          base: 'rgb(var(--bg-base-rgb) / <alpha-value>)',
          elevated: 'rgb(var(--bg-elevated-rgb) / <alpha-value>)',
        },
        surface: {
          card: 'rgb(var(--surface-card-rgb) / <alpha-value>)',
          hover: 'rgb(var(--surface-hover-rgb) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border-subtle-rgb) / <alpha-value>)',
          strong: 'rgb(var(--border-strong-rgb) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
          muted: 'rgb(var(--text-muted-rgb) / <alpha-value>)',
        },
        brand: {
          DEFAULT: 'rgb(var(--brand-primary-rgb) / <alpha-value>)',
          hover: 'rgb(var(--brand-hover-rgb) / <alpha-value>)',
          navy: 'rgb(var(--brand-navy-rgb) / <alpha-value>)',
        },
        accent: {
          lime: 'rgb(var(--brand-primary-rgb) / <alpha-value>)',
          green: 'rgb(var(--accent-green-rgb) / <alpha-value>)',
          blue: 'rgb(var(--accent-blue-rgb) / <alpha-value>)',
          amber: 'rgb(var(--accent-amber-rgb) / <alpha-value>)',
          red: 'rgb(var(--accent-red-rgb) / <alpha-value>)',
        },
      },
      borderRadius: {
        card: 'var(--radius-card)',
        pill: 'var(--radius-pill)',
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: 'var(--shadow-card)',
        dialog: 'var(--shadow-dialog)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(4px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.35s ease-out both',
      },
    },
  },
  plugins: [],
}
