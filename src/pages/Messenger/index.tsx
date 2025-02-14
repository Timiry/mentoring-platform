import { useState, useEffect } from "react";
import MainLayout from "../../components/layout/Main";
import { ChatData } from "../../types";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { communicationApi } from "../../api";
import chekTokens from "../../services/CheckTokens";
import { AccountData } from "../../types";

const MessengerPage = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const [chats, setChats] = useState<ChatData[]>([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUserId = Number(
    JSON.parse(atob(localStorage.accessToken.split(".")[1])).sub
  );

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        chekTokens();
        const userChats = await communicationApi.getUserChats();

        const chatDataPromises = userChats.data.content.map(
          async (chat: { chatId: string; members: number[] }) => {
            const members = await communicationApi.getChatUsers(chat.chatId);
            const member = members.data.content.find(
              (m: AccountData) => m.id !== currentUserId
            );

            if (member) {
              return {
                id: chat.chatId,
                avatarUrl: member.photoUrl,
                firstName: member.firstName,
                lastName: member.lastName,
              } as ChatData;
            }
            return null; // Если нет подходящего участника, возвращаем null
          }
        );

        const chatData = await Promise.all(chatDataPromises);
        setChats(
          chatData.filter((chat: ChatData): chat is ChatData => chat !== null)
        ); // Фильтруем null значения
      } catch (err) {
        setError("Ошибка при загрузке чатов");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, [chatId, currentUserId]);

  if (loading)
    return (
      <MainLayout>
        <Box sx={{ display: "flex", height: `calc(100vh - 80px)` }}>
          <Typography>Загрузка...</Typography>
        </Box>
      </MainLayout>
    );
  if (loading)
    return (
      <MainLayout>
        <Box sx={{ display: "flex", height: `calc(100vh - 80px)` }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </MainLayout>
    );

  const handleChatSelect = (chatId: string) => {
    navigate(`/messenger/${chatId}`);
  };

  return (
    <MainLayout>
      <Box sx={{ display: "flex", height: `calc(100vh - 80px)` }}>
        <ChatList chats={chats} onChatSelect={handleChatSelect} />
        {chatId ? (
          <Chat />
        ) : (
          <Box
            sx={{
              padding: 1,
              border: "1px solid #ccc",
              borderRadius: "0 8px 8px 0",
              position: "relative",
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="B7Regular" color="text.secondary">
              Выберите чат для начала общения
            </Typography>
          </Box>
        )}
      </Box>
    </MainLayout>
  );
};

export default MessengerPage;
