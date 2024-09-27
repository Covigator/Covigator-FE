import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CourseItem from '../../../components/community/CourseItem';
import { useLikeCourse } from '../../../hooks/api/useMypage';
import { Topbar } from '../../../layouts';
import { CourseListResponse } from '../../../types/community';

import { v4 as uuid } from 'uuid';

const Like = () => {
  const navigate = useNavigate();
  const [resData, setResData] = useState<CourseListResponse>();
  const { data } = useLikeCourse();

  useEffect(() => {
    if (data) {
      setResData(data);
    }
  }, [data]);

  return (
    <div className="w-full pt-[63px] px-[30px]">
      <Topbar handleClick={() => navigate('/mypage')} />
      <p className="text-h3 text-bk-90 mb-[19px]">찜한 코스</p>
      <main className="h-full flex flex-col gap-6 ">
        {resData?.courses &&
          resData?.courses.map((d) => {
            return (
              <CourseItem
                key={uuid()}
                id={d.courseId}
                title={d.name}
                caption={d.description}
                img={d.imageUrl}
                rate={d.score}
                isLike={d.dibs}
              />
            );
          })}
      </main>
    </div>
  );
};

export default Like;
