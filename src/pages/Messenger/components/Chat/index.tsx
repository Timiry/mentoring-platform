import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import WebSocketService from '../../../../services/WebSocketService';
import { MessageData } from '../../../../types';
import * as Stomp from 'stompjs';
import ChatMessages from '../ChatMessages';
import ChatInput from '../ChatInput';
import { useParams } from 'react-router-dom';
import { communicationApi } from '../../../../api';
import chekTokens from '../../../../services/CheckTokens';
import ChatHeader from '../ChatHeader';

const Chat = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [input, setInput] = useState<string>('');

  const idFromToken = (token: string) => {
    return JSON.parse(atob(token.split('.')[1])).sub;
  }
  const currentUserId = Number(idFromToken(localStorage.accessToken));

  useEffect(() => {
    const connectToChat = async () => {
        if (!chatId) {
            return <div>Выберите чат из списка</div>; // Если не передан chatId
        }

        const chatExists = true // Проверка существования чата

        if (!chatExists) {
            alert('Чат не существует');
            return <div>Выберите чат из списка</div>;
        } else {
            chekTokens();
            const response = communicationApi.getChatMessages(chatId, 0, 20);
            response.then((result) => {
                if (result.status === 200){
                    const msgs = result.data.content.map( (msg: MessageData) => ({
                        ... msg,
                        sentAt: msg.sentAt.substring(11, 16),
                    }));
                    console.log(msgs);
                    setMessages(msgs.reverse());
                }
            })
            .catch((error) => console.log(error));
            WebSocketService.connect(chatId, localStorage.accessToken, handleMessage); // Подключаемся к чату
        }
    };

    connectToChat();

    return () => {
        WebSocketService.disconnect();
    };
  }, [chatId]);

  const handleMessage = (stompMessage: Stomp.Message) => {
    console.log("Received message from socket");
    const socketMessage = JSON.parse(stompMessage.body);
    console.log(socketMessage);
    const message = {
        senderId: socketMessage.body.userId,
        content: {
            message: socketMessage.body.message,
            fileUrl: socketMessage.body.attachmentUrl,
        },
        messageType: socketMessage.type == 'MESSAGE' ? 'SIMPLE_MESSAGE' : 'ATTACHMENT',
        sentAt: new Date().toLocaleTimeString().substring(0, 5),
    }
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSend = () => {
    if(chatId){
        if (input.trim()) {
            WebSocketService.sendMessage(chatId, input); // Отправьте сообщение через WebSocket
            setInput('');
        }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Предотвращаем переход на новую строку
        handleSend(); // Отправляем сообщение
    }
};

  return (
      <Box sx={{ 
            padding: 1,
            border: '1px solid #ccc', 
            borderRadius: '0 8px 8px 0',
            position: 'relative',
            flexGrow: 1
            }}
        >
          <ChatHeader></ChatHeader>
          <ChatMessages messages={messages} currentUserId={currentUserId} />
          <ChatInput
              input={input}
              setInput={setInput}
              handleSend={handleSend}
              handleKeyDown={handleKeyDown}
              chatId={chatId || ''}
          />
      </Box>
  );
};

export default Chat;