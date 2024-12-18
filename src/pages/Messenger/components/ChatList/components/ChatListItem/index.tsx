import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

interface ChatListItemProps {
    id: string,
    avatarUrl: string; // URL для аватара собеседника
    firstName: string; // Имя собеседника
    lastName: string; // Фамилия собеседника
    onClick: () => void; // Функция для обработки клика
}

const ChatListItem: React.FC<ChatListItemProps> = ({ id, avatarUrl, firstName, lastName, onClick }) => {
    const { chatId } = useParams<{ chatId: string }>();
    return (
        <ListItem 
            component={Box} 
            onClick={onClick} 
            style={{ cursor: 'pointer', backgroundColor: chatId == id ? "#CFE9D1" : '#FFFFFF'}}>
            <ListItemAvatar>
                <Avatar src={avatarUrl} alt={`${firstName} ${lastName}`} />
            </ListItemAvatar>
            <ListItemText primary={`${firstName} ${lastName}`} />
        </ListItem>
    );
};

export default ChatListItem;
