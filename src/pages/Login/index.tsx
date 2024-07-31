import { CiLock } from 'react-icons/ci';
import { HiOutlineEnvelope } from 'react-icons/hi2';

import Button from '../../components/common/button/Button';
import Input from '../../components/common/input';
import KakaoLogin from '../../components/login/KakaoLogin';

const index = () => {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="flex flex-col items-center justify-center mx-10">
        <h1 className="mt-32 text-h1 mb-5">Covigator</h1>

        <div className="w-full flex flex-col items-center gap-y-4">
          <Input
            size="md"
            icon={<HiOutlineEnvelope className="w-6 h-6" />}
            placeholder="이메일을 입력해주세요"
          />

          <Input
            size="md"
            icon={<CiLock className="w-6 h-6" />}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>

        <div className="mt-11">
          <Button size="lg" color="default" shape="square">
            로그인
          </Button>
        </div>

        <div className="text-sm mt-4 mb-5">
          <a href="/find/id" className="mr-2">
            아이디(이메일) 찾기
          </a>
          |
          <a href="/find/password" className="mx-2">
            비밀번호 찾기
          </a>
          |
          <a href="/register" className="ml-2">
            회원가입
          </a>
        </div>

        <div className="relative flex items-center w-full mt-8 mb-4">
          <div className="flex-grow border-t border-bk-30"></div>
          <span className="flex-shrink mx-4 text-body5">또는</span>
          <div className="flex-grow border-t border-bk-30"></div>
        </div>

        <div className="flex justify-center mb-28">
          <KakaoLogin />
        </div>
      </div>
    </div>
  );
};

export default index;
