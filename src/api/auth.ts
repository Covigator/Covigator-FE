import { loginUserResponse, signupUserResponse } from '../types/auth';
import { convertObjectPropertiesSnakeCaseToCamelCase } from '../utils/common';
import instance from './instance';

import axios, { AxiosError, AxiosResponse } from 'axios';

interface ErrorResponse {
  message?: string;
  [key: string]: unknown;
}

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
      localStorage.setItem('nickname', convertedResponse.nickname);
      localStorage.setItem('email', convertedResponse.email);
      localStorage.setItem('img', convertedResponse.image_url);
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

export const signupUser = async (formData: FormData): Promise<string> => {
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

  if (convertedResponse.accessToken) {
    localStorage.setItem('accessToken', convertedResponse.accessToken);
    return convertedResponse.accessToken;
  } else {
    throw new Error('회원가입 실패: 응답에 토큰이 없습니다');
  }
};

// 비밀번호 찾기에서 '인증요청' 클릭 시 실행되는 함수
export const findPassword = async (email: string): Promise<void> => {
  try {
    // 비밀번호 찾기 요청 보내기
    const response = await instance.post('/accounts/find-password', { email });

    // 서버에서 200 OK를 반환하면 성공
    if (response.status === 200) {
      console.log('인증번호 이메일이 성공적으로 전송되었습니다.');
    } else {
      throw new Error('서버에서 예상치 못한 응답을 받았습니다.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // 서버가 2xx 범위를 벗어나는 상태 코드로 응답한 경우
        throw new Error(
          `인증번호 이메일 전송 실패: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`,
        );
      } else if (axiosError.request) {
        // 요청은 보냈지만 응답을 받지 못한 경우
        throw new Error('인증번호 이메일 전송 요청에 대한 응답이 없습니다.');
      } else {
        // 요청 설정 중 오류가 발생한 경우
        throw new Error(
          `인증번호 이메일 전송 요청 설정 중 오류 발생: ${axiosError.message}`,
        );
      }
    } else {
      // Axios 오류가 아닌 경우
      throw new Error(
        '인증번호 이메일 전송 중 예기치 않은 오류가 발생했습니다',
      );
    }
  }
};

// 비밀번호 찾기에서 '인증' 클릭 시 실행되는 함수
export const verifyCode = async (data: {
  email: string;
  code: string;
}): Promise<void> => {
  try {
    const response = await instance.post('/accounts/verify-code', data);

    if (response.status === 200) {
      console.log('인증이 성공적으로 완료되었습니다.');
    } else {
      throw new Error('서버에서 예상치 못한 응답을 받았습니다.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        const errorData = axiosError.response.data;
        let errorMessage = '알 수 없는 오류가 발생했습니다.';

        if (typeof errorData === 'object' && errorData !== null) {
          if ('message' in errorData && typeof errorData.message === 'string') {
            errorMessage = errorData.message;
          } else {
            errorMessage = JSON.stringify(errorData);
          }
        }

        throw new Error(
          `인증 실패: ${axiosError.response.status} - ${errorMessage}`,
        );
      } else if (axiosError.request) {
        throw new Error('인증 요청에 대한 응답이 없습니다.');
      } else {
        throw new Error(`인증 요청 설정 중 오류 발생: ${axiosError.message}`);
      }
    } else {
      throw new Error('인증 요청 중 예기치 않은 오류가 발생했습니다');
    }
  }
};

// 비밀번호 변경 요청 함수
export const changePassword = async (data: {
  password: string;
  passwordVerification: string;
}): Promise<void> => {
  try {
    // 데이터를 직접 전송, 중첩된 객체 사용하지 않음
    const response = await instance.post('/accounts/change-password', data);

    // 서버에서 200 OK를 반환하면 성공
    if (response.status === 200) {
      console.log('비밀번호 변경이 성공적으로 완료되었습니다.');
    } else {
      throw new Error('서버에서 예상치 못한 응답을 받았습니다.');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        const errorData = axiosError.response.data;
        let errorMessage = '알 수 없는 오류가 발생했습니다.';

        if (typeof errorData === 'object' && errorData !== null) {
          if ('message' in errorData && typeof errorData.message === 'string') {
            errorMessage = errorData.message;
          } else {
            errorMessage = JSON.stringify(errorData);
          }
        }

        throw new Error(
          `비밀번호 변경 실패: ${axiosError.response.status} - ${errorMessage}`,
        );
      } else if (axiosError.request) {
        throw new Error('비밀번호 변경 요청에 대한 응답이 없습니다.');
      } else {
        throw new Error(
          `비밀번호 변경 요청 설정 중 오류 발생: ${axiosError.message}`,
        );
      }
    } else {
      throw new Error('비밀번호 변경 요청 중 예기치 않은 오류가 발생했습니다');
    }
  }
};
