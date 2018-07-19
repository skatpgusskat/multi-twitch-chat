declare type ChatSocketCallback = (chat: Chat) => void;

// "@badges=broadcaster/1,subscriber/0,sub-gifter/1"
// "color=#0070CC"
// "display-name=남세"
// "emotes="
// "id=ad06c37b-a4e4-4044-af05-b446cbd3bdeb"
// "subscriber=1"
// "tmi-sent-ts=1532015592493"
// "turbo=0"
// "user-id=59680156"
// "user-type= :namse_!namse_@namse_.tmi.twitch.tv "
// "emote-only=1"

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
      const username = this.extractData(headers, 'display-name');
      const color = this.extractData(headers, 'color');

      console.log(data, username, headers);
      callback({
        username,
        content,
        color,
      });
    };
  }
  extractData(headers: string[], key: string): string {
    const data = headers.find(header => header.indexOf(key) === 0);
    if (!data) {
      return '';
    }
    return data.substring(`${key}=`.length);
  }
}
