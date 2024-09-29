import { LocationType } from './../types/location';

export const locations: LocationType[] = [
  {
    id: 1,
    name: '마우스래빗',
    courseType: '카페',
    isSelected: false,
    lat: 37.543,
    lng: 127.0695,
    image: '/src/assets/image/mouse_rabbit.jpg',
    description: '맛있는 음식과 아늑한 분위기의 카페',
  },
  {
    id: 2,
    name: 'CGV 건대입구점',
    courseType: '문화/여가',
    isSelected: false,
    lat: 37.54,
    lng: 127.067,
    image: '/src/assets/image/cgv.png',
    description: '최신 영화를 즐길 수 있는 멀티플렉스 영화관',
  },
  {
    id: 3,
    name: '스타벅스 건대점',
    courseType: '카페',
    isSelected: false,
    lat: 37.5412,
    lng: 127.0699,
    image: '/src/assets/image/starbucks.jpg',
    description: '다양한 커피와 음료를 즐길 수 있는 카페',
  },
];
