import { DropdownItemType } from '../../../components/common/dropdown';
import Dropdown from '../../../components/common/dropdown/Dropdown';
import { withOptions } from '../../../constants/homeOption';

interface CompanionSectionProps {
  onCompanionSelect: (item: DropdownItemType) => void;
}

const CompanionSection = ({  onCompanionSelect,
}: CompanionSectionProps) => {
  return (
    <div className="mt-[23px]">
      <p className="text-body4 text-bk-70 mb-2">누구와 함께 가시나요?</p>
      <div className="w-[280px]">
        <Dropdown
          dropdownItems={withOptions}
          size="lg"
          type="sub"
          onSelect={onCompanionSelect}
          isHome={true}
        />
      </div>
    </div>
  );
};

export default CompanionSection;
