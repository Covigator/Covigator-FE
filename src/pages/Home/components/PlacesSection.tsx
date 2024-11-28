import Chip from '../../../components/common/chip/Chip';
import { chipOptions } from '../../../constants/homeOption';

interface PlacesSectionProps {
  selectedPlaces: Record<string, boolean>;
  onPlaceSelect: (place: string) => void;
}

const PlacesSection = ({
  selectedPlaces,
  onPlaceSelect,
}: PlacesSectionProps) => {
  return (
    <div className="mt-[31px]">
      <p className="text-body3 text-bk-70 mb-[13px]">어떤 곳을 방문하고 싶나요?</p>
      <div className="grid grid-cols-4 gap-x-[7px] gap-y-[11px] mb-[11px] ml-[-15px]">
        {chipOptions.slice(0, 4).map((option) => (
          <div key={option} onClick={() => onPlaceSelect(option)}>
            <Chip
              size="md"
              state={selectedPlaces[option] ? 'active' : 'inactive'}
            >
              {option}
            </Chip>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-x-[7px] gap-y-[11px] ml-[25px]">
        {chipOptions.slice(4).map((option) => (
          <div key={option} onClick={() => onPlaceSelect(option)}>
            <Chip
              size="md"
              state={selectedPlaces[option] ? 'active' : 'inactive'}
            >
              {option}
            </Chip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesSection;
