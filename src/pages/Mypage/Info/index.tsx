import { useLocation, useNavigate } from 'react-router-dom';

import Button from '../../../components/common/button';
import { Topbar } from '../../../layouts';

const Info = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-10 pt-[105px] w-full flex flex-col items-center">
      <Topbar handleClick={() => navigate('/mypage')} />
      <img
        src=""
        alt="프로필 사진"
        className="w-[100px] h-[100px] rounded-full bg-bk-40 mb-[41px]"
      />
      <div className="w-full flex flex-row gap-6 items-center mb-3">
        <span className="text-body6 text-bk-90">닉네임</span>
        <span className="text-body3 text-bk-90">박재욱</span>
      </div>
      <div className="w-full flex flex-row gap-6 items-center mb-9">
        <span className="text-body6 text-bk-90">이메일</span>
        <span className="text-body3 text-bk-90">asdf@naver.com</span>
      </div>
      <Button size={'lg'} shape={'rounded'} color={'default'}>
        내 정보 수정
      </Button>
    </div>
  );
};

export default Info;
