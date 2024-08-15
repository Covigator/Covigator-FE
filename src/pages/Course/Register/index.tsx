/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from 'react';
import { HiOutlineLockClosed, HiOutlineLockOpen } from 'react-icons/hi';

import Button from '../../../components/common/button';
import Chip from '../../../components/common/chip';
import Input from '../../../components/common/input';
import Textarea from '../../../components/common/textarea';
import PlaceItem from '../../../components/community/PlaceItem';
import { PlaceType } from '../../../constants/object';
import { Topbar } from '../../../layouts';
import { PlaceItemType } from '../../../types/community';

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
  const [newPlaces, setNewPlaces] = useState<PlaceItemType[]>([]);
  const [isAddAble, setIsAddAble] = useState<boolean>(false);
  const [isRegisterAble, setIsRegisterAble] = useState<boolean>(false);
  const [isSecret, setIsSecret] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleChips = (chip: string) => {
    setSelectedChip(chip);
  };

  const handleAdd = () => {
    /* TODO: 지도 연동 시 장소 이름 및 이미지 받아오기 */
    if (isAddAble) {
      const name = 'name';
      const img = 'img';
      const type = selectedChip;
      const desc = textAreaRef.current?.value || '';
      setNewPlaces((prev) => [...prev, { name, type, desc, img }]);
      setIsAddAble(false);
      setSelectedChip('');
      if (textAreaRef.current) {
        textAreaRef.current.value = '';
        textAreaRef.current.focus();
      }
    }
  };

  const handleRegister = () => {
    /* TODO: 코스 등록 */
    if (isRegisterAble) {
      console.log('등록 가능');
    }
  };

  /* 장소 추가 가능 여부 판단 */
  useEffect(() => {
    if (textAreaRef.current?.value != '') {
      setIsAddAble(true);
    }
  }, [selectedChip]);

  /* 코스 추가 가능 여부 판단 */
  useEffect(() => {
    if (inputRef.current?.value != '') {
      setIsRegisterAble(true);
    }
  }, [newPlaces]);

  return (
    <div className={variants.container}>
      <Topbar />
      <header className="flex justify-between mb-[13px]">
        <p className="text-h1 text-bk-90">코스 등록</p>
        {isSecret ? (
          <HiOutlineLockClosed
            className={variants.lockIcon}
            onClick={() => setIsSecret((prev) => !prev)}
          />
        ) : (
          <HiOutlineLockOpen
            className={variants.lockIcon}
            onClick={() => setIsSecret((prev) => !prev)}
          />
        )}
      </header>
      <section className={variants.section}>
        <p className={variants.label}>코스 제목</p>
        <Input
          ref={inputRef}
          size={'lg'}
          placeholder={'코스 제목을 입력해주세요'}
          maxLength={15}
          onChange={() => {
            /* 코스 추가 가능 여부 판단 */
            if (newPlaces.length != 0 && textAreaRef.current?.value) {
              setIsRegisterAble(true);
            } else {
              setIsRegisterAble(false);
            }
          }}
        />
      </section>
      <section className="mt-[-2px] mb-[17px]">
        {newPlaces.map((item) => {
          return (
            <div key={uuid()}>
              <PlaceItem
                type={item.type}
                name={item.name}
                desc={item.desc}
                img={item.img || ''}
              />
              <div className="w-full h-[1px] bg-bk-50" />
            </div>
          );
        })}
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
          onChange={() => {
            /* 장소 추가 가능 여부 판단 */
            if (selectedChip != '' && textAreaRef.current?.value) {
              setIsAddAble(true);
            } else {
              setIsAddAble(false);
            }
          }}
        />
      </section>
      <section className={variants.btnContainer}>
        <Button
          size={'lg'}
          shape={'rounded'}
          color={isAddAble ? 'sub' : 'disabled'}
          className="!mb-[6px]"
          onClick={handleAdd}
        >
          장소 추가하기
        </Button>
        <Button
          size={'lg'}
          shape={'rounded'}
          color={isRegisterAble ? 'default' : 'disabled'}
          onClick={handleRegister}
        >
          코스 등록하기
        </Button>
      </section>
    </div>
  );
};

export default index;
