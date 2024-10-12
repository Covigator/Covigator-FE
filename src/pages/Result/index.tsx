import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import CoursePreview from '../../components/home/coursePreview/CoursePreview';
import RefreshRecommend from '../../components/home/refreshRecommend/RefreshRecommend';
import { Topbar } from '../../layouts';
import Map from '../../pages/Home/Map';
import { locations as initialLocations } from './../../constants/location';

const Index = () => {
  const navigate = useNavigate();

  const [locations, setLocations] = useState(initialLocations);
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
        <Topbar handleClick={() => navigate('/')} />
        <RefreshRecommend />
      </div>

      <div className="relative z-20 border-t-0">
        <CoursePreview
          date="9월 30일"
          place="건대입구역"
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
