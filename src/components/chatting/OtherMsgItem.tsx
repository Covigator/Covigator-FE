import { MsgItemProps } from '../../types/chatting';

const OtherMsgItem = ({ text, time }: MsgItemProps) => {
  return (
    <div className="inline-flex gap-1 justify-start items-end">
      <div className="max-w-48 rounded-[20px] rounded-tl-none px-[13px] py-2 bg-bk-30 text-bk-90 text-body5 whitespace-pre-line">
        {text}
      </div>
      <span className="text-bk-90 font-pretendard font-light text-[8px]">
        {time}
      </span>
    </div>
  );
};

export default OtherMsgItem;
