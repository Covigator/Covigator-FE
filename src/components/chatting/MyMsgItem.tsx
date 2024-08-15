export type MyMsgItemProps = {
  text: string;
  time: string;
};

const MyMsgItem = ({ text, time }: MyMsgItemProps) => {
  return (
    <div className="inline-flex gap-1 justify-end items-end">
      <span className="text-bk-90 font-pretendard font-light text-[8px]">
        {time}
      </span>
      <div className="rounded-[20px] rounded-tr-none px-[13px] py-2 bg-bk-30 text-bk-90 text-body5">
        {text}
      </div>
    </div>
  );
};

export default MyMsgItem;
