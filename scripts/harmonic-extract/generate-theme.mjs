/**
 * Generates Tailwind v4 @theme CSS + JSON theme from design-tokens.json
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, 'design-tokens.json'), 'utf8'))

const vars = tokens.cssVariables || {}

const colors = {
  paper: vars['--greyscale-10'] || '#f5f6fa',
  'paper-alt': '#f5f5f9',
  'paper-footer': '#f4f5f8',
  white: '#ffffff',
  ink: vars['--greyscale-950'] || '#040508',
  'ink-soft': vars['--greyscale-900'] || '#16171a',
  'ink-warm': vars['--black'] || '#262222',
  'ink-elevated': '#212226',
  scout: '#121214',
  forest: vars['--primary-dark-green'] || '#06351e',
  coral: vars['--primary-dark-orange'] || vars['--fe5d45'] || '#fe5d45',
  'coral-deep': vars['--indian-red'] || '#dd4e43',
  'grey-50': vars['--greyscale-50'] || '#f0f1f5',
  'grey-100': vars['--greyscale-100'] || '#e4e5eb',
  'grey-150': vars['--greyscale-150'] || '#d7d9e0',
  'grey-200': vars['--greyscale-200'] || '#c4c6cc',
  'grey-300': vars['--greyscale-300'] || '#abadb3',
  'grey-400': vars['--greyscale-400'] || '#909299',
  'grey-450': vars['--greyscale-450'] || '#82858c',
  'grey-500': vars['--greyscale-500'] || '#6f727a',
  'grey-600': vars['--greyscale-600'] || '#5c5e66',
  'grey-700': vars['--greyscale-700'] || '#494b52',
  'grey-800': vars['--greyscale-800'] || '#2d2e33',
  blue: vars['--secondary-blue'] || '#4a72ff',
  'blue-soft': vars['--blue'] || '#b5ceff',
  purple: vars['--secondary-purple'] || '#8957da',
  green: vars['--secondary-green'] || '#1de26c',
  'highlight-blue': vars['--highlight-blue'] || '#53a1d2',
  'highlight-purple': vars['--highlight-purple'] || '#8d4fda',
}

const spacing = {
  0: vars['--0'] || '0px',
  1: vars['--4'] || '4px',
  1.5: vars['--6-5'] || '6px',
  2: vars['--8'] || '8px',
  2.5: vars['--10'] || '10px',
  3: vars['--12'] || '12px',
  4: vars['--16'] || '16px',
  5: vars['--20'] || '20px',
  6: vars['--24'] || '24px',
  6.5: vars['--26'] || '26px',
  7: vars['--28'] || '28px',
  8: vars['--32'] || '32px',
  10: vars['--40'] || '40px',
  12: vars['--48'] || '48px',
  16: vars['--64'] || '64px',
  24: vars['--96'] || '96px',
  // Exact container / section values from DOM
  'form-pad': '4.5px',
  'nav-x': '96px',
  'section-x': '100px',
  'section-y': '100px',
  'section-y-sm': '70px',
  'scout-y': '144px',
  'scout-y-bottom': '128px',
  'quote-y': '140px',
  'quote-y-bottom': '220px',
  'footer-cta-y': '100px',
  'footer-cta-bottom': '140px',
  'logos-bottom': '80px',
}

const screens = {
  sm: '375px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
  '2xl': '1920px',
}

const maxWidth = {
  nav: '1240px',
  logos: '1152px',
  quote: '960px',
  solution: '1124px',
  form: '470px',
  'form-inner': '420px',
  preview: '1024px',
  navbarOuter: '1512px',
}

const theme = {
  source: tokens.source,
  extractedAt: tokens.extractedAt,
  colors,
  spacing,
  screens,
  maxWidth,
  fontFamily: {
    display: ['"PP Neue Montreal"', 'Arial', 'sans-serif'],
    sans: ['Inter', 'Inter-', 'Arial', 'sans-serif'],
    mono: ['"Fira Code"', 'AntikorMono', 'ui-monospace', 'monospace'],
  },
  fontSize: {
    nav: ['13px', { lineHeight: '18.2px', letterSpacing: '-0.1px', fontWeight: '400' }],
    'nav-btn': ['13px', { lineHeight: '18.2px', letterSpacing: '-0.1px', fontWeight: '500' }],
    body: ['14px', { lineHeight: '18.2px', fontWeight: '400' }],
    'body-lg': ['20px', { lineHeight: '28px', fontWeight: '400' }],
    h1: ['48px', { lineHeight: '52.8px', fontWeight: '500' }],
    h2: ['48px', { lineHeight: '49.92px', fontWeight: '400' }],
    h3: ['28px', { lineHeight: '36.4px', letterSpacing: '0.42px', fontWeight: '400' }],
  },
  borderRadius: {
    pill: '99px',
    card: '12px',
    'card-lg': '16px',
  },
  transitionTimingFunction: {
    harmonic: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
    snap: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  },
  transitionDuration: {
    fast: '100ms',
    DEFAULT: '200ms',
    mid: '400ms',
    slow: '800ms',
  },
  interactions: {
    transitions: tokens.interactions?.transitions || [],
    buttonStyles: {
      primary: {
        backgroundColor: colors.ink,
        color: '#f1f1f1',
        padding: '10px 10px',
        borderRadius: '99px',
        fontSize: '13px',
        fontWeight: '500',
        transition: 'all',
      },
      secondary: {
        backgroundColor: colors['grey-100'],
        color: colors.ink,
        padding: '10px 16px',
        borderRadius: '99px',
        fontSize: '13px',
        fontWeight: '500',
        letterSpacing: '-0.1px',
        transition: '0.2s',
      },
    },
  },
}

fs.mkdirSync(path.join(ROOT, 'design-tokens/harmonic'), { recursive: true })
fs.writeFileSync(path.join(ROOT, 'design-tokens/harmonic/tailwind-theme.json'), JSON.stringify(theme, null, 2))

const colorLines = Object.entries(colors)
  .map(([k, v]) => `  --color-hm-${k}: ${v};`)
  .join('\n')
const spaceLines = Object.entries(spacing)
  .map(([k, v]) => `  --spacing-hm-${k}: ${v};`)
  .join('\n')
const screenLines = Object.entries(screens)
  .map(([k, v]) => `  --breakpoint-hm-${k}: ${v};`)
  .join('\n')
const maxLines = Object.entries(maxWidth)
  .map(([k, v]) => `  --container-hm-${k}: ${v};`)
  .join('\n')

const css = `/* AUTO-GENERATED from design-tokens.json — do not edit by hand */
/* Run: node scripts/harmonic-extract/generate-theme.mjs */

@theme {
  --font-hm-display: "PP Neue Montreal", Arial, sans-serif;
  --font-hm-sans: Inter, Arial, sans-serif;
  --font-hm-mono: "Fira Code", AntikorMono, ui-monospace, monospace;

${colorLines}

${spaceLines}

${screenLines}

${maxLines}

  --radius-hm-pill: 99px;
  --radius-hm-card: 12px;
  --ease-hm: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-hm-snap: cubic-bezier(0.95, 0.05, 0.795, 0.035);
}
`

fs.writeFileSync(path.join(ROOT, 'design-tokens/harmonic/tailwind-theme.css'), css)
console.log('Wrote design-tokens/harmonic/tailwind-theme.json')
console.log('Wrote design-tokens/harmonic/tailwind-theme.css')
console.log('Colors:', Object.keys(colors).length)
