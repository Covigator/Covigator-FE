import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { kakaoLogin } from '../../api/auth';
import kakaoLoginBtn from '../../assets/image/login/kakaoLoginBtn.png';
import { useAuthStore } from '../../stores/authStore';

const KakaoLogin = () => {
  const [isKakaoSDKLoaded, setIsKakaoSDKLoaded] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    // Kakao SDK 로딩 코드
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          const kakaoJSKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
          if (!kakaoJSKey) {
            console.error('카카오 자바스크립트 키 에러');
            return;
          }
          window.Kakao.init(kakaoJSKey);
        }
        setIsKakaoSDKLoaded(true);
      }
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // URL 파라미터에서 인증 코드 확인
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    if (authCode) {
      handleKakaoLoginCallback(authCode);
    }
  }, [navigate, setAuth]);

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
    if (!isKakaoSDKLoaded) {
      console.error('카카오 SDK가 아직 로드되지 않았습니다');
      return;
    }

    if (!window.Kakao?.Auth?.authorize) {
      console.error('카카오 인증 기능을 사용할 수 없습니다');
      return;
    }

    const redirectUri = `${import.meta.env.VITE_API_BASE_URL}/accounts/oauth/kakao`;

    window.Kakao.Auth.authorize({
      redirectUri: redirectUri,
    });
  };

  return (
    <button
      className="w-[280px]"
      onClick={handleKakaoLogin}
      disabled={!isKakaoSDKLoaded}
    >
      <img src={kakaoLoginBtn} alt="카카오 로그인" className="w-full" />
    </button>
  );
};

export default KakaoLogin;
