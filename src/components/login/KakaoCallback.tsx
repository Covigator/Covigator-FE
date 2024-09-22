import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '../../stores/authStore';

import axios from 'axios';

interface KakaoLoginResponse {
  access_token: string;
  is_new: string;
}

const KakaoCallback = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleKakaoLogin = async () => {
      try {
        const code = new URLSearchParams(window.location.search).get('code');

        if (!code) {
          throw new Error('Authorization code not found');
        }

        const response = await axios.get<KakaoLoginResponse>(
          `${import.meta.env.VITE_API_BASE_URL}/accounts/oauth/kakao`,
          { params: { code } },
        );

        console.log('Kakao login response:', response.data);

        setAuth(response.data.access_token);
        navigate('/');
      } catch (error) {
        console.error('카카오 로그인 중 에러 발생:', error);
        navigate('/login');
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
