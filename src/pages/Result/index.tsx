import { useState } from 'react';

import CoursePreview from '../../components/home/coursePreview/CoursePreview';
import RefreshRecommend from '../../components/home/refreshRecommend/RefreshRecommend';
import { Topbar } from '../../layouts';
import Map from '../../pages/Home/Map';

export interface Location {
  name: string;
  isSelected: boolean;
  lat: number;
  lng: number;
  image?: string;
  description?: string;
  time?: string;
}

const Index = () => {
  const [locations, setLocations] = useState<Location[]>([
    {
      name: '마우스래빗',
      isSelected: false,
      lat: 37.541,
      lng: 127.0695,

      image: '/src/assets/image/restaurant_temporary.jpg',
      description: '맛있는 음식과 아늑한 분위기의 카페',
    },
    {
      name: 'CGV 건대입구점',
      isSelected: false,
      lat: 37.5407,
      lng: 127.0691,

      image: '/src/assets/image/restaurant_temporary.jpg',
      description: '최신 영화를 즐길 수 있는 멀티플렉스 영화관',
    },
    {
      name: '스타벅스 건대점',
      isSelected: false,
      lat: 37.5412,
      lng: 127.0699,

      image: '/src/assets/image/restaurant_temporary.jpg',
      description: '다양한 커피와 음료를 즐길 수 있는 카페',
    },
  ]);

  const handleLocationSelect = (index: number) => {
    setLocations((prevLocations) =>
      prevLocations.map((location, i) => ({
        ...location,
        isSelected: i === index,
      })),
    );
  };

  return (
    <div className="h-full w-full overflow-x-hidden">
      <Topbar />
      <RefreshRecommend />
      <CoursePreview
        date="6월 15일"
        weather="맑을"
        companions="매우 혼잡할"
        locations={locations}
      />
      <div className="h-[453px] w-full">
        <Map
          lat={37.541}
          lng={127.0695}
          locations={locations}
          onLocationSelect={handleLocationSelect}
        />
      </div>
    </div>
  );
};

export default Index;
