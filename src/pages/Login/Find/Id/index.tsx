import { useNavigate } from 'react-router-dom';

import Button from '../../../../components/common/button/Button';
import Input from '../../../../components/common/input/Input';
import { Topbar } from '../../../../layouts';

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Topbar handleClick={() => navigate('/login')} />
      </div>
      <div className="flex flex-col items-center px-4 mt-24">
        <h1 className="text-h1 mb-24">이메일 찾기</h1>

        <div className="flex flex-col">
          <div className="flex gap-x-2 mb-1">
            <Input
              size="sm"
              placeholder="휴대폰 번호를 입력해주세요"
              type="tel"
            />

            <Button
              size="sm"
              shape="square"
              color="sub_300"
              className="text-btn2"
            >
              인증요청
            </Button>
          </div>

          <div className="text-body6 text-bk-70">
            띄어쓰기를 제외한 숫자만 입력해주세요
          </div>

          <div className="flex mt-[11px] gap-x-2">
            <div className="w-[240px]">
              <Input
                size="sm"
                placeholder="인증번호를 입력해주세요"
                type="number"
                className="w-full"
              />
            </div>
            <Button
              size="sm"
              shape="square"
              color="sub_300"
              className="text-btn2"
            >
              인증
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
