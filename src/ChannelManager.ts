import ChatSocket from '@/ChatSocket';

export default class ChannelManager {
  channels: Channel[] = [];
  constructor() {

  }
  addChannel(channelName: string) {
    const channel = {
      channelName,
      chats: [],
    };
    this.channels.push(channel);
    new ChatSocket(channelName, (chat) => {
      channel.chats.push(chat);
    });
  }
}