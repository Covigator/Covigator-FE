/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import Button from '../../components/common/button';
import PlaceItem from '../../components/community/PlaceItem';
import ReviewItem from '../../components/community/ReviewItem';
import {
  useCourseDetail,
  useCourseReviews,
  useDeleteCourseLike,
  usePostCourseLike,
} from '../../hooks/api/useCourse';
import { useLikeCourse } from '../../hooks/api/useMypage';
import { Topbar } from '../../layouts';
import { CourseDetailResponse, ReviewResponse } from '../../types/community';

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

  const [resData, setResData] = useState<CourseDetailResponse>();
  const [reviewResData, setReviewResData] = useState<ReviewResponse>();

  const { data } = useCourseDetail(Number(courseId));
  const { data: reviewData } = useCourseReviews(Number(courseId));
  const { mutate: postMutate } = usePostCourseLike(Number(courseId));
  const { mutate: deleteMutate } = useDeleteCourseLike(Number(courseId));

  const navigate = useNavigate();
  const location = useLocation();

  const [isLike, setIsLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const handleLike = () => {
    if (isLike) {
      setLikeCount((prev) => prev - 1);
      deleteMutate();
    } else {
      setLikeCount((prev) => prev + 1);
      postMutate();
    }
    setIsLike((prev) => !prev);
  };

  useEffect(() => {
    if (data && reviewData) {
      setResData(data);
      setReviewResData(reviewData);
      setIsLike(data.dibs);
      setLikeCount(data.dibsCnt);
    }
  }, [data, reviewData]);

  return (
    <div className={variants.container}>
      <Topbar handleClick={() => navigate(`${location.state}`)} />
      <header className={variants.headerLayout}>
        <p className="text-bk-90 text-h1">{resData?.courseName}</p>
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
          <Link
            to={`/course/chat/${courseId}`}
            state={{
              courseId: `${courseId}`,
              courseName: `${resData?.courseName}`,
            }}
          >
            <Button size={'xs'} shape={'square'} color={'sub_300'}>
              채팅방
            </Button>
          </Link>
        </section>
      </header>
      <p className="mt-2 text-bk-80 text-body3">{resData?.courseDescription}</p>
      <div className={variants.map}>지도 자리</div>
      <section className="mt-[25px]">
        <p className={clsx('mb-[7px]', variants.label)}>코스 장소</p>
        {resData?.places.map((d) => {
          return (
            <div key={uuid()}>
              <PlaceItem
                id={d.place_id}
                type={d.category}
                name={d.place_name}
                desc={d.place_description}
                img={d.image_url}
              />
              <div className="w-full h-[1px] bg-bk-50" />
            </div>
          );
        })}
      </section>
      <section className="flex flex-col gap-[9px] mt-[11px]">
        <div className={variants.headerLayout}>
          <p className={variants.label}>
            리뷰 ({reviewResData?.reviews.length})
          </p>
          <Button
            size={'xs'}
            shape={'square'}
            color={'sub_300'}
            onClick={() =>
              navigate('/review', {
                state: { courseId: courseId, courseName: resData?.courseName },
              })
            }
          >
            리뷰작성
          </Button>
        </div>
        <div className={variants.reviewContainer}>
          {/* TODO: scrollbar 커스텀 */}
          {reviewResData?.reviews && reviewResData.reviews.length > 0 ? (
            reviewResData?.reviews.map((d) => {
              return (
                <ReviewItem
                  key={uuid()}
                  name={d.author}
                  content={d.comment}
                  rate={d.score}
                />
              );
            })
          ) : (
            <div className="mt-2 flex items-center justify-center w-full text-bk-70 text-body5">
              등록된 리뷰가 없어요
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default index;
