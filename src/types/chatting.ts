export interface MsgItemProps {
  text: string;
  time: string;
}

export interface OtherMsgItemProps extends MsgItemProps {
  senderName: string;
  senderProfileImg: string;
  isSameAsPrev: boolean;
}

export type ChatMessageResponse = {
  nickname: string;
  timestamp: string;
  message: string;
  profileImageUrl: string;
  memberId: number;
};

export type ChatLogResponse = {
  myId: number;
  chat: ChatMessageResponse[];
};
