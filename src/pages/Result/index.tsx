import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import CoursePreview from '../../components/home/coursePreview/CoursePreview';
import { useMapCenter } from '../../hooks/useMapCenter';
import { useRandomCongestion } from '../../hooks/useRandomCongestion';
import { Topbar, Navigation } from '../../layouts';
import Map from '../../pages/Home/Map';
import { useWeatherForecast } from './WeatherForecast';
import { useLocationManager } from './LocationManager';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const [weatherForecast, setWeatherForecast] = useState<string>('날씨 조회 중...');
  const [isAddress, setIsAddress] = useState<boolean>(true);
  const [isInformation, setIsInformation] = useState<boolean>(true);

  const randomCongestion = useRandomCongestion();

  const { recommendResults, selectedDate, selectedLocation } =
    location.state || {};

  const { locations, handleLocationSelect } = useLocationManager({
    recommendResults,
    onAddressAvailabilityChange: setIsAddress,
    onInformationAvailabilityChange: setIsInformation,
  });

  useWeatherForecast({
    selectedDate,
    selectedLocation,
    onWeatherUpdate: setWeatherForecast,
  });

  const { mapCenter, mapBounds } = useMapCenter(locations);

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
    <div className="h-screen w-full flex flex-col relative">
      <div className="sticky top-0 z-50 bg-white border-none">
        <Topbar handleClick={() => navigate('/')} />
      </div>

      <div className="flex-1 overflow-y-auto">
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

      <div className="sticky bottom-0 z-50">
        <Navigation />
      </div>
    </div>
  );
};

export default Result;
