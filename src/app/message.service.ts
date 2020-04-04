import { Injectable } from '@angular/core';


declare var SockJS;
declare var Stomp;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
    this.initializeWebSocketConnection();
  }

  public stompClient;
  public msg = [];

  private initializeWebSocketConnection(): void {
    const serverUrl = 'http://localhost:8080/gs-guide-websocket';
    const ws = new SockJS(serverUrl);

    this.stompClient = Stomp.over(ws);

    const that = this;

    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/topic', (message) => {
        console.log("Incoming message!")
        console.log(message.body);
        if (message.body) {
          that.msg.push(message.body);
        }
      });
    });
  }

  sendMessage(message: string): void {
    this.stompClient.send('/app/hello', {}, message);
  }
}
