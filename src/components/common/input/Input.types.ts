export type InputProps = {
    size: InputSize;
    className?: string;
    defaultValue?: string | number;
    placeholder: string;
    maxLength?: number;
    icon?: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const inputSize = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
} as const;
export type InputSize = (typeof inputSize)[keyof typeof inputSize];