/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line no-undef
const { nextui } = require('@nextui-org/react');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'nextui',
      addCommonColors: false,
      defaultTheme: 'light',
      defaultExtendTheme: 'light',
      layout: {},
      themes: {
        light: {
          colors: {
            primary: '#7e93ef',
            WHITE01: '#fafaff',
            BLACK03: '#505367',
            BLUE02: '#7e93ef',
            BLUE03: '#b6c1f5',
            BLUE04: '#edf0fd',
            BLUE05: '#f7f9ff',
            RED01: '#ef7b8699',
            GREEN01: '#cbffd6',
            BG01: '#fafaff',
            IBG01: '#272933',
          },
          textColor: {
            primary: '#272933',
          },
        },
        dark: {
          colors: {
            primary: '#7e93ef',
            WHITE01: '#3E4050',
            BLACK02: '#1A1C22',
            BLACK03: '#505367',
            BLUE02: '#7e93ef',
            BLUE03: '#b6c1f5',
            BLUE04: '#3E4050',
            BLUE05: '#f7f9ff',
            RED01: '#ef7b8699',
            GREEN01: '#3E4050',
            BG01: '#272933',
            IBG01: '#fafaff',
          },
          textColor: {
            blackText: '#272933',
          },
        },
      },
    }),
  ],
};
