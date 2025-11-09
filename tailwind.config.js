/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          // Daffodil Yellow - Primary Accent
          yellow: {
            DEFAULT: '#FDB913',
            light: '#FDC94A',
            dark: '#E5A712',
            50: '#FEF7E6',
            100: '#FDEFCD',
            200: '#FCE09B',
            300: '#FDD069',
            400: '#FDC137',
            500: '#FDB913',
            600: '#E5A712',
            700: '#B38310',
            800: '#82600C',
            900: '#503C07',
          },
          // Professional Dark Bases
          dark: {
            DEFAULT: '#0A0E14',
            50: '#1A1F2E',
            100: '#141822',
            200: '#0F1218',
            300: '#0A0E14',
            400: '#070A0F',
            500: '#04060A',
          },
          // Modern Greys
          grey: {
            DEFAULT: '#64748B',
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
            900: '#0F172A',
          },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'glow-yellow': '0 0 20px rgba(253, 185, 19, 0.3), 0 0 40px rgba(253, 185, 19, 0.15)',
        'glow-yellow-lg': '0 0 30px rgba(253, 185, 19, 0.4), 0 0 60px rgba(253, 185, 19, 0.2)',
        'cinematic': '0 20px 60px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
