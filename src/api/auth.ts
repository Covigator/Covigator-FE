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
