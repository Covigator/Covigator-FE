import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { IoMdHeartEmpty } from 'react-icons/io';
import { WiDaySunny } from 'react-icons/wi';
import { useNavigate } from 'react-router-dom';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';

import { LocationType } from '../../../types/location';
import Chip from '../../common/chip';

interface CoursePreviewProps {
  date: string;
  place: string;
  weather: string;
  companions: string;
  locations: LocationType[];
  isExpanded: boolean;
  onExpand: (expanded: boolean) => void;
}

const CoursePreview = ({
  date,
  place,
  weather,
  companions,
  locations,
  isExpanded,
  onExpand,
}: CoursePreviewProps) => {
  const navigate = useNavigate();

  const toggleExpanded = () => {
    onExpand(!isExpanded);
  };

  return (
    <div
      className={`w-full bg-white rounded-b-[20px] mt-[60px] pl-[22px] pr-[15px] pb-4 ${
        isExpanded ? 'z-10 relative' : ''
      }`}
    >
      <div className="flex justify-between">
        <h2 className="text-h2 text-bk-90 mb-4">
          {localStorage.getItem('nickname')}님, 이 코스는 어때요?
        </h2>
        <IoMdHeartEmpty className="w-6 h-6 text-bk-90" />
      </div>
      <div className="flex items-center gap-x-2 mb-[13px]">
        <WiDaySunny className="w-6 h-6 text-bk-90" />
        <span className="text-body4 text-bk-90">
          {date} {place}은
          <span className="text-body3 text-sub-400"> {weather} 예정</span>
          이에요
        </span>
      </div>
      <div className="flex items-center gap-x-2 mb-[15px]">
        <HiOutlineUserGroup className="w-6 h-6 text-bk-90" />
        <span className="text-body4 text-bk-90">
          {date} {place}은
          <span className="text-body3 text-sub-400"> {companions} 예정</span>
          이에요
        </span>
      </div>
      <Timeline
        sx={{
          ['& .MuiTimelineItem-root:before']: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {locations.map((location, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  width: '10px',
                  height: '10px',
                  bgcolor: location.isSelected ? '#F174A3' : '#F5C6D1',
                  boxShadow: 'none',
                  margin: 0,
                }}
              />
              {index !== locations.length - 1 && (
                <TimelineConnector
                  sx={{
                    width: '2px',
                    height: '17px',
                    marginY: '5px',
                    bgcolor: '#F7D8E0',
                  }}
                />
              )}
            </TimelineSeparator>
            <TimelineContent sx={{ py: 0, px: 2, ml: 0 }}>
              <div className="flex flex-col">
                <p
                  className={`text-body3 ${
                    location.isSelected ? 'text-bk-90 font-bold' : 'text-bk-60'
                  }`}
                >
                  {location.name}
                </p>
                {isExpanded && (
                  <div
                    className="mt-2 box-border flex gap-x-[11px] cursor-pointer"
                    onClick={() => navigate(`/result/${location.id}`)}
                  >
                    {location.image && (
                      <div className="w-[75px] h-[75px] mb-2 overflow-hidden rounded-md border border-bk-20">
                        <img
                          src={location.image}
                          alt={location.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-y-[12px]">
                      <div className="flex gap-x-[7px]">
                        <Chip size="sm" state="active">
                          {location.courseType}
                        </Chip>
                        <p
                          className={`text-body3 ${
                            location.isSelected
                              ? 'text-bk-90 font-bold'
                              : 'text-bk-60'
                          }`}
                        >
                          {location.name}
                        </p>
                      </div>

                      {location.description && (
                        <p
                          className={`text-body5 ${
                            location.isSelected
                              ? 'text-bk-90 font-bold'
                              : 'text-bk-60'
                          }`}
                        >
                          {location.description}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      {isExpanded && (
        <div className="text-btn3 text-bk-60 mt-[3px]">
          장소를 선택하면 상세 정보를 확인할 수 있어요
        </div>
      )}
      <button
        onClick={toggleExpanded}
        className="w-full flex justify-center items-center text-bk-90 mt-4"
      >
        {isExpanded ? (
          <HiOutlineChevronDoubleUp className="w-6 h-6" />
        ) : (
          <HiOutlineChevronDoubleDown className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default CoursePreview;
