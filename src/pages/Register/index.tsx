import { useState, useEffect } from 'react';
import { HiUser } from 'react-icons/hi2';

import Button from '../../components/common/button/Button';
import Input from '../../components/common/input';
import KakaoLogin from '../../components/login/KakaoLogin';
import { Topbar } from '../../layouts';

const Index = () => {
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      nickname.trim() !== '' &&
      name.trim() !== '' &&
      id.trim() !== '' &&
      password.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      password === confirmPassword;

    setIsFormValid(isValid);
  }, [nickname, name, id, password, confirmPassword]);

  return (
    <div className="w-screen h-screen overflow-x-hidden mt-24">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Topbar />
      </div>
      <div className="flex-1 pt-4">
        <div className="flex flex-col items-center mx-10">
          <div className="flex justify-center mb-6">
            <div className="h-[100px] w-[100px] border border-bk-50 rounded-full flex items-center justify-center relative">
              <span className="text-bk-50">
                <HiUser className="h-20 w-20" />
              </span>
            </div>
          </div>

          <div className="mt-3 mb-6">
            <Button
              size="xs"
              color="sub_300"
              shape="square"
              className="rounded-[5px] !px-[10px] !py-[4px]"
            >
              프로필 사진 등록하기
            </Button>
          </div>

          <div className="flex flex-col items-center gap-y-3 w-[280px]">
            <div className="w-full">
              <Input
                size="md"
                placeholder="닉네임을 입력해주세요"
                maxLength={10}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Input
                size="md"
                placeholder="이름을 입력해주세요"
                maxLength={15}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Input
                size="md"
                placeholder="아이디를 입력해주세요"
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Input
                size="md"
                placeholder="비밀번호를 입력해주세요"
                type="password"
                maxLength={15}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Input
                size="md"
                placeholder="비밀번호를 확인해주세요"
                type="password"
                maxLength={15}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-7">
            <Button
              size="lg"
              color={isFormValid ? 'default' : 'disabled'}
              shape="square"
              disabled={!isFormValid}
            >
              가입하기
            </Button>
          </div>

          <div className="relative flex items-center w-full mt-8 mb-4">
            <div className="flex-grow border-t border-bk-30"></div>
            <span className="flex-shrink text-bk-50 mx-4 text-body5">
              간편 회원 가입
            </span>
            <div className="flex-grow border-t border-bk-30"></div>
          </div>

          <div className="flex justify-center mb-28">
            <KakaoLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
