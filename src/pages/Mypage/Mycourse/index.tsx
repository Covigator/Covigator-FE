import { useNavigate } from 'react-router-dom';

import CourseItem from '../../../components/community/CourseItem';
import { Topbar } from '../../../layouts';
import { dummy } from '../../Community';

import { v4 as uuid } from 'uuid';

const Mycourse = () => {
  const navigate = useNavigate();
  // const { userId } = useParams();

  return (
    <div className="w-full pt-[63px] px-[30px]">
      <Topbar handleClick={() => navigate('/mypage')} />
      <p className="text-h3 text-bk-90 mb-[19px]">마이 코스</p>
      <main className="h-full flex flex-col gap-6 ">
        {dummy.map((d) => {
          return (
            <CourseItem
              key={uuid()}
              id={d.id}
              title={d.title}
              caption={d.caption}
              img={d.img}
              rate={d.rate}
              isLike={d.isLike}
            />
          );
        })}
      </main>
    </div>
  );
};

export default Mycourse;
