import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  Icon: IconType;
  title: string;
  isActive: boolean;
  onClick: () => void;
}

const NavigationButton: React.FC<Props> = ({
  Icon,
  title,
  isActive,
  onClick,
}) => {
  
  const activeColor = '#606AB1';
  const inactiveColor = 'black';

  return (
    <div
      className="flex flex-col justify-center items-center cursor-pointer"
      onClick={onClick}
    >
      <Icon
        size={24}
        color={isActive ? activeColor : inactiveColor}
      />
      <div className={`text-nav mt-1 ${isActive ? 'text-[#606AB1]' : 'text-black'}`}>
        {title}
      </div>
    </div>
  );
};

export default NavigationButton;