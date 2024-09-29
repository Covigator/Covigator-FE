import { ChipSize, ChipState, ChipProps } from './Chip.types';

import clsx from 'clsx';

const style: {
  base: string;
  size: Record<ChipSize, string>;
  state: Record<ChipState, string>;
} = {
  base: 'flex items-center justify-center box-border select-none m-0',
  size: {
    sm: 'w-[55px] h-[25px] py-[7px] px-[22px] text-btn3',
    md: 'w-[75px] h-fit py-[7px] px-[22px] text-body3 cursor-pointer',
  },
  state: {
    inactive: 'bg-bk-10 text-bk-50 border border-solid border-bk-50',
    active: 'bg-primary-400 text-white',
  },
};

const Chip = ({
  size = 'sm',
  state = 'inactive',
  className,
  onClick,
  children,
  ...rest
}: ChipProps) => {
  return (
    <div
      className={clsx(
        style.base,
        style.size[size],
        style.state[state],
        'rounded-[20px] whitespace-nowrap',
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Chip;
