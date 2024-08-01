export type DropdownProps = {
  dropdownItems: DropdownItemType[];
  size: DropdownSize;
  type: DropdownType;
  onSelect?: (item: DropdownItemType) => void;
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

export type DropdownItemType = {
  id: number;
  text: string;
  lat?: number;
  lng?: number;
};
