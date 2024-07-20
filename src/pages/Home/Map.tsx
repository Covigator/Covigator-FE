import { useEffect, useRef } from 'react';

const Map: React.FC = () => {
  // 지도를 표시할 div 참조
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 카카오맵 API 로드 함수
    const loadKakaoMaps = () => {
      // 카카오맵 API가 잘 로드되었는지 확인
      if (
        typeof window.kakao === 'undefined' ||
        typeof window.kakao.maps === 'undefined'
      ) {
        console.error('카카오맵 API 로딩 에러');
        return;
      }

      // 카카오맵 API 로드 완료 후 실행될 함수
      window.kakao.maps.load(() => {
        // mapRef가 유효한지 확인
        if (!mapRef.current) return;

        const options = {
          center: new window.kakao.maps.LatLng(
            37.543239722374615,
            127.07733005460825,
          ),
          level: 3,
        };

        // 지도 생성
        new window.kakao.maps.Map(mapRef.current, options);
      });
    };

    loadKakaoMaps();
  }, []);

  return (
    <div className="h-screen w-screen">
      <div id="map" ref={mapRef} className="w-full h-4/5"></div>
    </div>
  );
};

export default Map;
