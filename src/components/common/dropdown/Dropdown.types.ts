export type DropdownProps = {
  dropdownItems: string[];
  size?: string;
};

export const dropdownSize = {
  sm: 'sm',
  lg: 'lg',
} as const;
export type DropdownSize = (typeof dropdownSize)[keyof typeof dropdownSize];
