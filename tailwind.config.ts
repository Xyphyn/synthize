import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          100: 'rgb(255 255 255 / <alpha-value>)',
          900: 'rgb(0 0 0 / <alpha-value>)',
        },
      },
    },
  },
} as Config
