import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../components/common/button';
import { Topbar } from '../../../layouts';

import clsx from 'clsx';

const variants = {
  container: 'w-full px-10 pt-[105px] flex flex-col items-center',
  contentContainer: 'w-full flex flex-row gap-6 items-center',
  label: 'text-body6 text-bk-90',
  content: 'text-body3 text-bk-90',
};

const Info = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  /* TODO: userId로 API 호출해서 받은 데이터 */
  const dummy = {
    userImg: '',
    userName: '박재욱',
    userEmail: 'asdf@naver.com',
  };

  return (
    <div className={variants.container}>
      <Topbar handleClick={() => navigate('/mypage')} />
      <img
        src={dummy.userImg}
        alt="프로필 사진"
        className="w-[100px] h-[100px] rounded-full bg-bk-40 mb-[41px]"
      />
      <div className={clsx(variants.contentContainer, 'mb-3')}>
        <span className={variants.label}>닉네임</span>
        <span className={variants.content}>{dummy.userName}</span>
      </div>
      <div className={clsx(variants.contentContainer, 'mb-9')}>
        <span className={variants.label}>이메일</span>
        <span className={variants.content}>{dummy.userEmail}</span>
      </div>
      <Button
        size={'lg'}
        shape={'rounded'}
        color={'default'}
        onClick={() =>
          navigate(`/mypage/info/modify/${userId}`, {
            state: {
              userImg: dummy.userImg,
              userName: dummy.userName,
            },
          })
        }
      >
        내 정보 수정
      </Button>
    </div>
  );
};

export default Info;
