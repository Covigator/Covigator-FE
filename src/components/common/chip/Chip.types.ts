export const chipSizes = {
  sm: 'sm',
  md: 'md',
} as const;
export type ChipSize = (typeof chipSizes)[keyof typeof chipSizes];

export const chipStates = {
  inactive: 'inactive',
  active: 'active',
} as const;
export type ChipState = (typeof chipStates)[keyof typeof chipStates];

export type ChipProps = {
  size: ChipSize;
  state: ChipState;
  className?: string;
  children?: React.ReactNode;
};
