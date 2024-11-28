import { useState } from 'react';
import { LocationType } from '../../types/location';
import { v4 as uuid } from 'uuid';

interface LocationManagerProps {
  recommendResults: any[];
  onAddressAvailabilityChange: (isAvailable: boolean) => void;
  onInformationAvailabilityChange: (isAvailable: boolean) => void;
}

export const useLocationManager = ({
  recommendResults,
  onAddressAvailabilityChange,
  onInformationAvailabilityChange,
}: LocationManagerProps) => {
  const [locations, setLocations] = useState<LocationType[]>(() => {
    try {
      if (!recommendResults || !Array.isArray(recommendResults)) {
        console.warn('Invalid recommendResults:', recommendResults);
        return [];
      }

      return recommendResults.map((item, index) => {
        const lat = item.lat || 0;
        const lng = item.lng || 0;
        const address = item.address || '주소 정보 없음';

        if (address === '주소 정보 없음') {
          onAddressAvailabilityChange(false);
        }

        if (
          address === '주소 정보 없음' &&
          item.operationHour === '영업시간 정보 없음' &&
          item.phoneNumber === '전화번호 정보 없음'
        ) {
          onInformationAvailabilityChange(false);
        }

        return {
          id: uuid(),
          name: item.name || '이름 없음',
          courseType: item.courseType || '미분류',
          address,
          operationHour: item.operationHour || '영업시간 정보 없음',
          phoneNumber: item.phoneNumber || '전화번호 정보 없음',
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

  const handleLocationSelect = (lat: number, lng: number, isMarker?: boolean) => {
    if (isMarker) {
      setLocations((prevLocations) =>
        prevLocations.map((location) => ({
          ...location,
          isSelected: location.lat === lat && location.lng === lng,
        })),
      );
    }
  };

  return {
    locations,
    handleLocationSelect,
  };
};
