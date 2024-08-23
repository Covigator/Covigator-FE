export type MsgItemProps = {
  text: string;
  time: string;
};

export type MsgItemType = {
  senderId: number;
  sender: string;
  senderProfileImg?: string;
  content: string;
  createdAt: Date;
};
