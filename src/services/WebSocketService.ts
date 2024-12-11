import * as Stomp from 'stompjs';
import { communicationApi } from '../api';
import chekTokens from './CheckTokens';

class WebSocketService {
    private stompClient: Stomp.Client | null = null;
    private token: string | null = null;
    private subscriptions: { [key: string]: Stomp.Subscription | undefined } = {}; // Хранение подписок

    public connect(chatId: string, jwtToken: string, callback: (message: Stomp.Message) => void): void {
        this.token = 'Bearer ' + jwtToken;
        const socket = new window.SockJS('http://localhost:8080/ws/chat?token=' + this.token);
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect({ 'Authorization': this.token }, (frame) => {
            console.log('Connected: ' + frame);
            if (!this.subscriptions[chatId]) {
                this.subscriptions[chatId] = this.stompClient?.subscribe(`/topic/chat/${chatId}`, callback);
            }
            console.log(`Joined chat: ${chatId}`);
        }, (error) => {
            console.error('Error connecting to WebSocket:', error);
        });
    }

    public createChat(jwtToken: string, callback: (message: Stomp.Message) => void, userId: number) {
        chekTokens();
        const responseCreate = communicationApi.createChat();
        responseCreate.then ((result) => {
            if (result.status == 200) {
                console.log(result);
                this.connect(result.data.chatId, jwtToken, callback);
                const responseInvite = communicationApi.inviteUserToChat(result.data.chatId, userId);
                responseInvite.then ((result) => {
                    if (result.status == 200) {
                        console.log(result);
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    public sendMessage(chatId: string, messageContent: string): void {
        if (this.stompClient && this.stompClient.connected &&  messageContent.trim()) {
            const message = {
                "content": messageContent,
            };
            this.stompClient.send(`/app/${chatId}/chat.sendMessage`, {}, JSON.stringify(message));
        }
    }

    public disconnect(): void {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.disconnect(() => {
                console.log('Disconnected');
                this.subscriptions = {}; // Очистка подписок при отключении
            });
        }
    }
}

export default new WebSocketService();