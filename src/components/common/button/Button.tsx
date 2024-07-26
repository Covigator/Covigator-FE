import { PropsWithChildren, forwardRef } from 'react';

import {
  ButtonColor,
  ButtonProps,
  ButtonShape,
  ButtonSize,
} from './Button.types';

import clsx from 'clsx';

const style: {
  base: string;
  size: Record<ButtonSize, string>;
  shape: Record<ButtonShape, string>;
  color: Record<ButtonColor, string>;
} = {
  base: 'inline-flex items-center justify-center box-border select-none m-0 p-0 w-fit h-fit cursor-pointer disabled:cursor-default',
  size: {
    xs: 'w-fit h-fit py-[4px] px-[10px]',
    sm: 'w-[75px] h-[42px] py-[7px] px-[43px]',
    md: 'w-[115px] h-[43px] py-[7px] px-[43px]',
    lg: 'w-[280px] h-[54px] py-[17px] px-[102px]',
  },
  shape: {
    square: 'rounded-[10px]',
    rounded: 'rounded-full',
  },
  color: {
    default: 'bg-primary-500 text-white',
    sub: 'bg-sub-100 text-white',
    sub_300: 'bg-sub-300 text-white',
    hover: 'bg-sub-400 text-white',
    disabled: 'bg-bk-30 text-bk-60',
  },
};

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (props, ref) => {
    const {
      size = 'md',
      shape = 'rounded',
      color = 'default',
      startIcon,
      endIcon,
      className,
      children,
      ...rest
    } = props;

    return (
      <button
        type="button"
        ref={ref}
        className={clsx(
          style.base,
          style.shape[shape],
          style.size[size],
          style.color[color],
          'gap-[10px]',
          className,
        )}
        {...rest}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
