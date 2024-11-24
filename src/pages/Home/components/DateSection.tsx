import SelectBox from '../../../components/home/selectBox/SelectBox';

interface DateSectionProps {
  onDateChange: (date: Date | null) => void;
}

const DateSection = ({ onDateChange }: DateSectionProps) => {
  return (
    <div>
      <p className="text-body4 text-bk-70 mb-2">언제 방문할 예정인가요?</p>
      <SelectBox onChange={onDateChange} />
    </div>
  );
};

export default DateSection;
