import { Link, useLocation, useNavigate } from 'react-router-dom';

import Button from '../../../components/common/button';
import { Topbar } from '../../../layouts';

const Info = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.userId;

  /* TODO: userId로 API 호출해서 받은 데이터 */
  const dummy = {
    userImg: '',
    userName: '박재욱',
    userEmail: 'asdf@naver.com',
    userPassword: 'asdf1234',
  };

  return (
    <div className="w-full px-10 pt-[105px] flex flex-col items-center">
      <Topbar handleClick={() => navigate('/mypage')} />
      <img
        src={dummy.userImg}
        alt="프로필 사진"
        className="w-[100px] h-[100px] rounded-full bg-bk-40 mb-[41px]"
      />
      <div className="w-full flex flex-row gap-6 items-center mb-3">
        <span className="text-body6 text-bk-90">닉네임</span>
        <span className="text-body3 text-bk-90">{dummy.userName}</span>
      </div>
      <div className="w-full flex flex-row gap-6 items-center mb-9">
        <span className="text-body6 text-bk-90">이메일</span>
        <span className="text-body3 text-bk-90">{dummy.userEmail}</span>
      </div>
      <Link
        to={'/mypage/info/modify'}
        state={{
          userId: userId,
          userImg: dummy.userImg,
          userName: dummy.userName,
          userEmail: dummy.userEmail,
          userPassword: dummy.userPassword,
        }}
      >
        <Button size={'lg'} shape={'rounded'} color={'default'}>
          내 정보 수정
        </Button>
      </Link>
    </div>
  );
};

export default Info;
