import { useEffect, useRef } from 'react';

interface MapProps {
  lat: number;
  lng: number;
  radius?: number;
}

const Map: React.FC<MapProps> = ({ lat, lng, radius }) => {
  const mapRef = useRef<HTMLDivElement>(null);

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
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapRef.current, options);

        // 마커 추가
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
        });
        marker.setMap(map);

        // radius가 제공된 경우에만 원 추가
        if (radius) {
          const circle = new window.kakao.maps.Circle({
            center: new window.kakao.maps.LatLng(lat, lng),
            radius: radius * 1000, // km -> m
            strokeWeight: 1,
            strokeColor: '#75B8FA',
            strokeOpacity: 0.8,
            strokeStyle: 'solid',
            fillColor: '#CFE7FF',
            fillOpacity: 0.3,
          });
          circle.setMap(map);
        }
      });
    };

    loadKakaoMaps();
  }, [lat, lng, radius]);

  return <div ref={mapRef} className="w-full h-full"></div>;
};

export default Map;
