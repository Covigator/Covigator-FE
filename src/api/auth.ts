import {
  KakaoLoginResponse,
  KakaoLoginResponseSchema,
} from '../types/kakaoLogin';

import axios from 'axios';

// 일반 로그인 함수
export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post('/api/login', data);
  if (response.data.token) {
    return response.data.token;
  }
  throw new Error('Login failed');
};

// 카카오 로그인 함수
// prettier-ignore
export const kakaoLogin = async (code: string): Promise<KakaoLoginResponse> => {
  const response = await axios.post('/api/auth/kakao', { code });
  return KakaoLoginResponseSchema.parse(response.data);
};

// 회원가입 함수
export const signupUser = async (data: {
  image_url?: string;
  name: string;
  nickname: string;
  email: string;
  password: string;
}) => {
  // 서버에 회원가입 요청 보내기
  const response = await axios.post('/api/signup', data);

  // 서버로부터 토큰을 받으면 반환
  if (response.data.token) {
    return response.data.token;
  }

  // 토큰이 없으면 에러 발생
  throw new Error('회원가입에 실패했습니다');
};
