// Need to make this component using Dialog component
import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { HiOutlineCalendar } from 'react-icons/hi';

interface SelectBoxProps {
  onChange?: (date: Date | null) => void;
}

const SelectBox: React.FC<SelectBoxProps> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  return (
    <div className="relative w-[280px]">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        customInput={
          <div className="w-[280px] h-[40px] bg-white cursor-pointer rounded-[5px] flex items-center justify-between px-[15px] border !border-sub-400 text-body3 text-bk-90">
            <span>
              {selectedDate
                ? selectedDate.toLocaleDateString()
                : '방문할 날짜를 선택해주세요'}
            </span>
            <HiOutlineCalendar className="w-6 h-6 text-sub-400" />
          </div>
        }
      />
    </div>
  );
};

export default SelectBox;
