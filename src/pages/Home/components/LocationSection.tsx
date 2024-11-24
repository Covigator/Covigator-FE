import { DropdownItemType, LocationItemType } from '../../../components/common/dropdown';
import Dropdown from '../../../components/common/dropdown/Dropdown';
import LocationDialog from '../../../components/home/locationDialog/LocationDialog';
import { locationOptions } from '../../../constants/homeOption';

interface LocationSectionProps {
  selectedLocation: LocationItemType;
  showLocationDialog: boolean;
  onLocationSelect: (item: DropdownItemType) => void;
  onLocationConfirm: (lat: number, lng: number, radius: number) => void;
  onCloseLocationDialog: () => void;
}

const LocationSection = ({
  selectedLocation,
  showLocationDialog,
  onLocationSelect,
  onLocationConfirm,
  onCloseLocationDialog,
}: LocationSectionProps) => {
  return (
    <div className='mt-[31px]'>
      <p className="text-body4 text-bk-70">어디를 방문할 예정인가요?</p>
      <div className="my-[7px] w-[280px]">
        <div className="w-full">
          <Dropdown
            dropdownItems={locationOptions}
            size="lg"
            type="sub"
            onSelect={onLocationSelect}
            isHome={true}
          />
        </div>
      </div>
      <p className="text-body6 text-sub-300">
        * 여기를 누르면 지도에서 지역을 선택할 수 있어요
      </p>
      {showLocationDialog && selectedLocation.lat && selectedLocation.lng && (
        <LocationDialog
          lat={selectedLocation.lat}
          lng={selectedLocation.lng}
          onClose={onCloseLocationDialog}
          onConfirm={onLocationConfirm}
        />
      )}
    </div>
  );
};

export default LocationSection;
