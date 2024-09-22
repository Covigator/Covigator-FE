import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import kakaoLoginBtn from '../../assets/image/login/kakaoLoginBtn.png';
import { useAuthStore } from '../../stores/authStore';

import axios from 'axios';

const KakaoLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const handleKakaoCallback = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/accounts/oauth/kakao`,
            { params: { code } },
          );
          setAuth(response.data.access_token);
          navigate('/');
        } catch (error) {
          console.error('카카오 로그인 처리 중 에러 발생:', error);
          navigate('/login');
        }
      }
    };

    handleKakaoCallback();
  }, [navigate, setAuth]);

  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY
    }&redirect_uri=${encodeURIComponent(
      `${window.location.origin}/login`,
    )}&response_type=code`;

    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button className="w-[280px]" onClick={handleKakaoLogin}>
      <img src={kakaoLoginBtn} alt="카카오 로그인" className="w-full" />
    </button>
  );
};

export default KakaoLogin;
