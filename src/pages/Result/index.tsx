import { useCallback, useState } from 'react';

import CoursePreview from '../../components/home/coursePreview/CoursePreview';
import RefreshRecommend from '../../components/home/refreshRecommend/RefreshRecommend';
import { Topbar } from '../../layouts';
import Map from '../Home/Map';

export interface Location {
  name: string;
  isSelected: boolean;
  lat: number;
  lng: number;
}

const Index = () => {
  const [locations, setLocations] = useState<Location[]>([
    { name: '마우스래빗', isSelected: false, lat: 37.541, lng: 127.0695 },
    { name: 'CGV 건대입구점', isSelected: false, lat: 37.5407, lng: 127.0691 },
    { name: '스타벅스 건대점', isSelected: false, lat: 37.5412, lng: 127.0699 },
  ]);

  const handleLocationSelect = useCallback((index: number) => {
    setLocations((prevLocations) => {
      const newLocations = prevLocations.map((location, i) => {
        if (i === index) {
          return { ...location, isSelected: !location.isSelected };
        }
        return location;
      });
      console.log('Updated locations:', newLocations); // 디버깅용 로그
      return newLocations;
    });
  }, []);

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
