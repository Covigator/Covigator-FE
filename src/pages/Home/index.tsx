import { useState } from 'react';

import Button from '../../components/common/button/Button';
import Chip from '../../components/common/chip/Chip';
import Dropdown from '../../components/common/dropdown/Dropdown';

const Home = () => {
  const timeOptions = [{ id: 0, text: '방문할 곳을 선택해주세요' }];

  const chipOptions = ['식당', '카페', '액티비티', '문화/여가', '자연', '기타'];

  const withOptions = [
    { id: 0, text: '함께 방문할 사람을 선택해주세요' },
    { id: 1, text: '연인' },
    { id: 2, text: '가족' },
    { id: 3, text: '친구' },
  ];

  return (
    <div className="x-screen h-screen overflow-x-hidden mt-24">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-start">
          <h1 className="text-h1">박재욱님</h1>
          <h1 className="text-h1">코스를 추천해드릴게요!</h1>
          <p className="text-body3 text-bk-70 mb-10">
            추천받고 싶은 코스에 대한 정보를 입력해주세요
          </p>
          <p className="text-body4 text-bk-70 mb-2">언제 방문할 예정인가요?</p>
          <p className="text-body4 text-bk-70 mb-2">
            어디를 방문할 예정인가요?
          </p>
          <Dropdown dropdownItems={timeOptions} size="lg" type="sub" />
          <p className="text-body4 text-bk-70 mb-2">
            누구와 방문할 예정인가요?
          </p>
          <Dropdown dropdownItems={withOptions} size="lg" type="sub" />
          <p className="text-body5 mb-2">어떤 곳을 방문하고 싶나요?</p>
          <div className="grid grid-cols-3 gap-2 w-full">
            {chipOptions.map((option, index) => (
              <Chip key={index} size="md" state="inactive">
                {option}
              </Chip>
            ))}
          </div>
        </div>

        <Button size="lg" color="default">
          추천받기
        </Button>
      </div>
    </div>
  );
};

export default Home;
