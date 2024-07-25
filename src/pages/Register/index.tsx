import Input from '../../components/common/input';
import KakaoLogin from '../../components/login/KakaoLogin';

const index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[300px] bg-white rounded-[10px] p-6">
        <h1 className="text-h2 mb-6 text-center">프로필 사진</h1>

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-bk-10 rounded-full flex items-center justify-center relative">
            <span className="text-bk-50 text-2xl">+</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <div className="flex flex-col gap-y-1 w-full">
            <div className="text-body5">닉네임</div>
            <Input size="lg" placeholder="닉네임" />
          </div>
          <div className="flex flex-col gap-y-1 w-full">
            <div className="text-body5">이름</div>
            <Input size="lg" placeholder="이름" />
          </div>
          <div className="flex flex-col gap-y-1 w-full">
            <div className="text-body5">아이디</div>
            <Input size="lg" placeholder="아이디" />
          </div>
          <div className="flex flex-col gap-y-1 w-full">
            <div className="text-body5">비밀번호</div>
            <Input size="lg" placeholder="비밀번호" type="password" />
          </div>
          <div className="flex flex-col gap-y-1 w-full">
            <div className="text-body5">비밀번호 확인</div>
            <Input size="lg" placeholder="비밀번호 확인" type="password" />
          </div>
          <div className="relative flex items-center w-full mt-5">
            <div className="flex-grow border-t border-bk-30"></div>
            <span className="flex-shrink mx-4 text-body5">간편 회원가입</span>
            <div className="flex-grow border-t border-bk-30"></div>
          </div>

          <div className="w-full">
            <KakaoLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
