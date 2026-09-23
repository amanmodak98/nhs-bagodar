import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Heritage palette — emerald + amber + warm neutrals
        forest: {
          50: '#f1f7f4',
          100: '#dfeee5',
          200: '#bcdbc7',
          300: '#8ec0a1',
          400: '#5a9e76',
          500: '#3d8059',
          600: '#2d6a4f',
          700: '#22573f',
          800: '#1b4332',
          900: '#122a1f',
        },
        amber: {
          50: '#fdf8ed',
          100: '#faedca',
          200: '#f4d77f',
          300: '#eebb3c',
          400: '#e09a1c',
          500: '#d97706',
          600: '#b45309',
          700: '#8c3c08',
          800: '#6e300c',
          900: '#5a280c',
        },
        sand: {
          50: '#fcfbf7',
          100: '#f6f1e7',
          200: '#ebe2cf',
          300: '#d9cba6',
          400: '#c4ad7b',
        },
        ink: '#1a1916',
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        // Cinzel is editorial / institutional serif; Merriweather would also work
        display: ['var(--font-cinzel)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        hindi: ['var(--font-noto-devanagari)', 'Mukta', 'serif'],
      },
      fontSize: {
        // Major Third modular scale, base 16
        // 16 · 20 · 25 · 31 · 39 · 49 · 61 · 77 · 96 · 120
        'xs': ['0.8125rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.55' }],
        'base': ['1rem', { lineHeight: '1.65' }],
        'md': ['1.0625rem', { lineHeight: '1.6' }],
        'lg': ['1.25rem', { lineHeight: '1.45' }],
        'xl': ['1.5625rem', { lineHeight: '1.3' }],
        '2xl': ['1.953rem', { lineHeight: '1.2' }],
        '3xl': ['2.441rem', { lineHeight: '1.15' }],
        '4xl': ['3.052rem', { lineHeight: '1.05' }],
        '5xl': ['3.815rem', { lineHeight: '1.02' }],
      },
      letterSpacing: {
        institutional: '0.16em',
      },
      maxWidth: {
        'reading': '68ch',
        'edition': '78rem',
      },
      borderRadius: {
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};

export default config;