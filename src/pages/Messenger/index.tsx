import { useState, useEffect } from "react";
//import { communicationApi } from "../../api";
import MainLayout from "../../components/layout/Main";
import { ChatData } from "../../types";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { communicationApi, userApi } from "../../api";

const MessengerPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [chats, setChats] = useState<ChatData[]>([]); // Замените any на ваш тип чатов
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUserId = Number(JSON.parse(atob(localStorage.accessToken.split('.')[1])).sub);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const userChats = await communicationApi.getUserChats();
        const chatDataPromises = userChats.data.map(async (chat: { chatId: string; members: number[] }) => {
          const userId = chat.members.find(id => id !== currentUserId);
          if (userId) {
            const user = await userApi.getUsers([userId])
            return {
              id: chat.chatId,
              avatarUrl: user.data.photoUrl,
              firstName: user.data.firstName,
              lastName: user.data.lastName,
            } as ChatData;
          }
          return null; // Если нет подходящего участника, возвращаем null
        });

        const chatData = await Promise.all(chatDataPromises);
        setChats(chatData.filter((chat: ChatData): chat is ChatData => chat !== null)); // Фильтруем null значения
      } catch (err) {
        setError('Ошибка при загрузке чатов');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, []);

  if (loading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  
  

  const handleChatSelect = (chatId: string) => {
    navigate(`/messenger/${chatId}`);
  };



  return (
    <MainLayout>
      <Box sx={{ display: 'flex', height: `calc(100vh - 80px)`}}>
        <ChatList chats={chats} onChatSelect={handleChatSelect} />
        {chatId ? (<Chat />) : (
          <Box sx={{ 
            padding: 1,
            border: '1px solid #ccc', 
            borderRadius: '0 8px 8px 0',
            position: 'relative',
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            }}
          >
            <Typography variant="B7Regular" color="text.secondary">Выберите чат для начала общения</Typography>
          </Box>)}
      </Box>
    </MainLayout>
  );
}

export default MessengerPage;
