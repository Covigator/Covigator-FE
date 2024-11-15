import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../../components/common/button';
import Dialog from '../../../../components/common/dialog';
import Input from '../../../../components/common/input';
import { ModalStateContext } from '../../../../context/ModalProvider';
import {
  useDuplicateCheck,
  useMemberInfo,
} from '../../../../hooks/api/useMypage';
import useModal from '../../../../hooks/useModal';
import { Topbar } from '../../../../layouts';

const Modify = () => {
  const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState<string>('');

  const imgInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const passwordConfirmInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>(
    localStorage.getItem('nickname') || '',
  );
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const [isModifiable, setIsModifiable] = useState<boolean>(false);
  const { openModal } = useModal();
  const modalState = useContext(ModalStateContext);

  const { mutate: duplicateMutate } = useDuplicateCheck(name);

  const { mutate, isSuccess } = useMemberInfo({
    nickname: name,
    password: password,
    password_verification: passwordConfirm,
  });

  const handleDuplicateCheck = () => {
    if (name.length < 1 || name.length > 10) {
      openModal({
        type: 'Dialog',
        props: {
          title: '1자 이상 10자 이하로 입력해주세요',
        },
      });
    }
    duplicateMutate();
  };

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
      setName(nameInputRef.current.value);
      setPassword(passwordInputRef.current.value);
      setPasswordConfirm(passwordConfirmInputRef.current.value);

      setIsModifiable(false);

      if (nameInputRef.current.value.length <= 0) {
        alert('이름을 입력해주세요');
      } else if (nameInputRef.current.value.length > 10) {
        alert('이름은 10자 이하여야 합니다');
      } else if (passwordInputRef.current.value.length <= 0) {
        alert('비밀번호를 입력해주세요');
      } else if (passwordConfirmInputRef.current.value.length <= 0) {
        alert('비밀번호 확인을 입력해주세요');
      } else if (
        passwordInputRef.current.value !== passwordConfirmInputRef.current.value
      ) {
        alert('비밀번호가 같은지 다시 확인해주세요');
      } else {
        setIsModifiable(true);
      }
    }
  };

  const handleModify = () => {
    if (isModifiable && imgInputRef.current) {
      mutate();
      if (isSuccess) {
        navigate('/mypage');
      }
    }
  };

  return (
    <div className="w-full px-10 pt-[105px] flex flex-col items-center">
      {modalState?.type === 'Dialog' && (
        <Dialog
          title={modalState.props.title}
          subtitle={modalState.props.subtitle}
          content={modalState.props.content}
          onConfirm={modalState.props.onConfirm}
          onCancel={modalState.props.onCancel}
        />
      )}
      {/* TODO: 뒤로가기 클릭 시 현재까지의 정보 저장되지 않는다는 모달창 추가 필요 */}
      <Topbar handleClick={() => navigate('/mypage/info')} />
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
            defaultValue={localStorage.getItem('nickname') || ''}
            onChange={setBtnActive}
          />
          <Button
            size={'xs'}
            shape={'square'}
            color={'sub_300'}
            className="absolute top-1/4 right-[15px]"
            onClick={handleDuplicateCheck}
          >
            중복확인
          </Button>
        </div>
        <Input
          ref={passwordInputRef}
          size={'lg'}
          type="password"
          placeholder={'변경할 비밀번호를 입력해주세요'}
          maxLength={15}
          onChange={setBtnActive}
        />
        <Input
          ref={passwordConfirmInputRef}
          size={'lg'}
          type="password"
          placeholder={'비밀번호 확인을 입력해주세요'}
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
