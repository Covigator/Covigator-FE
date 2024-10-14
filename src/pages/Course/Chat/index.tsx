import { useEffect, useRef, useState } from 'react';
import { HiArrowUp } from 'react-icons/hi';
import { useLocation, useNavigate } from 'react-router-dom';

import { CompatClient, Stomp } from '@stomp/stompjs';

import MyMsgItem from '../../../components/chatting/MyMsgItem';
import OtherMsgItem from '../../../components/chatting/OtherMsgItem';
import Input from '../../../components/common/input';
import { useChatLog } from '../../../hooks/api/useCourse';
import { Topbar } from '../../../layouts';
import { ChatMessageResponse } from '../../../types/chatting';
import { formatLocalDateTime } from '../../../utils/common';

import clsx from 'clsx';
import SockJS from 'sockjs-client';
import { v4 as uuid } from 'uuid';

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state.courseId;
  const courseName = location.state.courseName;
  const stompClient = useRef<CompatClient | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const { data } = useChatLog(courseId);
  const [myId, setMyId] = useState<number>();

  const [chatData, setChatData] = useState<ChatMessageResponse[]>([]);

  useEffect(() => {
    if (data) {
      setChatData(data.chat);
      setMyId(data.myId);
    }
  }, [data]);

  const handleSendMsg = () => {
    if (stompClient.current) {
      stompClient.current.send(
        `/app/chat/${courseId}`,
        {},
        JSON.stringify({
          message: inputValue,
        }),
      );
    }
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  // 웹소켓 연결 설정
  const connect = () => {
    const socket = new SockJS(`${import.meta.env.VITE_API_BASE_URL}/ws-chat`);
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect(
      { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
      () => {
        if (stompClient.current) {
          stompClient.current.subscribe(`/topic/chat/${courseId}`, (res) => {
            const jsonRes: ChatMessageResponse = JSON.parse(res.body);
            const newMsg: ChatMessageResponse = {
              nickname: jsonRes.nickname,
              time: jsonRes.time,
              message: jsonRes.message,
              profileImageUrl: jsonRes.profileImageUrl,
              memberId: jsonRes.memberId,
            };
            setChatData((prev) => [...prev, newMsg]);
          });
        }
      },
      (error: unknown) => {
        console.error('웹소켓 연결 실패: ', error);
      },
    );
  };

  // 웹소켓 연결 해제
  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.disconnect();
    }
  };

  // 채팅방 아이디 변경 시마다 연결 설정
  useEffect(() => {
    connect();
    return () => disconnect();
  }, []);

  return (
    <div className="w-full h-full pt-[60px] px-[20px]">
      <Topbar
        handleClick={() =>
          navigate(`/course/${courseId}`, { state: location.pathname })
        }
      >
        <span className="ml-[14px] text-h4 text-bk-90">
          {courseName} 채팅방
        </span>
      </Topbar>
      {chatData && chatData.length === 0 ? (
        <div className="mt-[265px] flex flex-col justify-center items-center text-body2 text-bk-60">
          <p>{courseName} 코스에 대해서</p>
          {/* <br /> */}
          <p>다른 유저들과 채팅해보세요</p>
        </div>
      ) : (
        <div className="flex flex-col py-[11px]">
          {chatData &&
            chatData.map((d, i) => {
              const isSameAsPrev =
                i > 0 && chatData[i - 1].memberId === d.memberId;
              return (
                <div
                  key={uuid()}
                  className={clsx(isSameAsPrev ? 'mt-[7px]' : 'mt-[15px]')}
                >
                  {d.memberId === myId ? (
                    <MyMsgItem
                      text={d.message}
                      time={formatLocalDateTime(d.time)}
                    />
                  ) : (
                    <OtherMsgItem
                      key={uuid()}
                      isSameAsPrev={isSameAsPrev}
                      senderName={d.nickname}
                      senderProfileImg={d.profileImageUrl || ''}
                      text={d.message}
                      time={formatLocalDateTime(d.time)}
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
