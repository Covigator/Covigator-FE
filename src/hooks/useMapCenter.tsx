import { useMemo } from 'react';

import { LocationType } from '../types/location';

interface MapBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

interface MapCenter {
  lat: number;
  lng: number;
}

interface UseMapCenterResult {
  mapCenter: MapCenter;
  mapBounds: MapBounds | null;
  calculateRadius: () => number;
}

export const useMapCenter = (locations: LocationType[]): UseMapCenterResult => {
  // 추천된 장소들의 중심점 계산
  const mapCenter = useMemo<MapCenter>(() => {
    if (locations.length === 0) {
      return { lat: 37.541, lng: 127.0695 }; // 기본값
    }

    // 첫 번째 위치를 중심점으로 사용
    return {
      lat: locations[0].lat,
      lng: locations[0].lng,
    };
  }, [locations]);

  // 지도 범위 계산을 위한 최소/최대 좌표 찾기
  const mapBounds = useMemo<MapBounds | null>(() => {
    if (locations.length === 0) return null;

    const lats = locations.map((loc) => loc.lat);
    const lngs = locations.map((loc) => loc.lng);

    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  }, [locations]);

  // radius는 더 이상 사용하지 않으므로 간단한 값 반환
  const calculateRadius = () => 0;

  return {
    mapCenter,
    mapBounds,
    calculateRadius,
  };
};
