import { useEffect } from 'react';
import {
  HiOutlineUserGroup,
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
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

  useEffect(() => {
    console.log('locations : ', locations);
  }, []);

  return (
    <div
      className={`w-full bg-white rounded-b-[20px] mt-[60px] pl-[22px] pr-[15px] pb-4 ${isExpanded ? 'z-10 relative shadow-lg' : ''}`}
    >
      <div className="flex justify-between items-start pt-4">
        <h2 className="text-h2 text-bk-90 mb-4">
          {localStorage.getItem('nickname')}님, 이 코스는 어때요?
        </h2>
        <button className="p-2 hover:bg-bk-10 rounded-full transition-colors">
          <IoMdHeartEmpty className="w-6 h-6 text-bk-90" />
        </button>
      </div>

      <div className="flex flex-col gap-y-3 mb-6">
        <div className="flex items-center gap-x-2">
          <div className="p-1 rounded-full bg-bk-10">
            <WiDaySunny className="w-6 h-6 text-sub-400" />
          </div>
          <span className="text-body4 text-bk-90">
            {date} {place}은
            <span className="text-body3 text-sub-400 font-semibold">
              {' '}
              {weather} 예정
            </span>
            이에요
          </span>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="p-1 rounded-full bg-bk-10">
            <HiOutlineUserGroup className="w-6 h-6 text-sub-400" />
          </div>
          <span className="text-body4 text-bk-90">
            {date} {place}은
            <span className="text-body3 text-sub-400 font-semibold">
              {' '}
              {companions} 예정
            </span>
            이에요
          </span>
        </div>
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
                  width: '12px',
                  height: '12px',
                  bgcolor: location.isSelected ? '#F174A3' : '#F5C6D1',
                  boxShadow: 'none',
                  margin: 0,
                  transition: 'all 0.2s ease',
                }}
              />
              {index !== locations.length - 1 && (
                <TimelineConnector
                  sx={{
                    width: '2px',
                    height: '20px',
                    marginY: '6px',
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
                  } cursor-pointer hover:text-sub-400 transition-colors`}
                >
                  {location.name}
                </p>

                {isExpanded && (
                  <div
                    className="mt-3 p-3 bg-bk-10 rounded-lg cursor-pointer hover:bg-bk-20 transition-all"
                    onClick={() => navigate(`/result/${location.id}`)}
                  >
                    <div className="flex gap-x-4">
                      <div className="w-[80px] h-[80px] flex-shrink-0 overflow-hidden rounded-md bg-bk-30" />
                      <div className="flex flex-col gap-y-2">
                        <div>
                          <Chip size="sm" state="active">
                            {location.courseType}
                          </Chip>
                        </div>
                        <p className="text-body5 text-bk-70">
                          업데이트 예정입니다
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      {isExpanded && (
        <div className="text-btn3 text-bk-60 mt-4 text-center">
          장소를 선택하면 상세 정보를 확인할 수 있어요
        </div>
      )}

      <button
        onClick={toggleExpanded}
        className="w-full flex justify-center items-center text-bk-90 mt-4 p-2 hover:bg-bk-10 rounded-lg transition-colors"
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
