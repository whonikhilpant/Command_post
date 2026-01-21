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
        primary: {
          50: '#f2f5f0',
          100: '#dde6d4',
          200: '#c3d0b1',
          300: '#a3b486',
          400: '#879a62',
          500: '#6b8145',   // main olive
          600: '#556638',
          700: '#424f2d',
          800: '#303822',
          900: '#1f2416',
        },
        accent: {
          500: '#111827',   // deep navy / slate for contrast
        },
        defence: {
          army: '#4b5320',      // olive drab
          navy: '#111827',      // deep navy
          airforce: '#0f172a',  // dark air force blue
          joint: '#374151',     // neutral grey
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
