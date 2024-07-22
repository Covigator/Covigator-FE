export type DropdownProps = {
  dropdownItems: dropdownItemType[];
  size: DropdownSize;
  type: DropdownType;
};

export const dropdownSize = {
  sm: 'sm',
  lg: 'lg',
} as const;
export type DropdownSize = (typeof dropdownSize)[keyof typeof dropdownSize];

export const dropdownType = {
  sub: 'sub',
  primary: 'primary',
} as const;
export type DropdownType = (typeof dropdownType)[keyof typeof dropdownType];

export type dropdownItemType = {
  id: number;
  text: string;
};
