import { useRef, useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';

import MyMsgItem from '../../../components/chatting/MyMsgItem';
import OtherMsgItem from '../../../components/chatting/OtherMsgItem';
import Input from '../../../components/common/input';
import { Topbar } from '../../../layouts';
import { MsgItemType, sendingMsgFrame } from '../../../types/chatting';

import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state.courseId;
  const courseName = location.state.courseName;
  /* TOFIX: 임의로 설정 */
  const myId = 1;

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const dummyDate = new Date();

  const dummy: MsgItemType[] = [
    {
      senderId: 0,
      senderName: '박재욱',
      content: '하이하이이거어때',
      createdAt: dummyDate,
    },
    {
      senderId: 1,
      senderName: '정서현',
      content: '하이하이이거어때',
      createdAt: dummyDate,
    },
    {
      senderId: 2,
      senderName: '조하상',
      content: '안녕안녕',
      createdAt: dummyDate,
    },
    {
      senderId: 2,
      senderName: '조하상',
      content: '줄바꿈 기준을 글자수에서 width로 변경했습니다',
      createdAt: dummyDate,
    },
    {
      senderId: 1,
      senderName: '정서현',
      content: '네 알겠습니다 그럼 여기도 줄바꿈하겠죠?',
      createdAt: dummyDate,
    },
    {
      senderId: 3,
      senderName: '김경민',
      content: '와우~',
      createdAt: dummyDate,
    },
  ];

  const handleSendMsg = () => {
    const newMsg: sendingMsgFrame = {
      senderId: myId,
      content: inputValue,
    };
    console.log(newMsg);
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

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
        <div className="flex flex-col py-[11px]">
          {dummy.map((d, i) => {
            const isSameAsPrev = i > 0 && dummy[i - 1].senderId === d.senderId;
            return (
              <div
                key={uuid()}
                className={clsx(isSameAsPrev ? 'mt-[7px]' : 'mt-[15px]')}
              >
                {d.senderId === myId ? (
                  <MyMsgItem
                    text={d.content}
                    time={d.createdAt.toLocaleTimeString()}
                  />
                ) : (
                  <OtherMsgItem
                    key={uuid()}
                    isSameAsPrev={isSameAsPrev}
                    senderName={d.senderName}
                    senderProfileImg={d.senderProfileImg || ''}
                    text={d.content}
                    time={d.createdAt.toLocaleTimeString()}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
      <div className="max-w-full fixed left-[10px] right-[10px] bottom-[11px] flex flex-row gap-[6px] items-center">
        <Input
          ref={inputRef}
          size={'xl'}
          placeholder={'채팅을 입력하세요'}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <HiArrowUp
          className={clsx(
            'w-6 h-6',
            inputValue === '' ? 'text-bk-50' : 'text-sub-100',
          )}
          onClick={handleSendMsg}
        />
      </div>
    </div>
  );
};

export default Chat;
