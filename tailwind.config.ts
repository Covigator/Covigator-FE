import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // primary color
        'primary-100': '#F9E8EE',
        'primary-200': '#F7D8E0',
        'primary-300': '#F5C6D1',
        'primary-400': '#F299AF',
        'primary-500': '#F174A3',

        // sub color
        'sub-100': '#B089BE',
        'sub-200': '#E7EEFF',
        'sub-300': '#606AB1',
        'sub-400': '#2D387A',

        // grayscale
        wh: '#FFFFFF',
        'bk-10': '#F8F7F7',
        'bk-20': '#F4F2F0',
        'bk-30': '#EBE9E7',
        'bk-40': '#DBD9D7',
        'bk-50': '#B7B6B4',
        'bk-60': '#9E9E9E',
        'bk-70': '#616161',
        'bk-80': '#424242',
        'bk-90': '#302E2D',
        'bk-100': '#121212',
      },
      fontFamily: {
        pretendard: 'Pretendard',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      fontSize: {
        h1: [
          '24px',
          {
            fontWeight: '700',
            lineHeight: '32px',
          },
        ],
        h2: [
          '20px',
          {
            fontWeight: '700',
            lineHeight: '28px',
          },
        ],
        h3: [
          '18px',
          {
            fontWeight: '600',
            lineHeight: '26px',
          },
        ],
        h4: [
          '16px',
          {
            fontWeight: '600',
            lineHeight: '24px',
          },
        ],
        body1: [
          '16px',
          {
            fontWeight: '500',
            lineHeight: '24px',
          },
        ],
        body2: [
          '16px',
          {
            fontWeight: '400',
            lineHeight: '24px',
          },
        ],
        body3: [
          '14px',
          {
            fontWeight: '600',
            lineHeight: '20px',
          },
        ],
        body4: [
          '14px',
          {
            fontWeight: '500',
            lineHeight: '20px',
          },
        ],
        body5: [
          '14px',
          {
            fontWeight: '400',
            lineHeight: '20px',
          },
        ],
        body6: [
          '12px',
          {
            fontWeight: '400',
            lineHeight: '16px',
          },
        ],
        btn1: [
          '18px',
          {
            fontWeight: '600',
            lineHeight: '20px',
          },
        ],
        btn2: [
          '14px',
          {
            fontWeight: '600',
            lineHeight: '20px',
          },
        ],
        btn3: [
          '10px',
          {
            fontWeight: '400',
            lineHeight: '16px',
          },
        ],
        nav: [
          '12px',
          {
            fontWeight: '600',
            lineHeight: 'auto',
          },
        ],
      },
    },
  },
};

export default config;
