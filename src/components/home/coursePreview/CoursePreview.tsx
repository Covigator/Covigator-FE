import { useState } from 'react';
import {
  HiOutlineChevronDoubleDown,
  HiOutlineChevronDoubleUp,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { IoMdHeartEmpty } from 'react-icons/io';
import { WiDaySunny } from 'react-icons/wi';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';

import { v4 as uuid } from 'uuid';

interface Location {
  name: string;
  isSelected: boolean;
}

interface CoursePreviewProps {
  date: string;
  weather: string;
  companions: string;
  locations: Location[];
}

const CoursePreview = ({
  date,
  weather,
  companions,
  locations,
}: CoursePreviewProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full bg-white rounded-b-[20px] mt-[60px] pl-[22px] pr-[15px]">
      <div className="flex justify-between">
        <h2 className="text-h2 text-bk-90 mb-4">박재욱님, 이 코스는 어때요?</h2>
        <IoMdHeartEmpty className="w-6 h-6 text-bk-90" />
      </div>
      <div className="flex items-center gap-x-2 mb-[13px]">
        <WiDaySunny className="w-6 h-6 text-bk-90" />
        <span className="text-body4 text-bk-90">
          {date} 성수역은
          <span className="text-body3 text-sub-400"> {weather} 예정</span>
          이에요
        </span>
      </div>
      <div className="flex items-center gap-x-2 mb-[15px]">
        <HiOutlineUserGroup className="w-6 h-6 text-bk-90" />
        <span className="text-body4 text-bk-90">
          {date} 성수역은
          <span className="text-body3 text-sub-400"> {companions} 예정</span>
          이에요
        </span>
      </div>
      <Timeline
        sx={{
          [`& .MuiTimelineItem-root`]: {
            minHeight: 'auto',
          },
          [`& .MuiTimelineItem-root:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {locations.slice(0, locations.length).map((location, index) => (
          <TimelineItem key={uuid()}>
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
            <TimelineContent
              sx={{
                marginLeft: '13px',
                padding: '0px',
                height: '10px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '17px',
              }}
            >
              <p
                className={`text-body3 ${location.isSelected ? 'text-bk-90' : 'text-bk-60'}`}
              >
                {location.name}
              </p>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-center items-center text-bk-90"
      >
        {isExpanded ? (
          <HiOutlineChevronDoubleUp />
        ) : (
          <HiOutlineChevronDoubleDown />
        )}
      </button>
    </div>
  );
};

export default CoursePreview;
