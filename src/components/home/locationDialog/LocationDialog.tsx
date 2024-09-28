import { useState } from 'react';

import { ReactComponent as RadioBtn_active } from '../../../assets/image/locationDialog/radioBtn_active.svg';
import { ReactComponent as RadioBtn_inactive } from '../../../assets/image/locationDialog/radioBtn_inactive.svg';
import Map from '../../../pages/Home/Map';
import Dialog from '../../common/dialog/Dialog';

interface LocationDialogProps {
  lat: number;
  lng: number;
  onClose: () => void;
  onConfirm: (lat: number, lng: number, radius: number) => void;
}

const LocationDialog = ({
  lat,
  lng,
  onClose,
  onConfirm,
}: LocationDialogProps) => {
  const [selectedRadius, setSelectedRadius] = useState<number>(1);

  const handleRadiusSelect = (radius: number) => {
    setSelectedRadius(radius);
  };

  const handleConfirm = () => {
    onConfirm(lat, lng, selectedRadius);
    onClose();
  };

  const RadioButton = ({ radius }: { radius: number }) => (
    <div
      className="flex gap-x-1 cursor-pointer"
      onClick={() => handleRadiusSelect(radius)}
    >
      <p className="text-body6 text-bk-70 whitespace-nowrap">
        반경 {Number.isInteger(radius) ? radius + 'km' : radius * 1000 + 'm'}
      </p>
      {selectedRadius === radius ? <RadioBtn_active /> : <RadioBtn_inactive />}
    </div>
  );

  const content = (
    <div className="flex flex-col items-center">
      <div className="flex gap-x-4 mb-[11px]">
        <RadioButton radius={0.3} />
        <RadioButton radius={0.5} />
        <RadioButton radius={1} />
      </div>
      <div className="w-[241px] h-[224px] flex-shrink-0">
        <Map lat={lat} lng={lng} radius={selectedRadius} />
      </div>
    </div>
  );

  return (
    <Dialog
      title="지역을 선택해주세요"
      subtitle={
        '원하는 반경을 선택 후\n지도에 직접 원하는 범위를 표시해주세요!'
      }
      content={content}
      onConfirm={handleConfirm}
      onCancel={onClose}
      confirmText="확인"
      cancelText="닫기"
      showSubtitle={true}
    />
  );
};

export default LocationDialog;
