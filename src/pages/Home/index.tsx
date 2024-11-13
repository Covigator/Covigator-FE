import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { fetchRecommendations } from '../../api/recommendation';
import Button from '../../components/common/button/Button';
import Chip from '../../components/common/chip/Chip';
import {
  DropdownItemType,
  LocationItemType,
} from '../../components/common/dropdown';
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationItemType>(
    locationOptions[0],
  );
  const [selectedCompanion, setSelectedCompanion] = useState<DropdownItemType>(
    withOptions[0],
  );
  const [selectedPlaces, setSelectedPlaces] = useState<Record<string, boolean>>(
    chipOptions.reduce((acc, option) => ({ ...acc, [option]: false }), {}),
  );
  const [showLocationDialog, setShowLocationDialog] = useState(false);

  const recommendMutation = useMutation(fetchRecommendations, {
    onSuccess: (data) => {
      navigate('/result', {
        state: {
          recommendResults: data,
          selectedDate,
          selectedLocation,
          selectedCompanion,
        },
      });
    },
    onError: (error) => {
      console.error('Failed to get recommendations:', error);
    },
  });

  const handleRecommendation = () => {
    if (isAllSelected) {
      const selectedPlaceTypes = Object.entries(selectedPlaces)
        .filter(([_, isSelected]) => isSelected)
        .map(([placeType]) => placeType);

      // radius 값 변환: km를 m로 변환 (0.3 -> 300)
      const radiusInMeters = (selectedLocation.radius || 0.5) * 1000;

      const requestData = {
        GUNGU: selectedLocation.text,
        LONGITUDE: Number(selectedLocation.lng) || 0,
        LATITUDE: Number(selectedLocation.lat) || 0,
        RADIUS: radiusInMeters, // 미터 단위로 변환된 값 사용
        AGE_GRP: '20~30',
        GENDER: '남',
        TRAVEL_STYL_1: '2',
        TRAVEL_STYL_2: '3',
        TRAVEL_STYL_3: '2',
        TRAVEL_STYL_4: '1',
        TRAVEL_STYL_5: '2',
        TRAVEL_STYL_6: '2',
        TRAVEL_STATUS_ACCOMPANY: selectedCompanion.text,
        VISIT_AREA_TYPE_CD: selectedPlaceTypes[0],
      };

      console.log('Sending Request Data:', requestData);

      recommendMutation.mutate(requestData, {
        onSuccess: (data) => {
          console.log('Recommendation Success Data:', data);

          if (Array.isArray(data) && data.length === 0) {
            alert(
              '선택하신 조건에 맞는 추천 결과를 찾지 못했습니다.\n다른 조건으로 다시 시도해보세요.',
            );
            return;
          }

          navigate('/result', {
            state: {
              recommendResults: data,
              selectedDate,
              selectedLocation,
              selectedCompanion,
            },
          });
        },
        onError: (error) => {
          console.error('Recommendation Error:', error);
          alert('추천 과정에서 오류가 발생했습니다. 다시 시도해주세요.');
        },
      });
    }
  };
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    console.log('날짜 변경 :', date);
  };

  const handleLocationSelect = (item: DropdownItemType) => {
    setSelectedLocation(item);
    if (item.id !== 0) {
      setShowLocationDialog(true);
    }
  };

  const handleLocationConfirm = (lat: number, lng: number, radius: number) => {
    setSelectedLocation({
      ...selectedLocation,
      lat,
      lng,
      radius,
    });
    setShowLocationDialog(false);
  };

  const handleCompanionSelect = (item: DropdownItemType) => {
    setSelectedCompanion(item);
  };

  const handlePlaceSelect = (place: string) => {
    setSelectedPlaces((prev) => ({ ...prev, [place]: !prev[place] }));
  };

  const handleCloseLocationDialog = () => {
    setShowLocationDialog(false);
  };

  // 전부 선택했는지
  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    const dateSelected = selectedDate !== null;
    const locationSelected = selectedLocation.id !== 0;
    const companionSelected = selectedCompanion.id !== 0;
    const placesSelected = Object.values(selectedPlaces).some(Boolean);

    const allSelected =
      dateSelected && locationSelected && companionSelected && placesSelected;

    setIsAllSelected(allSelected);
  }, [selectedDate, selectedLocation, selectedCompanion, selectedPlaces]);

  return (
    <div className="h-full w-full overflow-x-hidden">
      <div className="flex flex-col items-center mt-[55px]">
        <div className="flex flex-col items-start">
          <h1 className="text-h1 mb-[2px]">
            {localStorage.getItem('nickname')}님
          </h1>
          <h1 className="text-h1 mb-[6px]">코스를 추천해드릴게요!</h1>
          <p className="text-body3 text-bk-70 mb-[41px]">
            추천받고 싶은 코스에 대한 정보를 입력해주세요
          </p>
          <p className="text-body4 text-bk-70 mb-2">언제 방문할 예정인가요?</p>

          <SelectBox onChange={handleDateChange} />

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
                isHome={true}
              />
            </div>
          </div>
          <p className="text-body6 text-sub-300 mb-[23px]">
            * 여기를 누르면 지도에서 지역을 선택할 수 있어요
          </p>

          <p className="text-body4 text-bk-70">누구와 방문할 예정인가요?</p>

          <div className="mt-[7px] w-[280px]">
            <div className="w-full">
              <Dropdown
                dropdownItems={withOptions}
                size="lg"
                type="sub"
                onSelect={handleCompanionSelect}
                isHome={true}
              />
            </div>
          </div>

          <p className="text-body3 text-bk-70 mt-[31px] mb-[13px]">
            어떤 곳을 방문하고 싶나요?
          </p>
          <div className="grid grid-cols-4 gap-x-[7px] gap-y-[11px] mb-[11px] ml-[-15px]">
            {chipOptions.slice(0, 4).map((option) => (
              <div key={option} onClick={() => handlePlaceSelect(option)}>
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
              <div key={option} onClick={() => handlePlaceSelect(option)}>
                <Chip
                  size="md"
                  state={selectedPlaces[option] ? 'active' : 'inactive'}
                >
                  {option}
                </Chip>
              </div>
            ))}
          </div>
          <div className="mt-[52px] mb-[84px] w-[280px] h-[54px]">
            <Button
              size="lg"
              color={isAllSelected ? 'default' : 'disabled'}
              shape="square"
              className="w-full h-full text-btn1"
              onClick={handleRecommendation}
              disabled={recommendMutation.isLoading}
            >
              {recommendMutation.isLoading ? '추천 중...' : '추천받기'}
            </Button>
          </div>
        </div>
      </div>
      {showLocationDialog && selectedLocation.lat && selectedLocation.lng && (
        <LocationDialog
          lat={selectedLocation.lat}
          lng={selectedLocation.lng}
          onClose={handleCloseLocationDialog}
          onConfirm={handleLocationConfirm}
        />
      )}
    </div>
  );
};

export default Home;
