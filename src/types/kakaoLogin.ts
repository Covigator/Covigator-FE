import { z } from 'zod';

// 카카오 로그인 응답 스키마 정의
export const KakaoLoginResponseSchema = z.object({
  accessToken: z.string(),
  isNew: z.string(),
});

// 스키마로부터 타입 추론
export type KakaoLoginResponse = z.infer<typeof KakaoLoginResponseSchema>;
