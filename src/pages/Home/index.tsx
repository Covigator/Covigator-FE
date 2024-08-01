import { useState } from 'react';
import { useNavigate } from 'react-router';

import Button from '../../components/common/button/Button';
import Chip from '../../components/common/chip/Chip';
import { DropdownItemType } from '../../components/common/dropdown';
import Dropdown from '../../components/common/dropdown/Dropdown';
import LocationDialog from '../../components/home/locationDialog/LocationDialog';
import SelectBox from '../../components/home/selectBox/SelectBox';
import {
  locationOptions,
  withOptions,
  chipOptions,
} from '../../constants/homeOption';

const Home = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<DropdownItemType>(
    locationOptions[0],
  );
  const [showLocationDialog, setShowLocationDialog] = useState(false);

  const handleLocationSelect = (item: DropdownItemType) => {
    setSelectedLocation(item);
    if (item.id !== 0) {
      setShowLocationDialog(true);
    }
  };

  const handleCloseLocationDialog = () => {
    setShowLocationDialog(false);
  };

  return (
    <div className="h-full w-full overflow-x-hidden">
      <div className="flex flex-col items-center mt-[55px]">
        <div className="flex flex-col items-start">
          <h1 className="text-h1 mb-[2px]">박재욱님</h1>
          <h1 className="text-h1 mb-[6px]">코스를 추천해드릴게요!</h1>
          <p className="text-body3 text-bk-70 mb-[41px]">
            추천받고 싶은 코스에 대한 정보를 입력해주세요
          </p>
          <p className="text-body4 text-bk-70 mb-2">언제 방문할 예정인가요?</p>

          <SelectBox />

          <p className="text-body4 text-bk-70 mt-[31px]">
            어디를 방문할 예정인가요?
          </p>
          <div className="my-[7px] w-[280px]">
            <div className="w-full">
              <Dropdown
                dropdownItems={locationOptions}
                size="lg"
                type="sub"
                onSelect={handleLocationSelect}
              />
            </div>
          </div>
          <p className="text-body6 text-sub-300 mb-[23px]">
            * 여기를 누르면 지도에서 지역을 선택할 수 있어요
          </p>

          <p className="text-body4 text-bk-70">누구와 방문할 예정인가요?</p>

          <div className="mt-[7px] w-[280px]">
            <div className="w-full">
              <Dropdown dropdownItems={withOptions} size="lg" type="sub" />
            </div>
          </div>

          <p className="text-body3 mt-[31px] mb-3">
            어떤 곳을 방문하고 싶나요?
          </p>
          <div className="grid grid-cols-3 gap-x-[27px] gap-y-[11px]">
            {chipOptions.map((option, index) => (
              <Chip key={index} size="md" state="inactive">
                {option}
              </Chip>
            ))}
          </div>
          <div className="mt-[52px] mb-[84px] w-[280px] h-[54px]">
            <Button
              size="lg"
              color="disabled"
              shape="square"
              className="w-full h-full text-btn1"
            >
              추천받기
            </Button>
          </div>
        </div>
      </div>
      {showLocationDialog && selectedLocation.lat && selectedLocation.lng && (
        <LocationDialog
          lat={selectedLocation.lat}
          lng={selectedLocation.lng}
          onClose={handleCloseLocationDialog}
        />
      )}
    </div>
  );
};

export default Home;
