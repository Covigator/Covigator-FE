import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
  ],
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
