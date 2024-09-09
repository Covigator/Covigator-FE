/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import {
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlineTrash,
} from 'react-icons/hi';

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
  container: 'w-full h-full pt-[63px] px-[30px] pb-11',
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

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const courseDescRef = useRef<HTMLTextAreaElement>(null);

  const [tempId, setTempId] = useState<number>(0);

  const handleChips = (chip: string) => {
    setSelectedChip(chip);
  };

  const handleAdd = () => {
    /* TODO: 지도 연동 시 장소 이름 및 이미지 받아오기 */
    if (isAddAble) {
      const id = tempId;
      const name = 'name';
      const img = 'img';
      const type = selectedChip;
      const desc = courseDescRef.current?.value || '';
      setNewPlaces((prev) => [...prev, { id, name, type, desc, img }]);
      setIsAddAble(false);
      setSelectedChip('');
      setTempId((prev) => prev + 1);
      if (courseDescRef.current) {
        courseDescRef.current.value = '';
        courseDescRef.current.focus();
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
    if (courseDescRef.current?.value != '') {
      setIsAddAble(true);
    }
  }, [selectedChip]);

  /* 코스 추가 가능 여부 판단 */
  useEffect(() => {
    if (titleRef.current?.value != '') {
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
          ref={titleRef}
          size={'lg'}
          placeholder={'코스 제목을 입력해주세요'}
          maxLength={15}
          onChange={() => {
            /* 코스 추가 가능 여부 판단 */
            if (newPlaces.length != 0 && courseDescRef.current?.value) {
              setIsRegisterAble(true);
            } else {
              setIsRegisterAble(false);
            }
          }}
        />
      </section>
      <section className={variants.section}>
        <p className={variants.label}>코스 설명</p>
        <Input
          ref={descRef}
          size={'lg'}
          placeholder={'코스 설명을 입력해주세요'}
          maxLength={20}
          onChange={() => {
            /* 코스 추가 가능 여부 판단 */
            if (newPlaces.length != 0 && courseDescRef.current?.value) {
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
            <div key={uuid()} className="relative">
              <PlaceItem
                id={item.id}
                type={item.type}
                name={item.name}
                desc={item.desc}
                img={item.img || ''}
              />
              <section className="absolute flex gap-[9px] right-[10px] top-[19px]">
                {/* TODO: 장소 수정 기능 추가 필요 */}
                <FiEdit className="w-4 h-4 text-sub-400" />
                <HiOutlineTrash
                  className="w-[18px] h-[18px] text-sub-400"
                  onClick={() =>
                    setNewPlaces((prevPlaces) =>
                      prevPlaces.filter((place) => place.id !== item.id),
                    )
                  }
                />
              </section>

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
          ref={courseDescRef}
          maxLength={50}
          placeholder={'지도에서 선택한 장소를 설명해주세요'}
          size={'md'}
          onChange={() => {
            /* 장소 추가 가능 여부 판단 */
            if (selectedChip != '' && courseDescRef.current?.value) {
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
