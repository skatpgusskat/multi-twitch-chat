declare type Chat = {
  username: string;
  content: string;
  // TODO : timestamp, 구독티콘
}

declare type Channel = {
  channelName: string;
  chats: Chat[];
}

declare type ChannelMap = { [channelName: string]: Channel };