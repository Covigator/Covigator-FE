/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../components/common/button';
import PlaceItem from '../../components/community/PlaceItem';
import ReviewItem from '../../components/community/ReviewItem';
import { Topbar } from '../../layouts';
import { CourseDetailType } from '../../types/community';

import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

const variants = {
  container: 'w-full h-full px-[30px] pt-[62px] mb-5',
  headerLayout: 'flex justify-between items-center',
  heartBtn: 'w-6 h-6 cursor-pointer',
  heartCount: 'text-bk-70 text-body6 !text-[8px]',
  map: 'mt-[17px] w-full h-[221px] bg-bk-40',
  label: 'text-body3 text-bk-80',
  reviewContainer:
    'flex gap-[10px] whitespace-nowrap overflow-auto cursor-pointer',
};

const index = () => {
  const { courseId } = useParams();
  const dummy: CourseDetailType = {
    title: '성수동 데이트',
    isLike: true,
    heartCount: 36,
    placeItems: [
      {
        id: 0,
        type: '카페',
        name: '스타벅스',
        desc: '굿굿',
      },
      {
        id: 1,
        type: '카페',
        name: '스타벅스',
        desc: '굿굿',
      },
      {
        id: 2,
        type: '카페',
        name: '스타벅스',
        desc: '굿굿',
      },
    ],
    reviewItems: [
      { id: 0, name: '조하상', content: '여기 좋아요', rate: 4 },
      { id: 1, name: '조하상', content: '여기 좋아요', rate: 4 },
      { id: 2, name: '조하상', content: '여기 좋아요', rate: 4 },
      { id: 3, name: '조하상', content: '여기 좋아요', rate: 4 },
      { id: 4, name: '조하상', content: '여기 좋아요', rate: 4 },
      { id: 5, name: '조하상', content: '여기 좋아요', rate: 4 },
    ],
  };

  const navigate = useNavigate();

  const [isLike, setIsLike] = useState<boolean>(dummy.isLike);
  const [likeCount, setLikeCount] = useState<number>(dummy.heartCount);

  const handleLike = () => {
    if (isLike) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLike((prev) => !prev);
  };

  return (
    <div className={variants.container}>
      <Topbar />
      <header className={variants.headerLayout}>
        <p className="text-bk-90 text-h1">성수동 데이트</p>
        <section className="flex gap-[10px] items-center">
          <div className="flex flex-col items-center">
            {isLike ? (
              <IoMdHeart
                className={clsx(variants.heartBtn, 'text-primary-500')}
                onClick={handleLike}
              />
            ) : (
              <IoMdHeartEmpty
                className={clsx(variants.heartBtn, 'text-bk-70')}
                onClick={handleLike}
              />
            )}
            <p className={variants.heartCount}>{likeCount}</p>
          </div>
          <Button size={'xs'} shape={'square'} color={'sub_300'}>
            채팅방
          </Button>
        </section>
      </header>
      <div className={variants.map}>지도 자리</div>
      <section className="mt-[25px]">
        <p className={clsx('mb-[7px]', variants.label)}>코스 장소</p>
        {dummy.placeItems.map((d) => {
          return (
            <div key={uuid()}>
              <PlaceItem
                type={d.type}
                name={d.name}
                desc={d.desc}
                img={d.img}
              />
              <div className="w-full h-[1px] bg-bk-50" />
            </div>
          );
        })}
      </section>
      <section className="flex flex-col gap-[9px] mt-[11px]">
        <div className={variants.headerLayout}>
          <p className={variants.label}>리뷰 ({dummy.reviewItems.length})</p>
          <Button
            size={'xs'}
            shape={'square'}
            color={'sub_300'}
            onClick={() =>
              navigate('/review', {
                state: { courseId: dummy.id, courseName: dummy.title },
              })
            }
          >
            리뷰작성
          </Button>
        </div>
        <div className={variants.reviewContainer}>
          {/* TODO: scrollbar 커스텀 */}
          {dummy.reviewItems.map((d) => {
            return (
              <ReviewItem
                key={uuid()}
                name={d.name}
                content={d.content}
                rate={d.rate}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default index;
