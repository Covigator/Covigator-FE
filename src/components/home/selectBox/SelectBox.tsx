import './SelectBox.css';

import { useState, useContext, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import {
  HiOutlineCalendar,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';

import { ModalStateContext } from '../../../context/ModalProvider';
import useModal from '../../../hooks/useModal';
import Dialog from '../../common/dialog/Dialog';

interface SelectBoxProps {
  onChange?: (date: Date | null) => void;
}

const SelectBox = ({ onChange }: SelectBoxProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { openModal, closeModal } = useModal();
  const modalState = useContext(ModalStateContext);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleConfirm = useCallback(() => {
    if (onChange && selectedDate) {
      onChange(selectedDate);
    }
    setIsOpen(false);
    closeModal();
  }, [selectedDate, onChange, closeModal]);

  const handleCancel = useCallback(() => {
    setSelectedDate(null);
    setIsOpen(false);
    closeModal();
  }, [closeModal]);

  const handleOpenDialog = useCallback(() => {
    setIsOpen(true);
    setSelectedDate(null);
    openModal({
      type: 'Dialog',
      props: {
        title: '날짜를 선택해주세요',
        content: (
          <div>
            <DatePicker
              selected={null}
              onChange={handleDateChange}
              showPopperArrow={false}
              inline
              renderCustomHeader={({
                date,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }: {
                date: Date;
                decreaseMonth: () => void;
                increaseMonth: () => void;
                prevMonthButtonDisabled: boolean;
                nextMonthButtonDisabled: boolean;
              }) => (
                <div className="flex flex-col">
                  <div className="w-[120px] h-[20px]">
                    <div className="w-full h-full flex items-start justify-between px-2 py-2">
                      <button
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                        className="text-bk-50"
                      >
                        <HiOutlineChevronLeft />
                      </button>
                      <span className="text-xs text-bk-70 font-semibold">
                        {date.getFullYear()}년 {date.getMonth() + 1}월
                      </span>
                      <button
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                        className="text-bk-50"
                      >
                        <HiOutlineChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              )}
              formatWeekDay={() => ''}
              calendarClassName="custom-calendar"
            />
          </div>
        ),
        onConfirm: handleConfirm,
        onCancel: handleCancel,
        showSubtitle: false,
      },
    });
  }, [handleConfirm, handleCancel, openModal]);

  return (
    <>
      <div
        className="w-[280px] h-[40px] bg-white cursor-pointer rounded-[5px] flex items-center justify-between px-[15px] border !border-sub-400 text-body3 text-bk-90"
        onClick={handleOpenDialog}
      >
        <span>
          {selectedDate && !isOpen
            ? selectedDate.toLocaleDateString()
            : '방문할 날짜를 선택해주세요'}
        </span>
        <HiOutlineCalendar className="w-6 h-6 text-sub-400" />
      </div>

      {modalState?.type === 'Dialog' && (
        <Dialog
          title={modalState.props.title}
          content={modalState.props.content}
          onConfirm={modalState.props.onConfirm}
          onCancel={modalState.props.onCancel}
          showSubtitle={false}
        />
      )}
    </>
  );
};

export default SelectBox;
