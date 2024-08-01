import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { lat, lng } = (location.state as { lat?: number; lng?: number }) || {};

  useEffect(() => {
    const loadKakaoMaps = () => {
      if (
        typeof window.kakao === 'undefined' ||
        typeof window.kakao.maps === 'undefined'
      ) {
        console.error('카카오맵 API 로딩 에러');
        return;
      }

      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const options = {
          center: new window.kakao.maps.LatLng(
            lat ?? 37.543239722374615,
            lng ?? 127.07733005460825,
          ),
          level: 3,
        };

        new window.kakao.maps.Map(mapRef.current, options);
      });
    };

    loadKakaoMaps();
  }, [lat, lng]);

  return (
    <div className="h-screen w-screen">
      <div id="map" ref={mapRef} className="w-full h-4/5"></div>
    </div>
  );
};

export default Map;
