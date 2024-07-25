import KakaoLogin from '../../components/login/KakaoLogin';

const index = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-5">로그인</h1>
      <div className="mb-5 text-3xl font-bold">Covigator</div>
      <input type="text" placeholder="이름" className="border p-2 mb-2 w-64" />
      <input
        type="password"
        placeholder="비밀번호"
        className="border p-2 mb-2 w-64"
      />
      <div className="text-sm mb-5">
        <a href="#" className="mr-2">
          아이디(이메일) 찾기
        </a>{' '}
        |
        <a href="#" className="mx-2">
          비밀번호 찾기
        </a>{' '}
        |
        <a href="#" className="ml-2">
          회원가입
        </a>
      </div>
      <button className="mb-5 bg-blue-500 text-white p-2 w-64">로그인</button>
      <KakaoLogin />
    </div>
  );
};

export default index;
