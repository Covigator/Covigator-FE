import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { kakaoLogin } from '../../api/auth';
import { useAuthStore } from '../../stores/authStore';

interface KakaoLoginResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

const KakaoCallback = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleKakaoLogin = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authCode = urlParams.get('code');

      if (!authCode) {
        console.error('Authorization code not found');
        navigate('/login');
        return;
      }

      try {
        const response: KakaoLoginResponse = await kakaoLogin(authCode);
        console.log('Kakao login response:', response);
        setAuth(response.access_token);
        navigate('/'); // 로그인 성공 후 홈페이지로 이동
      } catch (error) {
        console.error('Error during Kakao login:', error);
        navigate('/login'); // 에러 발생 시 로그인 페이지로 리다이렉트
      } finally {
        setLoading(false);
      }
    };

    handleKakaoLogin();
  }, [navigate, setAuth]);

  if (loading) {
    return <div>카카오 로그인 처리 중...</div>;
  }

  return null;
};

export default KakaoCallback;
