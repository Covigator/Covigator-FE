import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../stores/authStore';
import {
  KakaoLoginServerResponseSchema,
  KakaoLoginResponse,
  convertKakaoLoginResponse,
} from '../../types/kakaoLogin';
import Loading from '../common/Loading';

import axios, { AxiosError } from 'axios';
import { ZodError } from 'zod';

const KakaoCallback = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleKakaoLogin = async () => {
      console.log('카카오 로그인 콜백 처리 시작');
      try {
        const code = new URLSearchParams(window.location.search).get('code');
        if (!code) {
          console.error('인증 코드 없음');
          throw new Error('인증 코드를 찾을 수 없습니다.');
        }
        console.log('인증 코드 확인:', code);

        const url = `${import.meta.env.VITE_API_BASE_URL}/accounts/oauth/kakao`;
        console.log('요청 URL:', url);
        console.log('요청 파라미터:', { code });

        console.log('서버에 인증 코드 전송 중...');
        const response = await axios.get(url, { params: { code } });
        console.log('서버 응답 수신:', response.status);
        console.log('응답 헤더:', response.headers);
        console.log('응답 데이터:', response.data);

        console.log('서버 응답 데이터 검증 중...');
        const validatedServerData = KakaoLoginServerResponseSchema.parse(
          response.data,
        );
        console.log('서버 응답 데이터 검증 완료');

        console.log('응답 데이터 변환 중...');
        const convertedData: KakaoLoginResponse =
          convertKakaoLoginResponse(validatedServerData);
        console.log('변환된 카카오 로그인 응답:', convertedData);

        if (convertedData.accessToken) {
          console.log('액세스 토큰 확인됨, 인증 처리 중...');
          setAuth(convertedData.accessToken);
          localStorage.setItem('accessToken', convertedData.accessToken);
          console.log('로그인 성공, 홈페이지로 리다이렉트');
          navigate('/');
        } else {
          console.error('응답에 액세스 토큰 없음');
          throw new Error('카카오 로그인 실패: 응답에 토큰이 없습니다');
        }
      } catch (error) {
        console.error('카카오 로그인 처리 중 에러 발생:', error);
        let errorMessage = '카카오 로그인 중 알 수 없는 오류가 발생했습니다.';

        if (error instanceof ZodError) {
          console.error(
            'Zod 검증 에러:',
            JSON.stringify(error.errors, null, 2),
          );
          errorMessage = `데이터 검증 실패: ${error.errors.map((e) => e.message).join(', ')}`;
        } else if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          console.error('Axios 에러 상세 정보:', {
            message: axiosError.message,
            code: axiosError.code,
            stack: axiosError.stack,
          });
          if (axiosError.response) {
            console.error('서버 오류 응답:', {
              status: axiosError.response.status,
              statusText: axiosError.response.statusText,
              headers: axiosError.response.headers,
              data: axiosError.response.data,
            });
            errorMessage = `카카오 로그인 실패: ${axiosError.response.status} - ${JSON.stringify(axiosError.response.data)}`;
          } else if (axiosError.request) {
            console.error('서버 응답 없음:', axiosError.request);
            errorMessage =
              '카카오 로그인 실패: 서버로부터 응답을 받지 못했습니다';
          } else {
            console.error('요청 설정 중 오류:', axiosError.message);
            errorMessage = `카카오 로그인 실패: ${axiosError.message}`;
          }
          console.error('Axios 설정:', axiosError.config);
        } else if (error instanceof Error) {
          console.error('일반 에러:', {
            message: error.message,
            stack: error.stack,
          });
          errorMessage = `오류 발생: ${error.message}`;
        }
        setError(errorMessage);
        console.error('에러 객체 전체 구조:', JSON.stringify(error, null, 2));
      } finally {
        console.log('카카오 로그인 처리 완료');
        setLoading(false);
      }
    };

    handleKakaoLogin();
  }, [navigate, setAuth]);
  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log('에러 상태 렌더링');
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => {
            console.log('로그인 페이지로 돌아가기 클릭');
            navigate('/login');
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          로그인 페이지로 돌아가기
        </button>
      </div>
    );
  }

  console.log('카카오 콜백 처리 완료, null 반환');
  return null;
};

export default KakaoCallback;
