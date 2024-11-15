import { useMemo } from 'react';

import { LocationType } from '../types/location';

export interface MapBounds {
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

    // 모든 위치의 평균을 중심점으로 계산
    const sumLat = locations.reduce((sum, loc) => sum + loc.lat, 0);
    const sumLng = locations.reduce((sum, loc) => sum + loc.lng, 0);

    return {
      lat: sumLat / locations.length,
      lng: sumLng / locations.length,
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

  // 반경 계산 - 중심점에서 가장 먼 위치까지의 거리를 반환
  const calculateRadius = () => {
    if (locations.length === 0) return 0;

    const distances = locations.map((loc) => {
      const latDiff = loc.lat - mapCenter.lat;
      const lngDiff = loc.lng - mapCenter.lng;
      return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
    });

    return Math.max(...distances);
  };

  return {
    mapCenter,
    mapBounds,
    calculateRadius,
  };
};
