import { useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { IoStar } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  useDeleteCourseLike,
  usePostCourseLike,
} from '../../hooks/api/useCourse';

export type CourseItemProps = {
  id: number;
  title: string;
  caption: string;
  img?: string;
  rate: number;
  isLike: boolean;
};

const variants = {
  container:
    'w-full h-[220px] rounded-[5px] bg-wh border shadow-[0_4px_4px_0_rgb(0,0,0,0.25)]',
  heartBtn: 'absolute top-[9px] right-3 cursor-pointer w-6 h-6',
  content: 'flex justify-between px-3 pt-[13px] pb-[18px]',
  title: 'text-body3 text-bk-90',
  desc: 'text-body6 text-bk-70',
  rate: 'top-[2px] w-[15px] h-[15px] text-[#FFD600]',
};

const CourseItem = ({
  id,
  title,
  caption,
  img,
  rate,
  isLike,
}: CourseItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLiked, setIsLiked] = useState<boolean>(isLike);

  const { mutate: postMutate } = usePostCourseLike(id);
  const { mutate: deleteMutate } = useDeleteCourseLike(id);

  const handleLike = () => {
    if (isLike) {
      deleteMutate();
    } else {
      postMutate();
    }
    setIsLiked((prev) => !prev);
  };

  return (
    <div className={variants.container}>
      <div className="h-[150px] relative">
        <img
          src={img}
          className="w-full h-full bg-bk-50 object-cover"
          onClick={() =>
            navigate(`/course/${id}`, { state: location.pathname })
          }
        />
        {isLiked ? (
          <IoMdHeart className={variants.heartBtn} onClick={handleLike} />
        ) : (
          <IoMdHeartEmpty className={variants.heartBtn} onClick={handleLike} />
        )}
      </div>
      <section
        className={variants.content}
        onClick={() => navigate(`/course/${id}`, { state: location.pathname })}
      >
        <div className="flex flex-col gap-[3px] items-start">
          <p className={variants.title}>{title}</p>
          <p className={variants.desc}>{caption}</p>
        </div>
        <div className="flex gap-[3px]">
          <IoStar className={variants.rate} />
          <p className={variants.desc}>{rate}</p>
        </div>
      </section>
    </div>
  );
};

export default CourseItem;
