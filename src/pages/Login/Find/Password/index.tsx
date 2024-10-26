import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { findPassword, verifyCode, changePassword } from '../../../../api/auth';
import Button from '../../../../components/common/button/Button';
import Input from '../../../../components/common/input';
import { Topbar } from '../../../../layouts';

const Index = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleRequestVerification = async () => {
    try {
      await findPassword(email);
      setError('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode) {
      setError('인증번호를 입력해주세요.');
      return;
    }
    try {
      await verifyCode({ email, code: verificationCode });
      setIsVerified(true);
      setError('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await changePassword({
        password: newPassword,
        passwordVerification: confirmPassword,
      });
      setError('');
      navigate('/login');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Topbar handleClick={() => navigate('/login')} />
      </div>
      <div className="flex flex-col items-center px-4 mt-24">
        <h1 className="text-h1 mb-24">비밀번호 찾기</h1>

        <div className="flex flex-col w-full max-w-[280px]">
          <div className="flex gap-x-2 mb-1">
            <Input
              size="sm"
              placeholder="이메일을 입력해주세요"
              type="email"
              className="w-full"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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

          <div className="text-body6 text-bk-70 mb-3">
            @를 포함한 전체 이메일을 입력해주세요
          </div>

          <div className="flex gap-x-2 mb-5">
            <Input
              size="sm"
              placeholder="인증번호를 입력해주세요"
              type="text"
              className="w-full"
              defaultValue={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
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
            <>
              <Input
                size="sm"
                placeholder="새로운 비밀번호를 입력해주세요"
                type="password"
                className="w-full mb-3"
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                size="sm"
                placeholder="비밀번호를 다시 입력해주세요"
                type="password"
                className="w-full mb-3"
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="w-[240px]">
                <Button
                  size="sm"
                  shape="rounded"
                  color="sub_300"
                  className="text-btn2 w-full mt-4"
                  onClick={handleChangePassword}
                >
                  변경
                </Button>
              </div>
            </>
          )}

          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Index;
