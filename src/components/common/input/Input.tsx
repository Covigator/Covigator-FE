import { forwardRef, useState } from 'react';

import { InputProps, InputSize } from './Input.types';

import clsx from 'clsx';

const style: {
  base: string;
  sizes: Record<InputSize, string>;
} = {
  base: 'flex w-full h-10 rounded-[10px] px-[15px] border border-bk-50 focus:outline-sub-300 bg-wh text-body5 text-bk-90 placeholder-bk-50',
  sizes: {
    sm: 'max-w-60',
    md: 'max-w-[280px]',
    lg: 'max-w-[300px] !text-body4',
    xl: 'h-[45px] focus:outline-sub-100', // 채팅 입력창
  },
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    size,
    className,
    defaultValue,
    placeholder,
    maxLength,
    icon,
    onChange,
    onKeyDown,
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [value, setValue] = useState(defaultValue);

  return (
    <div className="relative w-full">
      <div
        className={clsx(
          'absolute top-2 left-[15px]',
          isFocused ? 'text-sub-300' : 'text-bk-50',
        )}
      >
        {icon}
      </div>
      <input
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        ref={ref}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => {
          onChange?.(e);
          setValue(e.target.value);
        }}
        onKeyDown={onKeyDown}
        className={clsx(
          style.base,
          style.sizes[size],
          icon && 'pl-[45px]',
          className,
        )}
      />
    </div>
  );
});

export default Input;
