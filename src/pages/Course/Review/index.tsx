/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { IoStar, IoStarOutline } from 'react-icons/io5';
import { useLocation } from 'react-router-dom';

import Button from '../../../components/common/button';
import Header from '../../../components/common/header';
import Textarea from '../../../components/common/textarea';

import { v4 as uuid } from 'uuid';

const index = () => {
  const location = useLocation();
  // TODO: 리뷰 작성 버튼 클릭 시 Link의 state로 courseId 및 courseName 넘기기
  //   const courseName = location.state.courseName;
  const courseName = '코스이름';

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
        maxLength={150}
        placeholder={'코스에 대한 리뷰를 작성해주세요'}
        size={'lg'}
      />
      <section className="mt-[55px] flex flex-col gap-[14px]">
        <Button size={'lg'} shape={'rounded'} color={'default'}>
          등록하기
        </Button>
        <Button size={'lg'} shape={'rounded'} color={'default'}>
          돌아가기
        </Button>
      </section>
    </div>
  );
};

export default index;
