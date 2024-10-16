import { LocationItemType } from '../components/common/dropdown';

export const locationOptions: LocationItemType[] = [
  { id: 0, text: '방문할 곳을 선택해주세요', lat: 0, lng: 0 },
  { id: 1, text: '종로구', lat: 37.5735, lng: 126.979 },
  { id: 2, text: '중구', lat: 37.5641, lng: 126.9979 },
  { id: 3, text: '용산구', lat: 37.5326, lng: 126.9905 },
  { id: 4, text: '성동구', lat: 37.5633, lng: 127.0371 },
  { id: 5, text: '광진구', lat: 37.5385, lng: 127.0823 },
  { id: 6, text: '동대문구', lat: 37.5744, lng: 127.0395 },
  { id: 7, text: '중랑구', lat: 37.6065, lng: 127.0927 },
  { id: 8, text: '성북구', lat: 37.5894, lng: 127.0167 },
  { id: 9, text: '강북구', lat: 37.6397, lng: 127.0257 },
  { id: 10, text: '도봉구', lat: 37.6688, lng: 127.0471 },
  { id: 11, text: '노원구', lat: 37.6542, lng: 127.0568 },
  { id: 12, text: '은평구', lat: 37.6026, lng: 126.9291 },
  { id: 13, text: '서대문구', lat: 37.5791, lng: 126.9368 },
  { id: 14, text: '마포구', lat: 37.5665, lng: 126.9018 },
  { id: 15, text: '양천구', lat: 37.5168, lng: 126.8661 },
  { id: 16, text: '강서구', lat: 37.5509, lng: 126.8497 },
  { id: 17, text: '구로구', lat: 37.4952, lng: 126.8878 },
  { id: 18, text: '금천구', lat: 37.4566, lng: 126.8954 },
  { id: 19, text: '영등포구', lat: 37.5263, lng: 126.8968 },
  { id: 20, text: '동작구', lat: 37.5121, lng: 126.9395 },
  { id: 21, text: '관악구', lat: 37.4784, lng: 126.9516 },
  { id: 22, text: '서초구', lat: 37.4837, lng: 127.0324 },
  { id: 23, text: '강남구', lat: 37.5173, lng: 127.0473 },
  { id: 24, text: '송파구', lat: 37.5145, lng: 127.106 },
  { id: 25, text: '강동구', lat: 37.5301, lng: 127.1237 },
];
export const chipOptions = [
  '식당/카페',
  '쇼핑',
  '레저',
  '테마시설',
  '문화시설',
  '역사/유적',
  '자연',
];

export const withOptions = [
  { id: 0, text: '함께 방문할 사람을 선택해주세요' },
  { id: 1, text: '연인' },
  { id: 2, text: '가족' },
  { id: 3, text: '친구' },
];
