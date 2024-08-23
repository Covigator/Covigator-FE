export interface MsgItemProps {
  text: string;
  time: string;
}

export interface OtherMsgItemProps extends MsgItemProps {
  senderName: string;
  senderProfileImg: string;
  isSameAsPrev: boolean;
}

export type MsgItemType = {
  senderId: number;
  senderName: string;
  senderProfileImg?: string;
  content: string;
  createdAt: Date;
};

export type sendingMsgFrame = {
  senderId: number;
  content: string;
};
