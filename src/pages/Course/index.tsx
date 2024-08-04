/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { useParams } from 'react-router-dom';

import Button from '../../components/common/button';
import PlaceItem from '../../components/community/PlaceItem';
import ReviewItem from '../../components/community/ReviewItem';
import { Topbar } from '../../layouts';
import { PlaceItemType, ReviewItemType } from '../../types/community';

import { v4 as uuid } from 'uuid';

const index = () => {
  const { courseId } = useParams();
  const dummy: PlaceItemType[] = [
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
  ];

  const reviewDummy: ReviewItemType[] = [
    { id: 0, name: '조하상', content: '여기 좋아요', rate: 4 },
    { id: 1, name: '조하상', content: '여기 좋아요', rate: 4 },
    { id: 2, name: '조하상', content: '여기 좋아요', rate: 4 },
    { id: 3, name: '조하상', content: '여기 좋아요', rate: 4 },
    { id: 4, name: '조하상', content: '여기 좋아요', rate: 4 },
    { id: 5, name: '조하상', content: '여기 좋아요', rate: 4 },
  ];

  const [isLike, setIsLike] = useState<boolean>();

  const handleLike = () => {
    setIsLike((prev) => !prev);
  };

  return (
    <div className="w-full h-full px-[30px] pt-[62px] mb-5">
      <Topbar />
      <header className="flex justify-between items-center">
        <p className="text-bk-90 text-h1">성수동 데이트</p>
        <section className="flex gap-[10px] items-center">
          <div className="flex flex-col items-center">
            {isLike ? (
              <IoMdHeart
                className="w-6 h-6 cursor-pointer text-primary-500"
                onClick={handleLike}
              />
            ) : (
              <IoMdHeartEmpty
                className="w-6 h-6 cursor-pointer text-bk-70"
                onClick={handleLike}
              />
            )}

            <p className="text-bk-70 text-body6 !text-[8px]">36</p>
          </div>
          <Button size={'xs'} shape={'square'} color={'sub_300'}>
            채팅방
          </Button>
        </section>
      </header>
      <div className="mt-[17px] w-full h-[221px] bg-bk-40">지도 자리</div>
      <section className="mt-[25px] w-full">
        <p className="mb-[7px] text-body3 text-bk-80">코스 장소</p>
        {dummy.map((d) => {
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
      <section>
        <div className="mt-[11px] mb-[9px] w-full flex justify-between items-center">
          <p className="text-body3 text-bk-80">리뷰 ({reviewDummy.length})</p>
          <Button size={'xs'} shape={'square'} color={'sub_300'}>
            리뷰작성
          </Button>
        </div>
        <div className="flex gap-[10px] whitespace-nowrap overflow-auto cursor-pointer">
          {/* TODO: scrollbar 커스텀 */}
          {reviewDummy.map((d) => {
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
