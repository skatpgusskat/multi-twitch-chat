declare type ChatSocketCallback = (chat: Chat) => void;

export default class ChatSocket {
  ws = new WebSocket('ws://irc-ws.chat.twitch.tv');
  nick = 'justinfan13113 '; //all lowercase
  auth = 'kappa'; //include oauth:xxxx

  constructor(channelName: string, callback: ChatSocketCallback) {
    this.ws.onopen = () => {
      this.ws.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership');
      this.ws.send('PASS ' + this.auth);
      this.ws.send('NICK ' + this.nick);
      this.ws.send('JOIN #' + channelName);
    };

    // reply to ping
    this.ws.onmessage = (event) => {
      const data: string = event.data;
      if (data.lastIndexOf('PING', 0) === 0) {
        this.ws.send('PONG :tmi.twitch.tv');
        console.log('PONG Sent\r\n');
        return;
      }

      const indexOfPRIVMSG = data.indexOf('PRIVMSG');
      if (indexOfPRIVMSG < 0) {
        return;
      }
      const headers = data.substring(0, indexOfPRIVMSG).split(';');
      const content = data.substring(data.indexOf(':', indexOfPRIVMSG) + 1);
      const displayName = headers.find(header => header.indexOf('display-name') === 0);
      if (!displayName) {
        return;
      }
      const username = displayName.substring('display-name='.length);
      console.log(username, content);
      callback({
        username,
        content,
      });
    };
  }
}
