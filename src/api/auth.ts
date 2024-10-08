import { loginUserResponse, signupUserResponse } from '../types/auth';
import {
  KakaoLoginResponse,
  KakaoLoginResponseSchema,
} from '../types/kakaoLogin';
import { convertObjectPropertiesSnakeCaseToCamelCase } from '../utils/common';
import instance from './instance';

import axios, { AxiosError, AxiosResponse } from 'axios';

// 일반 로그인 함수
export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<string> => {
  try {
    // 로그인 요청 보내기
    const response = await instance.post<loginUserResponse>(
      '/accounts/sign-in',
      data,
    );

    const convertedResponse = convertObjectPropertiesSnakeCaseToCamelCase(
      response.data as unknown as AxiosResponse<string, unknown>,
    ) as loginUserResponse;

    // 토큰이 응답에 있으면 반환
    if (convertedResponse.accessToken) {
      localStorage.setItem('accessToken', convertedResponse.accessToken);
      return convertedResponse.accessToken;
    } else {
      throw new Error('로그인 실패: 응답에 토큰이 없습니다');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // 서버가 2xx 범위를 벗어나는 상태 코드로 응답한 경우
        throw new Error(
          `로그인 실패: ${axiosError.response.status} - ${axiosError.response.data}`,
        );
      } else if (axiosError.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        throw new Error('로그인 실패: 서버로부터 응답을 받지 못했습니다');
      } else {
        // 요청 설정 중 오류가 발생한 경우
        throw new Error(`로그인 실패: ${axiosError.message}`);
      }
    } else {
      // Axios 오류가 아닌 경우
      throw new Error('로그인 중 예기치 않은 오류가 발생했습니다');
    }
  }
};

// 카카오 로그인 함수
export const kakaoLogin = async (code: string): Promise<KakaoLoginResponse> => {
  try {
    // 카카오 로그인 요청 보내기
    const response = await instance.get<KakaoLoginResponse>(
      '/accounts/oauth/kakao',
      {
        params: { code },
      },
    );

    return KakaoLoginResponseSchema.parse(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        throw new Error(
          `카카오 로그인 실패: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`,
        );
      } else if (axiosError.request) {
        throw new Error('카카오 로그인 요청에 대한 응답이 없습니다.');
      } else {
        throw new Error(
          `카카오 로그인 요청 설정 중 오류 발생: ${axiosError.message}`,
        );
      }
    } else {
      // 기타 오류 처리
      throw new Error('카카오 로그인 중 예기치 않은 오류가 발생했습니다');
    }
  }
};

export const signupUser = async (formData: FormData): Promise<string> => {
  try {
    const response = await instance.post<signupUserResponse>(
      '/accounts/sign-up',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    const convertedResponse = convertObjectPropertiesSnakeCaseToCamelCase(
      response.data as unknown as AxiosResponse<string, unknown>,
    ) as signupUserResponse;

    // 응답 구조 로깅
    console.log('서버 응답:', response.data);

    // 토큰이 응답에 있는지 확인하고 반환
    if (convertedResponse.accessToken) {
      localStorage.setItem('accessToken', convertedResponse.accessToken);
      return convertedResponse.accessToken;
    } else {
      throw new Error('회원가입 실패: 응답에 토큰이 없습니다');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        console.error('서버 오류 응답:', axiosError.response.data);
        throw new Error(
          `회원가입 실패: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`,
        );
      } else if (axiosError.request) {
        throw new Error('회원가입 실패: 서버로부터 응답을 받지 못했습니다');
      } else {
        throw new Error(`회원가입 실패: ${axiosError.message}`);
      }
    } else {
      console.error('예기치 않은 오류:', error);
      throw new Error('회원가입 중 예기치 않은 오류가 발생했습니다');
    }
  }
};
