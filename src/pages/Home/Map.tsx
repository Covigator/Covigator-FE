import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { HiOutlineLocationMarker } from 'react-icons/hi';

interface Location {
  lat: number;
  lng: number;
  name: string;
  isSelected: boolean;
}

interface MapProps {
  lat: number;
  lng: number;
  radius?: number;
  locations?: Location[];
  onLocationSelect?: (index: number) => void;
}

const Map: React.FC<MapProps> = ({
  lat,
  lng,
  radius,
  locations,
  onLocationSelect,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

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

        const newMap = new window.kakao.maps.Map(mapRef.current, options);
        setMap(newMap);

        // locations가 없을 때만 중심 마커를 추가
        if (!locations || locations.length === 0) {
          const centerMarker = new window.kakao.maps.Marker({
            position: mapCenter,
          });
          centerMarker.setMap(newMap);
        }

        // radius가 제공된 경우에만 원 추가
        if (radius) {
          const circle = new window.kakao.maps.Circle({
            center: mapCenter,
            radius: radius * 1000,
            strokeWeight: 1,
            strokeColor: '#fa0000',
            strokeOpacity: 0.8,
            strokeStyle: 'solid',
            fillColor: '#CFE7FF',
            fillOpacity: 0.3,
          });
          circle.setMap(newMap);

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
  }, [lat, lng, radius, locations]);

  useEffect(() => {
    if (!map || !locations || !onLocationSelect) return;

    const overlays: kakao.maps.CustomOverlay[] = [];

    locations.forEach((location, index) => {
      const position = new window.kakao.maps.LatLng(location.lat, location.lng);

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

      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: markerElement,
        clickable: true,
      });

      customOverlay.setMap(map);
      overlays.push(customOverlay);

      window.kakao.maps.event.addListener(customOverlay, 'click', () => {
        onLocationSelect(index);
      });
    });

    return () => {
      overlays.forEach((overlay) => overlay.setMap(null));
    };
  }, [map, locations, onLocationSelect]);

  return <div ref={mapRef} className="w-full h-full"></div>;
};

export default Map;
