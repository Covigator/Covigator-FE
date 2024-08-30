import {
  HiOutlineUserCircle,
  HiOutlineHeart,
  HiOutlineFolderOpen,
  HiOutlineSpeakerphone,
} from 'react-icons/hi';

import { dropdownItemType } from '../components/common/dropdown';
import { MypageMenuItemType } from '../types/mypage';

export const PlaceType: string[] = [
  '식당',
  '카페',
  '액티비티',
  '문화/여가',
  '자연',
  '기타',
];

export const sortDropdownItems: dropdownItemType[] = [
  {
    id: 0,
    text: '최신순',
  },
  {
    id: 1,
    text: '별점순',
  },
  {
    id: 2,
    text: '좋아요순',
  },
];

export const regionDropdownItems: dropdownItemType[] = [
  {
    id: 0,
    text: '성동구',
  },
  {
    id: 1,
    text: '광진구',
  },
  {
    id: 2,
    text: '마포구',
  },
  {
    id: 3,
    text: '강남구',
  },
  {
    id: 4,
    text: '서초구',
  },
  {
    id: 5,
    text: '송파구',
  },
  {
    id: 6,
    text: '중구',
  },
  {
    id: 7,
    text: '종로구',
  },
  {
    id: 8,
    text: '영등포구',
  },
];

export const mypageMenuItems: MypageMenuItemType[] = [
  {
    icon: HiOutlineUserCircle,
    text: '내 정보',
    link: '/mypage/info',
  },
  {
    icon: HiOutlineHeart,
    text: '찜한 코스 모아보기',
    link: '/mypage/like',
  },
  {
    icon: HiOutlineFolderOpen,
    text: '마이 코스 모아보기',
    link: '/mypage/mycourse',
  },
  {
    icon: HiOutlineSpeakerphone,
    text: '공지사항',
    link: '/mypage/notice',
  },
];
