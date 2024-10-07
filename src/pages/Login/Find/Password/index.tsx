import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../../components/common/button/Button';
import Input from '../../../../components/common/input';
import { Topbar } from '../../../../layouts';

const Index = () => {
  const navigate = useNavigate();

  // 인증 완료 여부 상태
  const [isVerified, setIsVerified] = useState<boolean>(false);

  // 이메일
  const [email, setEmail] = useState<string>('');

  // 인증 번호
  const [verificationCode, setVerificationCode] = useState<string>('');

  // 새로운 비밀번호
  const [newPassword, setNewPassword] = useState<string>('');

  // 인증 요청 핸들러
  const handleRequestVerification = () => {
    // TODO: 실제 인증 요청 로직 구현
    console.log('인증 요청:', email);
  };

  // 인증 확인 핸들러
  const handleVerify = () => {
    // TODO: 실제 인증 확인 로직 구현
    console.log('인증 확인:', verificationCode);
    setIsVerified(true);
  };

  // 비밀번호 변경 핸들러
  const handleChangePassword = () => {
    // TODO: 실제 비밀번호 변경 로직 구현
    console.log('새 비밀번호:', newPassword);
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Topbar handleClick={() => navigate('/login')} />
      </div>
      <div className="flex flex-col items-center px-4 mt-24">
        <h1 className="text-h1 mb-24">비밀번호 찾기</h1>

        <div className="flex flex-col">
          <div className="flex gap-x-2 mb-1">
            <div className="w-[240px]">
              <Input
                size="sm"
                placeholder="이메일을 입력해주세요"
                type="email"
                className="w-full"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button
              size="sm"
              shape="square"
              color="sub_300"
              className="text-btn2"
              onClick={handleRequestVerification}
            >
              인증요청
            </Button>
          </div>

          <div className="text-body6 text-bk-70">
            @를 포함한 전체 이메일을 입력해주세요
          </div>

          <div className="flex mt-3 gap-x-2">
            <div className="w-[240px]">
              <Input
                size="sm"
                placeholder="인증번호를 입력해주세요"
                type="text"
                className="w-full"
                defaultValue={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
            </div>
            <Button
              size="sm"
              shape="square"
              color="sub_300"
              className="text-btn2"
              onClick={handleVerify}
            >
              인증
            </Button>
          </div>

          {isVerified && (
            <div className="flex mt-5 gap-x-2">
              <div className="w-[240px]">
                <Input
                  size="sm"
                  placeholder="새로운 비밀번호를 입력해주세요"
                  type="password"
                  className="w-full"
                  defaultValue={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <Button
                size="sm"
                shape="square"
                color="sub_300"
                className="text-btn2"
                onClick={handleChangePassword}
              >
                변경
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
