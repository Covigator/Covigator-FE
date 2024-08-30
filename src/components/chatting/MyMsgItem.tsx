import { MsgItemProps } from '../../types/chatting';
import { variants } from './OtherMsgItem';

import clsx from 'clsx';

const MyMsgItem = ({ text, time }: MsgItemProps) => {
  return (
    <div className="w-full inline-flex gap-1 justify-end items-end">
      <span className={variants.time}>{time}</span>
      <div
        className={clsx(variants.content, 'rounded-tr-none bg-sub-100 text-wh')}
      >
        {text}
      </div>
    </div>
  );
};

export default MyMsgItem;
