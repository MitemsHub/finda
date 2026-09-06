import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Neutrals: warm paper ─────────────────────────────
        paper: {
          light: '#F7F5F0',   // page background (light)
          dark: '#161512',    // page background (dark)
        },
        surface: {
          light: '#FFFFFF',
          dark: '#201F19',
        },
        sunken: {
          light: '#EFEBE2',
          dark: '#2A2921',
        },
        ink: {
          900: '#1C1A15',     // headings (light) — flips in dark
          700: '#3D3A31',     // body
          500: '#6E6A5E',     // secondary text
          400: '#8B8677',     // muted
          300: '#B7B1A2',     // faint / disabled
          '900-inv': '#F2EFE6',
          '700-inv': '#D9D5C9',
          '500-inv': '#A6A192',
          '400-inv': '#8C8778',
          '300-inv': '#6E6A5E',
        },
        line: {
          light: '#E5E0D4',
          dark: 'rgba(255,255,255,0.09)',
        },
        // ── Primary: evergreen (trust, verification) ────────
        primary: {
          DEFAULT: '#1F5C45',
          strong: '#15402F',
          soft: '#E7F0EA',
          softline: '#C6DCCE',
          // dark-mode readable variant
          bright: '#5CAF87',
        },
        // ── Accent: market amber (energy, discovery) ────────
        accent: {
          DEFAULT: '#C25F04',
          strong: '#9A4B02',
          soft: '#FBEEDC',
          bright: '#EFA23B',
        },
        // ── Semantic ─────────────────────────────────────────
        success: { DEFAULT: '#1F7A3D', soft: '#E4F2E6', bright: '#5BBF77' },
        danger: { DEFAULT: '#B93A32', soft: '#F8E6E4', bright: '#E37B73' },
        gold: { DEFAULT: '#C08A0A', soft: '#F9F0D8', bright: '#E3B53C' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['2.125rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(28,26,21,0.05), 0 8px 24px -12px rgba(28,26,21,0.14)',
        'card-hover': '0 2px 4px rgba(28,26,21,0.06), 0 16px 40px -12px rgba(28,26,21,0.22)',
        lift: '0 12px 32px -8px rgba(21,64,47,0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        float: 'float 6s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
