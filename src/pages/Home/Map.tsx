import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { HiOutlineLocationMarker } from 'react-icons/hi';

// 위치 정보를 나타내는 인터페이스
interface Location {
  lat: number;
  lng: number;
  name: string;
  isSelected: boolean;
}

// Map 컴포넌트의 props 인터페이스
interface MapProps {
  lat: number;
  lng: number;
  radius?: number;
  locations?: Location[];
  onLocationSelect?: (index: number) => void;
}

// Kakao Maps API의 Circle 인터페이스를 확장
interface ExtendedCircle extends kakao.maps.Circle {
  setPosition(position: kakao.maps.LatLng): void;
  setRadius(radius: number): void;
}

const Map = ({
  lat,
  lng,
  radius,
  locations = [],
  onLocationSelect,
}: MapProps) => {
  // 지도를 표시할 div 요소에 대한 ref
  const mapRef = useRef<HTMLDivElement>(null);
  // 지도 인스턴스 상태
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  // 오버레이 배열을 저장할 ref
  const overlaysRef = useRef<kakao.maps.CustomOverlay[]>([]);
  // 원(Circle) 인스턴스를 저장할 ref
  const circleRef = useRef<ExtendedCircle | null>(null);

  // 마커 콘텐츠를 생성하는 함수
  const createMarkerContent = useCallback(
    (location: Location, index: number) => {
      const markerElement = document.createElement('div');
      markerElement.style.padding = '5px';
      markerElement.style.cursor = 'pointer';

      const iconElement = document.createElement('div');
      const root = ReactDOM.createRoot(iconElement);
      root.render(
        <HiOutlineLocationMarker
          color={location.isSelected ? '#F174A3' : '#9E9E9E'}
          size={28}
        />,
      );
      markerElement.appendChild(iconElement);

      // 마커 클릭 이벤트 처리
      markerElement.onclick = () => onLocationSelect?.(index);

      return markerElement;
    },
    [onLocationSelect],
  );

  // 카카오 맵 초기화 및 설정
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

        // 새 지도 인스턴스 생성
        const newMap = new window.kakao.maps.Map(mapRef.current, options);
        setMap(newMap);

        // radius가 제공된 경우에만 원 추가
        if (radius) {
          const circle = new window.kakao.maps.Circle({
            center: mapCenter,
            radius: radius * 1000, // km를 m로 변환
            strokeWeight: 1,
            strokeColor: '#fa0000',
            strokeOpacity: 0.8,
            strokeStyle: 'solid',
            fillColor: '#CFE7FF',
            fillOpacity: 0.3,
          }) as ExtendedCircle;
          circle.setMap(newMap);
          circleRef.current = circle;

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
          newMap.setBounds(bounds);
        }
      });
    };

    loadKakaoMaps();
  }, [lat, lng, radius]);

  // 위치 정보가 변경될 때마다 마커(오버레이) 업데이트
  useEffect(() => {
    if (!map) return;

    // 기존 오버레이 제거
    overlaysRef.current.forEach((overlay) => overlay.setMap(null));
    overlaysRef.current = [];

    if (Array.isArray(locations) && locations.length > 0) {
      // 새 오버레이 생성 및 추가
      locations.forEach((location, index) => {
        const position = new window.kakao.maps.LatLng(
          location.lat,
          location.lng,
        );
        const content = createMarkerContent(location, index);

        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: position,
          content: content,
        });

        customOverlay.setMap(map);
        overlaysRef.current.push(customOverlay);
      });
    }
  }, [map, locations, createMarkerContent]);

  return <div ref={mapRef} className="w-full h-full"></div>;
};

export default React.memo(Map);
