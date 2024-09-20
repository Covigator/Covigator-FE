import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { kakaoLogin } from '../../api/auth';
import kakaoLoginBtn from '../../assets/image/login/kakaoLoginBtn.png';
import { useAuthStore } from '../../stores/authStore';

const KakaoLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    // URL 파라미터에서 인증 코드 확인
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (authCode) {
      handleKakaoLoginCallback(authCode);
    }
  }, []);

  const handleKakaoLoginCallback = async (code: string) => {
    try {
      const response = await kakaoLogin(code);
      setAuth(response.access_token);
      navigate('/'); // 메인 페이지로 리다이렉트
    } catch (error) {
      console.error('카카오 로그인 처리 중 오류 발생:', error);
    }
  };

  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY}&redirect_uri=${import.meta.env.VITE_API_BASE_URL}/accounts/oauth/kakao&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button className="w-[280px]" onClick={handleKakaoLogin}>
      <img src={kakaoLoginBtn} alt="카카오 로그인" className="w-full" />
    </button>
  );
};

export default KakaoLogin;
