import { useState } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import {
  dropdownItemType,
  DropdownProps,
  DropdownSize,
  DropdownType,
} from './Dropdown.types';

import clsx from 'clsx';

const styles: {
  base: string;
  sizes: Record<DropdownSize, string>;
  types: Record<DropdownType, string>;
} = {
  base: 'w-full bg-wh cursor-pointer rounded-[5px] flex items-center',
  sizes: {
    sm: 'max-w-[60px] h-[26px] px-[6px]',
    lg: 'max-w-[280px] h-10 px-[15px]',
  },
  types: {
    sub: 'border !border-sub-400 text-bk-90 text-body3',
    primary: 'text-primary-500 text-btn3',
  },
};

const DropDown = ({ dropdownItems, size, type }: DropdownProps) => {
  const animationTiming = {
    enter: 400,
    exit: 600,
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number>(dropdownItems[0].id);

  const handleSelect = (item: dropdownItemType) => {
    setSelectedItem(item.id);
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <button
        className={clsx(styles.base, styles.sizes[size], styles.types[type])}
        onClick={() => setIsOpen(!isOpen)}
      >
        {dropdownItems[selectedItem].text}
      </button>
      <CSSTransition
        in={isOpen}
        timeout={animationTiming}
        mountOnEnter
        unmountOnExit
      >
        <div className="w-full h-0 z-10 absolute pt-1">
          {dropdownItems.map((item) => {
            const isFirst = item.id === 0;
            const isLast = item.id === dropdownItems.length - 1;

            return (
              <ul
                key={item.id + item.text}
                className={clsx(
                  styles.base,
                  styles.sizes[size],
                  styles.types[type],
                  !isFirst && !isLast && 'rounded-none !border-t-0',
                  isFirst && 'rounded-b-none',
                  isLast && 'rounded-t-none !border-t-0',
                )}
                onClick={(e) => handleSelect(item)}
              >
                {item.text}
              </ul>
            );
          })}
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropDown;
