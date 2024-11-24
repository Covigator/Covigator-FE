import Button from '../../components/common/button/Button';
import { DropdownItemType } from '../../components/common/dropdown';
import { createRecommendationRequest } from './utils';
import { useHomeState, useRecommendation } from './hooks';
import DateSection from './components/DateSection';
import LocationSection from './components/LocationSection';
import CompanionSection from './components/CompanionSection';
import PlacesSection from './components/PlacesSection';

const Home = () => {
  const {
    selectedDate,
    setSelectedDate,
    selectedLocation,
    setSelectedLocation,
    selectedCompanion,
    setSelectedCompanion,
    selectedPlaces,
    setSelectedPlaces,
    showLocationDialog,
    setShowLocationDialog,
    isAllSelected
  } = useHomeState();

  const recommendMutation = useRecommendation();

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

  const handleRecommendation = () => {
    if (isAllSelected) {
      const requestData = createRecommendationRequest(
        selectedLocation,
        selectedCompanion,
        selectedPlaces
      );

      console.log('Sending Request Data:', requestData);
      recommendMutation.mutate({
        ...requestData,
        selectedDate,
        selectedLocation,
        selectedCompanion,
      }, {
        onSuccess: (data) => {
          if (Array.isArray(data) && data.length === 0) {
            alert('선택하신 조건에 맞는 추천 결과를 찾지 못했습니다.\n다른 조건으로 다시 시도해보세요.');
            return;
          }
        }
      });
    }
  };

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

          <DateSection onDateChange={handleDateChange} />

            <LocationSection
              selectedLocation={selectedLocation}
              showLocationDialog={showLocationDialog}
              onLocationSelect={handleLocationSelect}
              onLocationConfirm={handleLocationConfirm}
              onCloseLocationDialog={handleCloseLocationDialog}
            />

            <CompanionSection onCompanionSelect={handleCompanionSelect} />

          <PlacesSection
            selectedPlaces={selectedPlaces}
            onPlaceSelect={handlePlaceSelect}
          />

          <div className="mt-[52px] mb-[84px] w-[280px] h-[54px]">
            <Button
              size="lg"
              color={isAllSelected ? 'default' : 'disabled'}
              shape="square"
              className="w-full h-full text-btn1"
              onClick={handleRecommendation}
              disabled={!isAllSelected || recommendMutation.isLoading}
            >
              {recommendMutation.isLoading ? '추천 중...' : '코스 추천받기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
