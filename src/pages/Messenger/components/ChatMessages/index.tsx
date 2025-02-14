import { Box } from "@mui/material";
import { MessageData } from "../../../../types";
import Message from "../Message";
import { useRef, useEffect } from "react";

interface ChatMessagesProps {
  messages: MessageData[];
  currentUserId: number;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  currentUserId,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Создаем реф для нижней части списка сообщений

  useEffect(() => {
    // Прокрутка к нижней части списка сообщений после обновления сообщений
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // Будет выполняться каждый раз при обновлении сообщений

  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 235px)",
        overflowY: "auto",
        marginTop: 8,
        "&::-webkit-scrollbar": {
          width: "4px", // Ширина полосы прокрутки
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc", // Цвет полосы прокрутки
          borderRadius: "5px", // Закругление углов полосы прокрутки
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555", // Цвет полосы прокрутки при наведении
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f1f1f1", // Цвет фона полосы прокрутки
        },
      }}
    >
      {messages.map((msg, index) => (
        <Message
          key={index}
          message={msg}
          isCurrentUser={msg.senderId === currentUserId}
        />
      ))}
      <div ref={messagesEndRef} /> {/* Элемент для прокрутки */}
    </Box>
  );
};

export default ChatMessages;
