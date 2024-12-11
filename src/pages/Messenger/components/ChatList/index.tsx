import React from 'react';
import { List } from '@mui/material';
import ChatListItem from './components/ChatListItem'; // Импортируйте компонент ChatListItem

interface ChatListProps {
    chats: { id: string; avatarUrl: string; firstName: string; lastName: string }[]; // Тип для чатов
    onChatSelect: (chatId: string) => void; // Функция для обработки выбора чата
}

const ChatList: React.FC<ChatListProps> = ({ chats, onChatSelect }) => {
    return (
        <List sx={{ 
            width: '280px', 
            flexGrow: 0,
            border: '1px solid #ccc', 
            borderRadius: '8px 0 0 8px',
            overflowY: 'auto', // Позволяет прокручивать содержимое
            maxHeight: 'calc(100vh - 80px)', // Высота видимой части страницы за вычетом высоты хедера
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
        }}>
            {chats.map((chat) => (
                <ChatListItem
                    key={chat.id}
                    avatarUrl={chat.avatarUrl}
                    firstName={chat.firstName}
                    lastName={chat.lastName}
                    onClick={() => onChatSelect(chat.id)} // Передаем id чата при клике
                />
            ))}
        </List>
    );
};

export default ChatList;