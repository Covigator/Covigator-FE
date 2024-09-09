export type InputProps = {
  size: InputSize;
  className?: string;
  defaultValue?: string | number;
  placeholder: string;
  maxLength?: number;
  icon?: React.ReactNode;
  type?: string; // password input에 사용
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const inputSize = {
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
} as const;
export type InputSize = (typeof inputSize)[keyof typeof inputSize];

export const inputType = {
  normal: 'normal',
  chat: 'chat',
} as const;
export type InputType = (typeof inputType)[keyof typeof inputType];
