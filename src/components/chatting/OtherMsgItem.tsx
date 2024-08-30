import { OtherMsgItemProps } from '../../types/chatting';

import clsx from 'clsx';

export const variants = {
  container: 'w-full inline-flex gap-2 justify-start items-start',
  textContainer: 'flex flex-col gap-[7px] mt-[6px]',
  content:
    'max-w-48 rounded-[20px] px-[13px] py-2 text-body5 whitespace-pre-line break-all',
  time: 'text-bk-90 font-pretendard font-light text-[8px]',
};

const OtherMsgItem = ({
  senderName,
  senderProfileImg,
  text,
  time,
  isSameAsPrev,
}: OtherMsgItemProps) => {
  return (
    <div className={variants.container}>
      <img
        src={senderProfileImg}
        className={clsx(
          'w-[37px] h-[37px] rounded-full',
          !senderProfileImg && 'bg-bk-40',
          isSameAsPrev && 'invisible',
        )}
      />
      <div className={variants.textContainer}>
        {!isSameAsPrev && (
          <span className="text-bk-90 text-body6">{senderName}</span>
        )}
        <div className="flex items-end gap-1">
          <div
            className={clsx(
              variants.content,
              'rounded-tl-none bg-bk-30 text-bk-90',
            )}
          >
            {text}
          </div>
          <span className={variants.time}>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default OtherMsgItem;
