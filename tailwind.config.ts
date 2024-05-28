import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    'index.html',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/*.{js,ts,jsx,tsx}',
    // './src/**/*.{js,ts,jsx,tsx}',
  ],
  // content: ['./src/**/*.{js,jsx,ts,tsx}', '*/index.html'],
  themes: {
    extend: {
      // [TODO] 디자인 시스템 확정 시 추가 예정
      colors: {},
      fontWeight: {},
      fontFamily: {},
      typos: {},
    },
  },
};

export default config;
