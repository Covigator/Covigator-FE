import { useEffect, useState } from 'react';

import kakaoLoginBtn from '../../assets/image/login/kakaoLoginBtn.png';

const KakaoLogin = () => {
  // Kakao SDK 로딩 상태를 관리하는 state
  const [isKakaoSDKLoaded, setIsKakaoSDKLoaded] = useState(false);

  useEffect(() => {
    // Kakao SDK를 동적으로 로드하는 스크립트 생성
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        // Kakao SDK가 초기화되지 않았다면 초기화 진행
        if (!window.Kakao.isInitialized()) {
          const kakaoJSKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
          if (!kakaoJSKey) {
            console.error('카카오 자바스크립트 키 에러');
            return;
          }
          window.Kakao.init(kakaoJSKey);
        }
        // SDK 로딩 완료 상태로 설정
        setIsKakaoSDKLoaded(true);
      }
    };
    // body에 스크립트 추가
    document.body.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 카카오 로그인 처리 함수
  const handleKakaoLogin = () => {
    // SDK가 로드되지 않았다면 에러 출력 후 함수 종료
    if (!isKakaoSDKLoaded) {
      console.error('카카오 SDK가 아직 로드되지 않았습니다');
      return;
    }

    // Kakao.Auth.authorize 메서드가 존재하지 않으면 에러 출력 후 함수 종료
    if (!window.Kakao?.Auth?.authorize) {
      console.error('카카오 인증 기능을 사용할 수 없습니다');
      return;
    }

    // 카카오 로그인 실행
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:8080/accounts/oauth/kakao',
    });
  };

  return (
    <button
      className="w-[280px]"
      onClick={handleKakaoLogin}
      disabled={!isKakaoSDKLoaded} // SDK 로딩 전에는 버튼 비활성화
    >
      <img src={kakaoLoginBtn} alt="카카오 로그인" className="w-full" />
    </button>
  );
};

export default KakaoLogin;
