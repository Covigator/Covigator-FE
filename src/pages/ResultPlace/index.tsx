import { useParams, useNavigate } from 'react-router-dom';

import Chip from '../../components/common/chip';
import CourseItem from '../../components/community/CourseItem';
import { locations } from '../../constants/location';
import { Topbar } from '../../layouts';
import Map from '../Home/Map';

const ResultPlace = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();
  const location = locations.find((loc) => loc.id === Number(placeId));

  if (!location) {
    alert('장소를 찾을 수 없습니다!');
    navigate('/result');
    return;
  }

  return (
    <div className="h-full w-full overflow-x-hidden">
      <Topbar handleClick={() => navigate('/result')} />

      <div className="mx-[30px] flex flex-col">
        <div className="mt-[63px] flex gap-x-[11px] items-center">
          <div className="text-h1">{location.name}</div>
          <Chip size="sm" state="active">
            {location.courseType}
          </Chip>
        </div>
        <div className="mt-[7px] text-body6 text-bk-80">
          {location.description}
        </div>

        <div className="mt-[8px] w-full h-[114px]">
          <Map lat={location.lat} lng={location.lng} />
        </div>

        <img
          src={location.image}
          alt={location.name}
          className="w-full h-[200px] object-cover mt-[20px]"
        />

        <div className="mt-[26px] text-body3 text-bk-80">
          이 장소가 마음에 드시나요?
        </div>
        <div className="mt-[2px] text-body6 text-bk-80">
          관련된 코스를 둘러보세요
        </div>

        <div className="mt-[9px]">
          {/* 임시로 생성 */}
          <CourseItem
            id={location.id}
            title={'성수동 데이트'}
            caption={'성수동에서 감각있는 장소들을 모아놓은 코스입니다'}
            rate={4.5}
            isLike={false}
          ></CourseItem>
        </div>
      </div>
    </div>
  );
};

export default ResultPlace;
