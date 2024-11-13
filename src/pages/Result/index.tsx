import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { getWeatherForecastApi } from '../../api/weatherForecast';
import CoursePreview from '../../components/home/coursePreview/CoursePreview';
import RefreshRecommend from '../../components/home/refreshRecommend/RefreshRecommend';
import { useMapCenter } from '../../hooks/useMapCenter';
import { useRandomCongestion } from '../../hooks/useRandomCongestion';
import { Topbar } from '../../layouts';
import Map from '../../pages/Home/Map';
import { LocationType } from '../../types/location';

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const [weatherForecast, setWeatherForecast] =
    useState<string>('날씨 조회 중...');
  const randomCongestion = useRandomCongestion();
  const {
    recommendResults,
    selectedDate,
    selectedLocation,
    selectedCompanion,
  } = location.state || {};

  // 데이터 로깅
  useEffect(() => {
    console.log('Raw recommend results:', recommendResults);
  }, [recommendResults]);

  // 날씨 정보 가져오기
  useEffect(() => {
    const fetchWeatherForecast = async () => {
      if (!selectedDate || !selectedLocation?.lat || !selectedLocation?.lng) {
        setWeatherForecast('날씨 정보 없음');
        return;
      }

      try {
        const formattedDate = selectedDate
          .toISOString()
          .split('T')[0]
          .replace(/-/g, '');
        const response = await getWeatherForecastApi({
          date: formattedDate,
          latitude: selectedLocation.lat,
          longitude: selectedLocation.lng,
        });

        setWeatherForecast(`${response}일`);
      } catch (error) {
        console.error('날씨 정보 조회 실패:', error);
        setWeatherForecast('날씨 정보 없음');
      }
    };

    fetchWeatherForecast();
  }, [selectedDate, selectedLocation]);

  const [locations, setLocations] = useState<LocationType[]>(() => {
    if (Array.isArray(recommendResults)) {
      return recommendResults.map((item, index) => ({
        id: item._id || index,
        name: item.VISIT_AREA_NM || '이름 없음',
        lat: item.LATITUDE || 0,
        lng: item.LONGITUDE || 0,
        description: item.LOTNO_ADDR || item.ROAD_NM_ADDR || '주소 정보 없음',
        courseType: item.VISIT_AREA_TYPE_CD || '미분류',
        isSelected: index === 0,
        image: '/src/assets/image/placeholder.jpg',
      }));
    }
    return [];
  });

  // useMapCenter 사용
  const { mapCenter } = useMapCenter(locations);

  // 데이터 검증 로깅
  useEffect(() => {
    console.log('Current locations:', locations);
    console.log('Map center:', mapCenter);
  }, [locations, mapCenter]);

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

  // 데이터가 없을 때만 홈으로 리다이렉트
  useEffect(() => {
    if (!locations.length) {
      console.warn('No locations available - redirecting to home');
      navigate('/');
    }
  }, [locations, navigate]);

  if (!locations.length) {
    return null;
  }

  return (
    <div className="h-full w-full overflow-x-hidden relative">
      <div className="sticky top-0 z-50 bg-white border-none">
        <Topbar handleClick={() => navigate('/')} />
        <RefreshRecommend />
      </div>

      <div className="relative z-20 border-t-0">
        <CoursePreview
          date={
            selectedDate ? selectedDate.toLocaleDateString() : '날짜 미지정'
          }
          place={selectedLocation?.text || locations[0]?.name || '위치 미지정'}
          weather={weatherForecast}
          companions={randomCongestion}
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
          lat={mapCenter.lat}
          lng={mapCenter.lng}
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
