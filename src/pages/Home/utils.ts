import { LocationItemType } from '../../components/common/dropdown';
import { RecommendationRequest } from './types';
import {
  transformAgeToGroup,
  transformGender,
  transformTravelStyle,
} from '../../utils/onboardingTransformer';

export const calculateRadiusInMeters = (location: LocationItemType): number => {
  return (location.radius || 0.5) * 1000;
};

export const createRecommendationRequest = (
  selectedLocation: LocationItemType,
  selectedCompanion: { text: string },
  selectedPlaces: Record<string, boolean>,
): RecommendationRequest => {
  const selectedPlaceTypes = Object.entries(selectedPlaces)
    .filter(([_, isSelected]) => isSelected)
    .map(([placeType]) => placeType);

  const radiusInMeters = calculateRadiusInMeters(selectedLocation);
  const gender = transformGender(localStorage.getItem('gender') || 'MALE');
  const ageGroup = transformAgeToGroup(
    localStorage.getItem('generation') || 'YOUNG_ADULT',
  );

  const travelStyleStr = localStorage.getItem('travelStyle');
  const travelStyle = travelStyleStr ? JSON.parse(travelStyleStr) : {};

  const travelStyleValues = transformTravelStyle(
    travelStyle.areaType || 'NATURE',
    travelStyle.familiarity || 'NEW',
    travelStyle.activityType || 'REST',
    travelStyle.popularity || 'NOT_WIDELY_KNOWN',
    travelStyle.planningType || 'PLANNED',
    travelStyle.photoPriority || 'NOT_IMPORTANT',
  );

  return {
    GUNGU: selectedLocation.text,
  LONGITUDE: Number(selectedLocation.lng) || 0,
  LATITUDE: Number(selectedLocation.lat) || 0,
  RADIUS: radiusInMeters,
  AGE_GRP: ageGroup,
  GENDER: gender,
  TRAVEL_STYL_1: travelStyleValues.TRAVEL_STYL_1,
  TRAVEL_STYL_2: travelStyleValues.TRAVEL_STYL_2,
  TRAVEL_STYL_3: travelStyleValues.TRAVEL_STYL_3,
  TRAVEL_STYL_4: travelStyleValues.TRAVEL_STYL_4,
  TRAVEL_STYL_5: travelStyleValues.TRAVEL_STYL_5,
  TRAVEL_STYL_6: travelStyleValues.TRAVEL_STYL_6,
  TRAVEL_STATUS_ACCOMPANY: selectedCompanion.text,
  VISIT_AREA_TYPE_CD: selectedPlaceTypes[0],
  };
};
