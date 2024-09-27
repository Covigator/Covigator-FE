import kakaoLoginBtn from '../../assets/image/login/kakaoLoginBtn.png';

const KakaoLogin = () => {
  const handleKakaoLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_KAKAO_REST_API_KEY
    }&redirect_uri=${encodeURIComponent(
      `${window.location.origin}/login/oauth2/callback/kakao`,
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
