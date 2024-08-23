import { useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';

import Input from '../../../components/common/input';
import { Topbar } from '../../../layouts';
import { MsgItemType } from '../../../types/chatting';

import clsx from 'clsx';

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state.courseId;
  const courseName = location.state.courseName;

  const [inputValue, setInputValue] = useState<string>('');

  const dummy: MsgItemType[] = [];

  return (
    <div className="w-full h-full pt-[60px] px-[20px]">
      <Topbar handleClick={() => navigate(`/course/${courseId}`)}>
        <span className="ml-[14px] text-h4 text-bk-90">
          {courseName} 채팅방
        </span>
      </Topbar>
      {dummy.length === 0 ? (
        <div className="mt-[265px] flex justify-center text-body2 text-bk-60">
          {courseName} 코스에 대해서
          <br />
          다른 유저들과 채팅해보세요
        </div>
      ) : (
        <></>
      )}
      <div className="max-w-full fixed left-[10px] right-[10px] bottom-[11px] flex flex-row gap-[6px] items-center">
        <Input
          size={'xl'}
          placeholder={'채팅을 입력하세요'}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <HiArrowUp
          className={clsx(
            'w-6 h-6',
            inputValue === '' ? 'text-bk-50' : 'text-sub-100',
          )}
        />
      </div>
    </div>
  );
};

export default Chat;
