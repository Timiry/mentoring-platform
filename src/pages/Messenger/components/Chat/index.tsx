import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import WebSocketService from '../../../../WebSocketService'; // Импортируйте свой WebSocketService
import { MessageData } from '../../../../types';
import * as Stomp from 'stompjs';
import ChatMessages from '../ChatMessages';
import ChatInput from '../ChatInput';
import { useParams } from 'react-router-dom';
import { communicationApi } from '../../../../api';

const Chat = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [input, setInput] = useState<string>('');
  const [attachment, setAttachment] = useState<File | null>(null);

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
            type: socketMessage.type == 'MESSAGE' ? 'SIMPLE_MESSAGE' : 'ATTACHMENT',
        },
        sentAt: new Date().toLocaleTimeString().substring(0, 5),
    }
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleSend = () => {
      if (input.trim() || attachment) {
          if(!chatId) return;
          WebSocketService.sendMessage(chatId, input); // Отправьте сообщение через WebSocket
          setInput('');
          setAttachment(null);
      }
  };

//   const handleSend = () => {
//       if (input.trim() || attachment) {
//           //WebSocketService.sendMessage(chatId, input); // Отправьте сообщение через WebSocket
//           const message = {
//             type: attachment ? 'ATTACHMENT' : 'MESSAGE',
//             body: {
//               userId: '2',
//               message: input || chatId,
//               attachmentUrl: null,
//             },
//           };
//           setMessages((prevMessages) => [...prevMessages, message]);
//           setInput('');
//           setAttachment(null);
//       }
//   };



  return (
      <Box sx={{ 
            padding: 1,
            border: '1px solid #ccc', 
            borderRadius: '0 8px 8px 0',
            position: 'relative',
            flexGrow: 1
            }}
        >
          <ChatMessages messages={messages} currentUserId={currentUserId} />
          <ChatInput
              input={input}
              setInput={setInput}
              attachment={attachment}
              setAttachment={setAttachment}
              handleSend={handleSend}
          />
      </Box>
  );
};

export default Chat;