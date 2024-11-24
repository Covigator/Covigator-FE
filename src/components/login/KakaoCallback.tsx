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
      console.log('카카오 로그인 시작');
      try {
        const code = new URLSearchParams(window.location.search).get('code');
        if (!code) {
          throw new Error('인증 코드를 찾을 수 없습니다.');
        }

        const url = `${import.meta.env.VITE_API_BASE_URL}/accounts/oauth/kakao`;
        console.log('카카오 인증 요청 시작');
        const response = await axios.get(url, { params: { code } });
        
        const validatedServerData = KakaoLoginServerResponseSchema.parse(
          response.data,
        );
        console.log('카카오 응답 데이터 검증 완료');

        const convertedData: KakaoLoginResponse =
          convertKakaoLoginResponse(validatedServerData);

        if (convertedData.accessToken) {
          console.log('카카오 로그인 성공');
          setAuth(convertedData.accessToken);
          localStorage.setItem('accessToken', convertedData.accessToken);
          navigate('/');
        } else {
          throw new Error('카카오 로그인 실패: 응답에 토큰이 없습니다');
        }
      } catch (error) {
        console.error('카카오 로그인 실패');
        let errorMessage = '카카오 로그인 중 알 수 없는 오류가 발생했습니다.';

        if (error instanceof ZodError) {
          errorMessage = '카카오 로그인 데이터 검증 실패';
        } else if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response) {
            errorMessage = '카카오 로그인에 실패했습니다. 다시 시도해주세요.';
          } else if (axiosError.request) {
            errorMessage = '카카오 로그인 실패: 서버로부터 응답을 받지 못했습니다';
          } else {
            errorMessage = '카카오 로그인에 실패했습니다. 다시 시도해주세요.';
          }
        }
        setError(errorMessage);
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
