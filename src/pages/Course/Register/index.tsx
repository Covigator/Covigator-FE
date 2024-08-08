/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState } from 'react';
import { HiOutlineLockClosed } from 'react-icons/hi';

import Button from '../../../components/common/button';
import Chip from '../../../components/common/chip';
import Input from '../../../components/common/input';
import Textarea from '../../../components/common/textarea';
import PlaceItem from '../../../components/community/PlaceItem';
import { PlaceType } from '../../../constants/object';
import { Topbar } from '../../../layouts';

import { v4 as uuid } from 'uuid';

const variants = {
  container: 'w-full h-full pt-[63px] px-[30px]',
  section: 'items-center flex flex-col mb-[19px]',
  lockIcon: 'w-6 h-6 text-sub-100 cursor-pointer',
  label: 'w-full text-body3 text-bk-90 mb-[10px]',
  chipContainer:
    'w-full grid mb-[13px] grid-cols-3 justify-items-center gap-y-[11px]',
  btnContainer: 'flex flex-col items-center',
};

const index = () => {
  const [selectedChip, setSelectedChip] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChips = (chip: string) => {
    setSelectedChip((prev) => (prev != chip ? chip : prev));
  };

  /* 장소 추가 가능 여부 판단 */
  const isAddAble = () => {
    if (
      selectedChip != '' &&
      inputRef.current?.value != '' &&
      textAreaRef.current?.value != ''
    ) {
      return true;
    }
    return false;
  };

  /* 코스 추가 가능 여부 판단 */
  const isRegisterAble = () => {
    // if ( ) {
    //   return true;
    // } return false;
  };

  return (
    <div className={variants.container}>
      <Topbar />
      <header className="flex justify-between mb-[13px]">
        <p className="text-h1 text-bk-90">코스 등록</p>
        <HiOutlineLockClosed className={variants.lockIcon} />
      </header>
      <section className={variants.section}>
        <p className={variants.label}>코스 제목</p>
        <Input
          ref={inputRef}
          size={'lg'}
          placeholder={'코스 제목을 입력해주세요'}
          maxLength={15}
        />
      </section>
      <section className={variants.section}>
        <p className={variants.label}>장소 추가</p>
        <div className="w-full h-[194px] bg-bk-40 mb-[14px]">지도자리</div>
        <div className={variants.chipContainer}>
          {PlaceType.map((item) => {
            return (
              <Chip
                key={uuid()}
                size={'md'}
                state={selectedChip === item ? 'active' : 'inactive'}
                onClick={() => handleChips(item)}
              >
                {item}
              </Chip>
            );
          })}
        </div>
        <Textarea
          ref={textAreaRef}
          maxLength={50}
          placeholder={'지도에서 선택한 장소를 설명해주세요'}
          size={'md'}
        />
      </section>
      <section className={variants.btnContainer}>
        <Button
          size={'lg'}
          shape={'rounded'}
          color={isAddAble() ? 'sub' : 'disabled'}
          className="!mb-[6px]"
        >
          장소 추가하기
        </Button>
        <Button
          size={'lg'}
          shape={'rounded'}
          color={isRegisterAble() ? 'default' : 'disabled'}
        >
          코스 등록하기
        </Button>
      </section>
    </div>
  );
};

export default index;
