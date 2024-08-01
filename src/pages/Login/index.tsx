import { CiLock } from 'react-icons/ci';
import { HiOutlineEnvelope } from 'react-icons/hi2';

import Button from '../../components/common/button/Button';
import Input from '../../components/common/input';
import KakaoLogin from '../../components/login/KakaoLogin';

const index = () => {
  return (
    <div className="h-full w-full overflow-x-hidden">
      <div className="flex flex-col items-center justify-center mx-10">
        <h1 className="mt-[135px] text-h1 mb-[57px]">Covigator</h1>

        <div className="flex flex-col items-center gap-y-[18px]">
          <div className="w-[280px]">
            <Input
              size="lg"
              icon={<HiOutlineEnvelope className="w-6 h-6" />}
              placeholder="이메일을 입력해주세요"
              className="w-full"
            />
          </div>

          <div className="w-[280px]">
            <Input
              size="lg"
              icon={<CiLock className="w-6 h-6" />}
              placeholder="비밀번호를 입력해주세요"
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-11">
          <Button
            size="lg"
            color="default"
            shape="square"
            className="text-btn1"
          >
            로그인
          </Button>
        </div>

        <div className="text-sm mt-[18px]">
          <a href="/find/id" className="mr-[11px]">
            이메일 찾기
          </a>
          |
          <a href="/find/password" className="mx-[11px]">
            비밀번호 찾기
          </a>
          |
          <a href="/signup" className="ml-[11px]">
            회원가입
          </a>
        </div>

        <div className="flex items-center w-full max-w-[280px] mt-[33px] mb-[15px]">
          <div className="flex-grow border-t border-bk-50 w-[120px]"></div>
          <span className="flex-shrink mx-[7px] text-body4 text-bk-50 whitespace-nowrap">
            또는
          </span>
          <div className="flex-grow border-t border-bk-50  w-[120px]"></div>
        </div>

        <div className="flex justify-center">
          <KakaoLogin />
        </div>
      </div>
    </div>
  );
};

export default index;
