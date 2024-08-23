export interface MsgItemProps {
  text: string;
  time: string;
}

export interface OtherMsgItemProps extends MsgItemProps {
  senderName: string;
  senderProfileImg: string;
}

export type MsgItemType = {
  senderId: number;
  senderName: string;
  senderProfileImg?: string;
  content: string;
  createdAt: Date;
};
