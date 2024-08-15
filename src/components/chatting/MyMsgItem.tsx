import { MsgItemProps } from '../../types/chatting';

const MyMsgItem = ({ text, time }: MsgItemProps) => {
  return (
    <div className="inline-flex gap-1 justify-end items-end">
      <span className="text-bk-90 font-pretendard font-light text-[8px]">
        {time}
      </span>
      <div className="rounded-[20px] rounded-tr-none px-[13px] py-2 bg-sub-100 text-wh text-body5">
        {text}
      </div>
    </div>
  );
};

export default MyMsgItem;
