export type TextareaProps = {
  maxLength: number;
  placeholder: string;
  defaultValue?: string;
  size: TextareaSize;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export const textareaSize = {
  md: 'md',
  lg: 'lg',
} as const;
export type TextareaSize = (typeof textareaSize)[keyof typeof textareaSize];
