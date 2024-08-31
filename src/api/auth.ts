import {
  KakaoLoginResponse,
  KakaoLoginResponseSchema,
} from '../types/kakaoLogin';

import axios from 'axios';

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post('/api/login', data);
  return response.data;
};

// prettier-ignore
export const kakaoLogin = async (code: string): Promise<KakaoLoginResponse> => {
    const response = await axios.post('/api/auth/kakao', { code });
    return KakaoLoginResponseSchema.parse(response.data);
  };
