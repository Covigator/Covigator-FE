import { FaRegEnvelope } from 'react-icons/fa';

import Button from '../../components/common/button/Button';
import Input from '../../components/common/input';
import KakaoLogin from '../../components/login/KakaoLogin';

const index = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-h1 mb-5">로그인</h1>
      <div className="mb-5 text-h2">Covigator</div>
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col gap-y-1">
          <div className="text-body5">이메일</div>
          <Input
            size="lg"
            icon={<FaRegEnvelope className="w-5 h-5" />}
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="text-body5">비밀번호</div>
          <Input size="lg" placeholder="비밀번호를 입력해주세요" />
        </div>
      </div>

      <div className="flex text-body6 mt-11 mb-2">
        올바른 ID나 Password를 입력해주세요
      </div>
      <Button size="lg" color="sub" shape="square">
        로그인
      </Button>
      <div className="text-sm mt-3 mb-5">
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

      <div className="relative flex items-center w-full my-5">
        <div className="flex-grow border-t border-bk-30"></div>
        <span className="flex-shrink mx-4 text-body5">간편 로그인</span>
        <div className="flex-grow border-t border-bk-30"></div>
      </div>

      <KakaoLogin />
    </div>
  );
};

export default index;
