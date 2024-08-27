import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import Button from '../../../../components/common/button';
import Input from '../../../../components/common/input';
import { Topbar } from '../../../../layouts';

const Modify = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const location = useLocation();
  const userImg = location.state.userImg;
  const userName = location.state.userName;
  const userPassword = location.state.userPassword;

  const [profileImg, setProfileImg] = useState<string>(userImg);

  const imgInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);

  const [isModifiable, setIsModifiable] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImg(e.target?.result as string);
        setIsModifiable(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const setBtnActive = () => {
    if (
      nameInputRef.current &&
      passwordInputRef.current &&
      passwordConfirmInputRef.current
    ) {
      if (nameInputRef.current.value.length <= 0) {
        console.log('이름을 입력해주세요');
        setIsModifiable(false);
      } else if (passwordInputRef.current.value.length <= 0) {
        console.log('비밀번호를 입력해주세요');
        setIsModifiable(false);
      } else if (passwordConfirmInputRef.current.value.length <= 0) {
        console.log('비밀번호 확인을 입력해주세요');
        setIsModifiable(false);
      } else if (
        passwordInputRef.current.value !== passwordConfirmInputRef.current.value
      ) {
        console.log('비밀번호가 같은지 다시 확인해주세요');
        setIsModifiable(false);
      } else {
        setIsModifiable(true);
      }
    }
  };

  const handleModify = () => {
    if (isModifiable && imgInputRef.current) {
      console.log(profileImg);
      console.log('수정 완료');
    }
  };

  useEffect(() => {
    if (
      nameInputRef.current &&
      passwordInputRef.current &&
      passwordConfirmInputRef.current
    ) {
      nameInputRef.current.focus();
      passwordInputRef.current.focus();
      passwordConfirmInputRef.current.focus();
    }
  }, []);

  return (
    <div className="w-full px-10 pt-[105px] flex flex-col items-center">
      {/* TODO: 뒤로가기 클릭 시 현재까지의 정보 저장되지 않는다는 모달창 추가 필요 */}
      <Topbar handleClick={() => navigate(`/mypage/info/${userId}`)} />
      <form>
        <input
          ref={imgInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <img
          src={profileImg}
          alt="프로필 사진"
          className="w-[100px] h-[100px] rounded-full bg-bk-40 mb-[41px]"
          onClick={() => imgInputRef.current?.click()}
        />
      </form>
      <div className="flex flex-col gap-6 mb-10">
        <div className="relative w-[300px]">
          <Input
            ref={nameInputRef}
            size={'lg'}
            placeholder={'이름을 입력해주세요'}
            defaultValue={userName}
            onChange={setBtnActive}
          />
          <Button
            size={'xs'}
            shape={'square'}
            color={'sub_300'}
            className="absolute top-1/4 right-[15px]"
          >
            중복확인
          </Button>
        </div>
        <Input
          ref={passwordInputRef}
          size={'lg'}
          type="password"
          placeholder={'비밀번호를 입력해주세요'}
          defaultValue={userPassword}
          maxLength={15}
          onChange={setBtnActive}
        />
        <Input
          ref={passwordConfirmInputRef}
          size={'lg'}
          type="password"
          placeholder={'비밀번호 확인을 입력해주세요'}
          defaultValue={userPassword}
          maxLength={15}
          onChange={setBtnActive}
        />
      </div>
      <Button
        size={'lg'}
        shape={'rounded'}
        color={isModifiable ? 'default' : 'disabled'}
        onClick={handleModify}
      >
        수정 완료
      </Button>
    </div>
  );
};

export default Modify;
