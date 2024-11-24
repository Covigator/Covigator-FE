import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { fetchRecommendations } from '../../api/recommendation';
import { LocationItemType, DropdownItemType } from '../../components/common/dropdown';
import { locationOptions, withOptions, chipOptions } from '../../constants/homeOption';
import { createRecommendationRequest, calculateRadiusInMeters } from './utils';

interface MutationContext {
  selectedDate: Date | null;
  selectedLocation: LocationItemType;
  selectedCompanion: DropdownItemType;
}

export const useHomeState = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationItemType>(locationOptions[0]);
  const [selectedCompanion, setSelectedCompanion] = useState<DropdownItemType>(withOptions[0]);
  const [selectedPlaces, setSelectedPlaces] = useState<Record<string, boolean>>(
    chipOptions.reduce((acc, option) => ({ ...acc, [option]: false }), {})
  );
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    const dateSelected = selectedDate !== null;
    const locationSelected = selectedLocation.id !== 0;
    const companionSelected = selectedCompanion.id !== 0;
    const placesSelected = Object.values(selectedPlaces).some(Boolean);

    setIsAllSelected(dateSelected && locationSelected && companionSelected && placesSelected);
  }, [selectedDate, selectedLocation, selectedCompanion, selectedPlaces]);

  return {
    selectedDate,
    setSelectedDate,
    selectedLocation,
    setSelectedLocation,
    selectedCompanion,
    setSelectedCompanion,
    selectedPlaces,
    setSelectedPlaces,
    showLocationDialog,
    setShowLocationDialog,
    isAllSelected
  };
};

export const useRecommendation = () => {
  const navigate = useNavigate();

  return useMutation<any, unknown, any, MutationContext>(fetchRecommendations, {
    onMutate: async (variables) => {
      return {
        selectedDate: variables.selectedDate,
        selectedLocation: variables.selectedLocation,
        selectedCompanion: variables.selectedCompanion,
      };
    },
    onSuccess: (data, variables, context) => {
      if (Array.isArray(data) && data.length === 0) {
        alert('선택하신 조건에 맞는 추천 결과를 찾지 못했습니다.\n다른 조건으로 다시 시도해보세요.');
        return;
      }

      if (context) {
        const { selectedDate, selectedLocation, selectedCompanion } = context;
        
        navigate('/result', {
          state: {
            recommendResults: data,
            selectedDate,
            selectedLocation,
            selectedCompanion,
            radius: calculateRadiusInMeters(selectedLocation),
          },
        });
      }
    },
    onError: (error) => {
      console.error('Recommendation Error:', error);
      alert('추천 과정에서 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });
};
