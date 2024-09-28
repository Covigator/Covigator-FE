/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState } from 'react';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '../../../components/common/button';
import Dialog from '../../../components/common/dialog';
import Header from '../../../components/common/header';
import Textarea from '../../../components/common/textarea';
import { usePostCourseReview } from '../../../hooks/api/useCourse';

import { v4 as uuid } from 'uuid';

const index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state.courseId;
  const courseName = location.state.courseName;

  const [rates, setRates] = useState<boolean[]>([
    true,
    true,
    true,
    false,
    false,
  ]);
  const [selectedRateIndex, setSelectedRateIndex] = useState<number>(
    rates.lastIndexOf(true),
  );

  const [inputValue, setInputValue] = useState<string>('');
  const inputValueRef = useRef<HTMLTextAreaElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate } = usePostCourseReview(courseId, {
    score: rates.filter(Boolean).length,
    comment: inputValueRef.current?.value || '',
  });

  const handleRate = (index: number) => {
    // 클릭한 인덱스가 현재 선택된 인덱스보다 작으면 변화 없음
    if (index < selectedRateIndex) {
      return;
    }

    if (rates[index]) {
      const newRates = rates.map((_, i) => i < index);
      setRates(newRates);
      setSelectedRateIndex(index - 1);
    } else {
      const newRates = rates.map((_, i) => i <= index);
      setRates(newRates);
      setSelectedRateIndex(index);
    }
  };

  return (
    <div className="px-[35px] flex flex-col items-center">
      <Header
        title={'리뷰 작성'}
        subtitle={`${courseName} 코스가 어떠셨나요?`}
        className="mt-[67px]"
      />
      <section className="flex mt-[38px] mb-[39px] gap-[10px]">
        {rates.map((rate, index) => {
          return (
            <button key={uuid()} onClick={() => handleRate(index)}>
              {rate ? (
                <IoStar className="w-[50px] h-[50px] text-[#FFD600]" />
              ) : (
                <IoStarOutline className="w-[50px] h-[50px] text-[#FFD600]" />
              )}
            </button>
          );
        })}
      </section>
      <Textarea
        ref={inputValueRef}
        maxLength={150}
        placeholder={'코스에 대한 리뷰를 작성해주세요'}
        size={'lg'}
        onChange={() => setInputValue(inputValueRef.current?.value || '')}
      />
      <section className="mt-[55px] flex flex-col gap-[14px]">
        <Button
          size={'lg'}
          shape={'rounded'}
          color={inputValue === '' ? 'disabled' : 'default'}
          disabled={inputValue === ''}
          onClick={() => {
            mutate();
            navigate(`/course/${courseId}`);
          }}
        >
          등록하기
        </Button>
        <Button
          size={'lg'}
          shape={'rounded'}
          color={'disabled'}
          onClick={() => setIsOpen(true)}
        >
          돌아가기
        </Button>
      </section>
      {isOpen && (
        <Dialog
          title={'이전 화면으로 돌아가시겠습니까?'}
          subtitle={'작성 중인 내용은 삭제됩니다'}
          onConfirm={() => navigate(`/course/${courseId}`)}
          onCancel={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default index;
