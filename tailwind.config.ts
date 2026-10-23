import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        head: ['var(--font-head)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        base: '0.5rem', // rounded neo corners
      },
      boxShadow: {
        neo: '4px 4px 0 0 var(--border)',
        'neo-sm': '2px 2px 0 0 var(--border)',
        'neo-lg': '6px 6px 0 0 var(--border)',
        'neo-hover': '6px 6px 0 0 var(--border)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        main: 'var(--main)',
        'main-foreground': 'var(--main-foreground)',
      },
      keyframes: {
        'neo-press': {
          '0%': { transform: 'translate(0, 0)', boxShadow: '4px 4px 0 0 var(--border)' },
          '100%': { transform: 'translate(2px, 2px)', boxShadow: '2px 2px 0 0 var(--border)' },
        },
        'neo-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'neo-press': 'neo-press 0.1s ease-in-out',
        'neo-spin': 'neo-spin 0.7s linear infinite',
      },
    },
  },
  plugins: [typography],
};

export default config;
