import { z } from 'zod';

// 서버로부터 받는 원래 응답의 스키마 (스네이크 케이스)
export const KakaoLoginServerResponseSchema = z.object({
  access_token: z.string(),
  is_new: z.string(),
});

// 서버 응답으로부터 추론된 타입
export type KakaoLoginServerResponse = z.infer<
  typeof KakaoLoginServerResponseSchema
>;

// 클라이언트에서 사용할 변환된 응답의 스키마 (카멜 케이스)
export const KakaoLoginResponseSchema = z.object({
  accessToken: z.string(),
  isNew: z.string(),
});

// 변환된 응답으로부터 추론된 타입
export type KakaoLoginResponse = z.infer<typeof KakaoLoginResponseSchema>;

// 서버 응답을 클라이언트 응답으로 변환하는 함수
export const convertKakaoLoginResponse = (
  serverResponse: KakaoLoginServerResponse,
): KakaoLoginResponse => ({
  accessToken: serverResponse.access_token,
  isNew: serverResponse.is_new,
});
