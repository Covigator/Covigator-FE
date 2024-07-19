export const inputSize = {
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
} as const;
export type InputSize = (typeof inputSize)[keyof typeof inputSize];