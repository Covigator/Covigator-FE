import { z } from 'zod';

// 카카오 로그인 응답 스키마 정의
export const KakaoLoginResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  scope: z.string(),
  refresh_token_expires_in: z.number(),
  is_new: z.enum(['true', 'false']).transform((val) => val === 'true'),
});

// 스키마로부터 타입 추론

// prettier-ignore
export type KakaoLoginResponse = z.infer<typeof KakaoLoginResponseSchema>;
