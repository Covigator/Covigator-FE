import { IconType } from 'react-icons';

export type MypageMenuItemType = { icon: IconType; text: string; link: string };

export type MypageDataType = {
  id: number;
  img?: string;
  name: string;
  email: string;
};

export type MypageModifyMemberInfo = {
  nickname: string;
  password: string;
  password_verification: string;
};
