import { useEffect, useRef } from 'react';

interface MapProps {
  lat: number;
  lng: number;
  radius?: number;
}

const Map = ({ lat, lng, radius }: MapProps) => {
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

        const mapCenter = new window.kakao.maps.LatLng(lat, lng);

        // 반경에 따라 zoom level 조정
        let zoomLevel = 3;
        if (radius) {
          if (radius === 1) zoomLevel = 14;
          else if (radius === 5) zoomLevel = 12;
          else if (radius === 10) zoomLevel = 11;
        }

        const options = {
          center: mapCenter,
          level: zoomLevel,
        };

        const map = new window.kakao.maps.Map(mapRef.current, options);

        // 마커 추가
        const marker = new window.kakao.maps.Marker({
          position: mapCenter,
        });
        marker.setMap(map);

        // radius가 제공된 경우에만 원 추가
        if (radius) {
          const circle = new window.kakao.maps.Circle({
            center: mapCenter,
            radius: radius * 1000, // km를 m로 변환
            strokeWeight: 1,
            strokeColor: '#75B8FA',
            strokeOpacity: 0.8,
            strokeStyle: 'solid',
            fillColor: '#CFE7FF',
            fillOpacity: 0.3,
          });
          circle.setMap(map);

          // 원이 모두 보이도록 지도 영역 설정
          const bounds = new window.kakao.maps.LatLngBounds();
          bounds.extend(
            new window.kakao.maps.LatLng(
              lat - radius / 111,
              lng - radius / (111 * Math.cos((lat * Math.PI) / 180)),
            ),
          );
          bounds.extend(
            new window.kakao.maps.LatLng(
              lat + radius / 111,
              lng + radius / (111 * Math.cos((lat * Math.PI) / 180)),
            ),
          );
          map.setBounds(bounds);
        }
      });
    };

    loadKakaoMaps();
  }, [lat, lng, radius]);

  return <div ref={mapRef} className="w-full h-full"></div>;
};

export default Map;
