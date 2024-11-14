import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { getWeatherForecastApi } from '../../api/weatherForecast';
import CoursePreview from '../../components/home/coursePreview/CoursePreview';
import { useMapCenter } from '../../hooks/useMapCenter';
import { useRandomCongestion } from '../../hooks/useRandomCongestion';
import { Topbar } from '../../layouts';
import Map from '../../pages/Home/Map';
import { LocationType } from '../../types/location';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const [weatherForecast, setWeatherForecast] =
    useState<string>('날씨 조회 중...');
  const [isAddress, setIsAddress] = useState<boolean>(true);
  const [isInformation, setIsInformation] = useState<boolean>(false);

  const randomCongestion = useRandomCongestion();

  const { recommendResults, selectedDate, selectedLocation, radius } =
    location.state || {};

  const [locations, setLocations] = useState<LocationType[]>(() => {
    try {
      if (!recommendResults || !Array.isArray(recommendResults)) {
        console.warn('Invalid recommendResults:', recommendResults);
        return [];
      }

      // recommendResults가 직접 배열로 들어오므로 그대로 매핑
      return recommendResults.map((item, index) => {
        // 위도, 경도 변환
        const lat = parseFloat(String(item.lat)) || 0;
        const lng = parseFloat(String(item.lng)) || 0;

        const address =
          item.ROAD_NM_ADDR || item.LOTNO_ADDR || '주소 정보 없음';
        const operationHour = item.OPERATION_HOUR || '정보 없음';
        const phoneNumber = item.PHONE_NUMBER || '정보 없음';

        if (address === '주소 정보 없음') {
          setIsAddress(false);
        }

        if (
          address === '주소 정보 없음' &&
          operationHour === '정보 없음' &&
          phoneNumber === '정보 없음'
        ) {
          setIsInformation(false);
        }

        // 주소 정보 처리
        // const description = [
        //   item.ROAD_NM_ADDR || item.LOTNO_ADDR || '주소 정보 없음',
        //   `영업시간: ${item.OPERATION_HOUR || '정보 없음'}`,
        //   `전화번호: ${item.PHONE_NUMBER || '정보 없음'}`,
        // ]
        //   .filter(Boolean)
        //   .join('\n');

        return {
          id: item.id || '',
          name: item.name || '이름 없음',
          courseType: item.courseType || '미분류',
          address,
          operationHour,
          phoneNumber,
          lat,
          lng,
          isSelected: index === 0,
          image: '/src/assets/image/placeholder.jpg',
        };
      });
    } catch (error) {
      console.error('Error transforming recommendations:', error);
      return [];
    }
  });

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      if (!selectedDate || !selectedLocation?.lat || !selectedLocation?.lng) {
        setWeatherForecast('화창할');
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
        setWeatherForecast(`${response[0]}`);
      } catch (error) {
        console.error('날씨 정보 조회 실패:', error);
        setWeatherForecast('날씨 정보 없음');
      }
    };

    fetchWeatherForecast();
  }, [selectedDate, selectedLocation]);

  const { mapCenter, mapBounds } = useMapCenter(locations);

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
          isAddress={isAddress}
          isInformation={isInformation}
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
          mapBounds={mapBounds}
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

export default Result;
