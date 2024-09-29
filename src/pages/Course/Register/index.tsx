/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from 'react';
import { BiSolidImageAdd } from 'react-icons/bi';
import { FiEdit } from 'react-icons/fi';
import {
  HiOutlineLockClosed,
  HiOutlineLockOpen,
  HiOutlineTrash,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/common/button';
import Chip from '../../../components/common/chip';
import Input from '../../../components/common/input';
import Textarea from '../../../components/common/textarea';
import PlaceItem from '../../../components/community/PlaceItem';
import { PlaceType } from '../../../constants/object';
import { usePostCourse } from '../../../hooks/api/useCourse';
import { Topbar } from '../../../layouts';
import {
  CoursePostInfoType,
  PlaceItemSnakeType,
} from '../../../types/community';
import Map from '../../Home/Map';

import { v4 as uuid } from 'uuid';

const variants = {
  container: 'w-full h-full pt-[63px] px-[30px] pb-11',
  section: 'w-full items-center flex flex-col mb-[19px]',
  lockIcon: 'w-6 h-6 text-sub-100 cursor-pointer',
  label: 'w-full text-body3 text-bk-90 mb-[10px]',
  imagePreview:
    'w-full max-w-[280px] h-[220px] rounded-[10px] flex justify-center items-center border border-bk-50 mb-[11px]',
  chipContainer:
    'w-full grid mb-[13px] grid-cols-3 justify-items-center gap-y-[11px]',
  btnContainer: 'flex flex-col items-center',
};

const index = () => {
  const navigate = useNavigate();

  const [currentLat, setCurrentLat] = useState<number>(37.541);
  const [currentLng, setCurrentLng] = useState<number>(127.0695);
  const [selectedChip, setSelectedChip] = useState<string>('');
  const [newPlaces, setNewPlaces] = useState<PlaceItemSnakeType[]>([]);
  const [isAddAble, setIsAddAble] = useState<boolean>(false);
  const [isRegisterAble, setIsRegisterAble] = useState<boolean>(false);
  const [isSecret, setIsSecret] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [textData, setTextData] = useState<CoursePostInfoType>({
    course_name: '',
    course_description: '',
    places: [],
    is_public: 'false',
  });

  const completeData = new FormData();

  const { mutate } = usePostCourse(completeData);

  // 선택된 위치의 좌표를 저장하는 상태
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  }>({ lat: currentLat, lng: currentLng });

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const placeTitleRef = useRef<HTMLInputElement>(null);
  const placeDescRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleLocationSelect = (
    lat: number,
    lng: number,
    isMarker?: boolean,
  ) => {
    if (!isMarker) {
      setCurrentLat(lat);
      setCurrentLng(lng);
      setSelectedLocation({ lat, lng });
    }
  };

  const handleChips = (chip: string) => {
    setSelectedChip(chip);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImages((prev: File[] | []) => {
        return [...prev, file];
      });
    }
    if (
      imageInputRef.current?.value &&
      placeTitleRef.current?.value &&
      placeDescRef.current?.value
    ) {
      setIsAddAble(true);
    } else {
      setIsAddAble(false);
    }
  };

  const handleAdd = () => {
    if (isAddAble) {
      const img = URL.createObjectURL(selectedImages[newPlaces.length]);
      setNewPlaces((prev) => [
        ...prev,
        {
          place_name: placeTitleRef.current?.value || '',
          address: 'address',
          category: selectedChip,
          description: placeDescRef.current?.value || '',
          img: img,
          longitude: selectedLocation.lng,
          latitude: selectedLocation.lat,
        },
      ]);
      setIsAddAble(false);
      setSelectedChip('');
      setSelectedLocation({ lat: 0.0, lng: 0.0 });
      if (
        placeTitleRef.current &&
        placeDescRef.current &&
        imageInputRef.current
      ) {
        placeTitleRef.current.value = '';
        placeTitleRef.current.focus();
        placeDescRef.current.value = '';
        imageInputRef.current.value = '';
        // placeDescRef.current.focus();
      }
    }
  };

  const handleRegister = () => {
    if (isRegisterAble) {
      setTextData({
        course_name: titleRef.current?.value || '',
        course_description: descRef.current?.value || '',
        places: newPlaces,
        is_public: !isSecret ? 'Y' : 'N',
      });
    }
  };

  /* 장소 추가 가능 여부 판단 */
  useEffect(() => {
    if (
      placeTitleRef.current?.value != '' &&
      placeDescRef.current?.value != ''
    ) {
      setIsAddAble(true);
    }
  }, [selectedChip]);

  /* 코스 추가 가능 여부 판단 */
  useEffect(() => {
    if (titleRef.current?.value != '' && descRef.current?.value != '') {
      setIsRegisterAble(true);
    }
  }, [newPlaces]);

  useEffect(() => {
    if (textData.course_name != '') {
      completeData.append(
        'postCourseRequest',
        new Blob([JSON.stringify(textData)], { type: 'application/json' }),
      );
      selectedImages.map((img) => completeData.append('image', img));
      mutate();
      navigate('/community');
    }
  }, [textData]);

  return (
    <div className={variants.container}>
      <Topbar handleClick={() => navigate('/community')} />
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
          maxLength={10}
          onChange={() => {
            /* 코스 추가 가능 여부 판단 */
            if (
              newPlaces.length != 0 &&
              titleRef.current?.value &&
              descRef.current?.value
            ) {
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
            if (
              newPlaces.length != 0 &&
              titleRef.current?.value &&
              descRef.current?.value
            ) {
              setIsRegisterAble(true);
            } else {
              setIsRegisterAble(false);
            }
          }}
        />
      </section>
      <section className="mt-[-2px] mb-[17px]">
        {newPlaces.map((item, i) => {
          return (
            <div key={uuid()} className="relative">
              <PlaceItem
                id={item.placeId}
                type={item.category}
                name={item.place_name}
                desc={item.description}
                img={URL.createObjectURL(selectedImages[i])}
              />
              <section className="absolute flex gap-[9px] right-[10px] top-[19px]">
                {/* TODO: 장소 수정 기능 추가 필요 */}
                <FiEdit className="w-4 h-4 text-sub-400" />
                <HiOutlineTrash
                  className="w-[18px] h-[18px] text-sub-400"
                  onClick={() =>
                    setNewPlaces((prevPlaces) =>
                      prevPlaces.filter(
                        (place) => place.placeId !== item.placeId,
                      ),
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
        <div className="w-full h-[194px] bg-bk-40 mb-[14px]">
          <Map
            lat={currentLat}
            lng={currentLng}
            locations={[]}
            onLocationSelect={handleLocationSelect}
          />
        </div>
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
        <section className={variants.section}>
          <Input
            ref={placeTitleRef}
            size={'lg'}
            placeholder={'장소 이름을 입력해주세요'}
            maxLength={15}
            onChange={() => {
              /* 장소 추가 가능 여부 판단 */
              if (
                imageInputRef.current?.value &&
                placeTitleRef.current?.value &&
                placeDescRef.current?.value
              ) {
                setIsAddAble(true);
              } else {
                setIsAddAble(false);
              }
            }}
          />
        </section>
        <label className={variants.imagePreview}>
          {selectedImages.length > 0 &&
          newPlaces.length == selectedImages.length - 1 ? (
            <img
              src={URL.createObjectURL(
                selectedImages[selectedImages.length - 1],
              )}
              alt="Selected"
              className="rounded-[10px] object-cover w-full h-full"
            />
          ) : (
            <BiSolidImageAdd className="w-12 h-12 text-bk-60" />
          )}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="collapse"
            onChange={handleImageUpload}
          />
        </label>
        <Textarea
          ref={placeDescRef}
          maxLength={50}
          placeholder={'지도에서 선택한 장소를 설명해주세요'}
          size={'md'}
          onChange={() => {
            /* 장소 추가 가능 여부 판단 */
            if (
              imageInputRef.current?.value &&
              placeTitleRef.current?.value &&
              placeDescRef.current?.value
            ) {
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
