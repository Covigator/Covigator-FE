import { forwardRef, useState } from 'react';

import { InputProps, InputSize, InputType } from './Input.types';

import clsx from 'clsx';

const style: {
  base: string;
  focus: Record<InputType, string>;
  sizes: Record<InputSize, string>;
} = {
  base: 'flex w-full h-10 rounded-[10px] px-[15px] border border-bk-50 focus-visible:outline-none bg-wh text-body5 text-bk-90 placeholder-bk-50',
  focus: {
    normal: '!border-sub-300',
    chat: '!border-sub-100',
  },
  sizes: {
    sm: 'max-w-60',
    md: 'max-w-[280px]',
    lg: 'max-w-[300px] !text-body4',
    xl: 'h-[45px]', // 채팅 입력창
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
    type,
    onChange,
    onKeyDown,
  } = props;

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [value, setValue] = useState(defaultValue || '');

  const [count, setCount] = useState<number>(
    defaultValue?.toString().length || 0,
  );
  const handleCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(
      maxLength && e.target.value.length >= maxLength
        ? maxLength
        : e.target.value.length,
    );
  };

  return (
    <div className={clsx(style.sizes[size], 'relative w-full')}>
      <div
        className={clsx(
          'absolute top-2 left-[15px]',
          isFocused ? 'text-sub-300' : 'text-bk-50',
        )}
      >
        {icon}
      </div>
      <input
        value={value || ''}
        placeholder={placeholder}
        maxLength={maxLength}
        type={type || 'text'}
        ref={ref}
        onFocus={() => setIsFocused(true)}
        onBlur={() => value === '' && setIsFocused(false)}
        onChange={(e) => {
          onChange?.(e);
          handleCount(e);
          setValue(e.target.value);
        }}
        onKeyDown={onKeyDown}
        className={clsx(
          style.base,
          style.sizes[size],
          isFocused && style.focus[size === 'xl' ? 'chat' : 'normal'],
          icon && 'pl-[45px]',
          className,
        )}
      />
      {maxLength && (
        <p
          className={clsx(
            style.sizes[size],
            'absolute top-3 right-[15px] !text-body6',
            isFocused ? 'text-bk-70' : 'text-bk-50',
          )}
        >
          {count}/{maxLength}
        </p>
      )}
    </div>
  );
});

export default Input;
