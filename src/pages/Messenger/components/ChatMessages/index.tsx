import { Box } from "@mui/material";
import { MessageData } from "../../../../types";
import Message from "../Message";


interface ChatMessagesProps {
  messages: MessageData[];
  currentUserId: number;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, currentUserId }) => {
  return (
      <Box sx={{ 
        maxHeight: 'calc(100vh - 168px)', 
        overflowY: 'auto', 
        marginBottom: 2,
        '&::-webkit-scrollbar': {
            width: '4px', // Ширина полосы прокрутки
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc', // Цвет полосы прокрутки
            borderRadius: '5px', // Закругление углов полосы прокрутки
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555', // Цвет полосы прокрутки при наведении
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1', // Цвет фона полосы прокрутки
        },
        }}
      >
          {messages.map((msg, index) => (
              <Message key={index} message={msg} isCurrentUser={msg.senderId === currentUserId} />
          ))}
      </Box>
  );
};

export default ChatMessages;