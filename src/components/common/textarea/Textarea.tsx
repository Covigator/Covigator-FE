import { forwardRef, PropsWithChildren, useState } from 'react';

import { TextareaProps, TextareaSize } from './Textarea.types';

import clsx from 'clsx';

const styles: {
  base: string;
  sizes: Record<TextareaSize, string>;
  countPosition: Record<TextareaSize, string>;
} = {
  base: 'rounded-[10px] border border-bk-50 text-body5 text-bk-50 focus:text-bk-90 focus:outline-sub-300 pl-[15px] pt-[15px]',
  sizes: {
    md: 'w-full max-w-[280px] h-[96px]',
    lg: 'w-full max-w-[280px] h-[194px]',
  },
  countPosition: {
    md: 'bottom-[6px] right-[9px]',
    lg: 'bottom-[15px] right-[15px]',
  },
};

const Textarea = forwardRef<
  HTMLTextAreaElement,
  PropsWithChildren<TextareaProps>
>((props, ref) => {
  const { maxLength, placeholder, defaultValue, size, onChange, onKeyDown } =
    props;

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [value, setValue] = useState<string>('' || defaultValue!);

  const [count, setCount] = useState<number>(0 && defaultValue?.length);

  const handleCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCount(
      maxLength && e.target.value.length >= maxLength
        ? maxLength
        : e.target.value.length,
    );
  };

  return (
    <div className={clsx(styles.sizes[size], 'relative')}>
      <textarea
        ref={ref}
        maxLength={maxLength}
        placeholder={placeholder}
        className={clsx(styles.base, styles.sizes[size])}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => {
          onChange?.(e);
          handleCount(e);
          setValue(e.target.value);
        }}
        onKeyDown={onKeyDown}
      >
        {value}
      </textarea>
      <p
        className={clsx(
          'absolute text-body6 text-bk-50',
          styles.countPosition[size],
          isFocused && 'text-bk-70',
        )}
      >
        {count}/{maxLength}
      </p>
    </div>
  );
});

export default Textarea;
