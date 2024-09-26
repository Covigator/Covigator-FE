import { useState, useEffect } from 'react';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import CSSTransition from 'react-transition-group/CSSTransition';

import {
  DropdownItemType,
  DropdownProps,
  DropdownSize,
  DropdownType,
} from './Dropdown.types';

import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

const styles: {
  base: string;
  sizes: Record<DropdownSize, string>;
  types: Record<DropdownType, string>;
} = {
  base: 'w-full bg-wh cursor-pointer flex items-center justify-between',
  sizes: {
    sm: 'max-w-[60px] h-[26px]',
    lg: 'max-w-[280px] h-10',
  },
  types: {
    sub: 'border !border-sub-400 text-bk-90 text-body3',
    primary: 'border !border-primary-500 text-primary-500 text-btn3',
  },
};

const DropDown: React.FC<DropdownProps> = ({
  dropdownItems,
  size,
  type,
  onSelect,
}) => {
  const animationTiming = {
    enter: 100,
    exit: 300,
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number>(dropdownItems[0].id);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
        margin: 5px 0;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #2D387A;
        border-radius: 20px;
        min-height: 40px;
      }
    `;
    document.head.appendChild(style);

    // Clean up function
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSelect = (item: DropdownItemType) => {
    if (item.id !== 0) {
      setSelectedItem(item.id);
      setIsOpen(false);
      onSelect && onSelect(item);
    }
  };

  const itemHeight = size === 'sm' ? 26 : 40;
  const maxVisibleItems = 3;
  const dropdownHeight =
    Math.min(dropdownItems.length - 1, maxVisibleItems) * itemHeight;

  return (
    <div className="w-full box-border relative">
      <button
        className={clsx(
          styles.base,
          styles.sizes[size],
          styles.types[type],
          type == 'primary' && '!border-none',
          'rounded-[5px] px-[15px]',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {dropdownItems[selectedItem].text}{' '}
        {isOpen ? (
          <HiOutlineChevronUp
            className={
              type == 'sub'
                ? 'w-6 h-6 text-sub-400'
                : 'w-3 h-3 text-primary-500'
            }
          />
        ) : (
          <HiOutlineChevronDown
            className={
              type == 'sub'
                ? 'w-6 h-6 text-sub-400'
                : 'w-3 h-3 text-primary-500'
            }
          />
        )}
      </button>
      <CSSTransition
        in={isOpen}
        timeout={animationTiming}
        mountOnEnter
        unmountOnExit
      >
        <div
          className={clsx(
            'absolute z-10 mt-2 overflow-y-auto bg-white custom-scrollbar',
            size === 'sm' ? 'w-full max-w-[60px]' : 'w-full max-w-[280px]',
            styles.types[type],
            'rounded-[5px] pr-[7px]',
          )}
          style={{ maxHeight: `${dropdownHeight}px` }}
        >
          {dropdownItems.slice(1).map((item, index) => {
            const isLast = index === dropdownItems.length - 2;

            return (
              <ul
                key={uuid()}
                className={clsx(
                  styles.base,
                  styles.sizes[size],
                  'px-[15px]',
                  !isLast && 'border-b border-bk-50',
                  'mx-0',
                )}
                onClick={() => handleSelect(item)}
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
