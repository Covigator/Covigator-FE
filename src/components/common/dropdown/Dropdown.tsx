import { useRef, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { DropdownProps, DropdownSize } from './Dropdown.types';

const styles: {
  base: string;
  sizes: Record<DropdownSize, string>;
} = {
  base: '',
  sizes: {
    sm: '',
    lg: '',
  },
};

const DropDown = ({ dropdownItems, size }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>(dropdownItems[0]);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <div className="w-full h-10">
      <Dropdown className="w-full bg-bk-40">
        {/* 드롭다운 버튼 */}
        <Dropdown.Toggle>{selectedItem}</Dropdown.Toggle>
        {/* 드롭다운 메뉴 */}
        <Dropdown.Menu>
          {dropdownItems.map((item: string) => {
            return (
              <Dropdown.Item key={item} onClick={(e) => handleSelect(item)}>
                {item}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropDown;
