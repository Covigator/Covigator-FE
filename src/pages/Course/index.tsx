import { IoMdHeartEmpty } from 'react-icons/io';
import { useParams } from 'react-router-dom';

import Button from '../../components/common/button';
import { Topbar } from '../../layouts';

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { courseId } = useParams();

  return (
    <div className="w-full h-full px-[30px] pt-[62px]">
      <Topbar />
      <header className="flex justify-between items-center">
        <p className="text-bk-90 text-h1">성수동 데이트</p>
        <section className="flex gap-[10px] items-center">
          <div className="flex flex-col items-center">
            <IoMdHeartEmpty className="w-6 h-6" />
            <p className="text-bk-70 text-body6 !text-[8px]">36</p>
          </div>
          <Button size={'xs'} shape={'square'} color={'sub_300'}>
            채팅방
          </Button>
        </section>
      </header>
      <div className="mt-[17px] w-full h-[221px] bg-bk-40">지도 자리</div>
      <section className="mt-[25px] w-full">
        <p className="mb-[7px] text-body3 text-bk-80">상세 코스</p>
      </section>
    </div>
  );
};

export default index;
