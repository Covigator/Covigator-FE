import { DropdownItemType, LocationItemType } from '../../components/common/dropdown';

export interface RecommendationRequest {
  GUNGU: string;
  LONGITUDE: number;
  LATITUDE: number;
  RADIUS: number;
  AGE_GRP: string;
  GENDER: string;
  TRAVEL_STYL_1: string;
  TRAVEL_STYL_2: string;
  TRAVEL_STYL_3: string;
  TRAVEL_STYL_4: string;
  TRAVEL_STYL_5: string;
  TRAVEL_STYL_6: string;
  TRAVEL_STATUS_ACCOMPANY: string;
  VISIT_AREA_TYPE_CD: string;
}

export interface HomeState {
  selectedDate: Date | null;
  selectedLocation: LocationItemType;
  selectedCompanion: DropdownItemType;
  selectedPlaces: Record<string, boolean>;
}
