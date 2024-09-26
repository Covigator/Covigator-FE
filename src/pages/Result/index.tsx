import { useState, useRef, useCallback } from 'react';

import CoursePreview from '../../components/home/coursePreview/CoursePreview';
import RefreshRecommend from '../../components/home/refreshRecommend/RefreshRecommend';
import { Topbar } from '../../layouts';
import Map from '../../pages/Home/Map';

export interface Location {
  name: string;
  isSelected: boolean;
  lat: number;
  lng: number;
  image: string;
  description: string;
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

  const [isExpanded, setIsExpanded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleLocationSelect = useCallback(
    (lat: number, lng: number, isMarker?: boolean) => {
      if (isMarker) {
        setLocations((prevLocations) =>
          prevLocations.map((location) => ({
            ...location,
            isSelected: location.lat === lat && location.lng === lng,
          })),
        );
      }
    },
    [],
  );

  const handleExpand = (expanded: boolean) => {
    setIsExpanded(expanded);
  };

  return (
    <div className="h-full w-full overflow-x-hidden relative">
      <div className="sticky top-0 z-50 bg-white border-none">
        <Topbar />
        <RefreshRecommend />
      </div>

      <div className="relative z-20 border-t-0">
        <CoursePreview
          date="6월 15일"
          weather="맑을"
          companions="매우 혼잡할"
          locations={locations}
          isExpanded={isExpanded}
          onExpand={handleExpand}
        />
      </div>
      <div
        ref={mapRef}
        className={`h-[453px] w-full relative ${isExpanded ? 'blur-sm' : ''}`}
      >
        <Map
          lat={37.541}
          lng={127.0695}
          locations={locations}
          onLocationSelect={handleLocationSelect}
        />
        {isExpanded && (
          <div
            className="absolute inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
