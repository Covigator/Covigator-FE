import kakaoLoginBtn from '../../assets/image/login/kakaoLoginBtn.png';

const KakaoLogin = () => {
  return (
    <button className="w-64">
      <img src={kakaoLoginBtn} alt="카카오 로그인" className="w-full" />
    </button>
  );
};

export default KakaoLogin;
