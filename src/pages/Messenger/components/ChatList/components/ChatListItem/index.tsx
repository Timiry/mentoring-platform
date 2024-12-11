import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Box } from '@mui/material';

interface ChatListItemProps {
    avatarUrl: string; // URL для аватара собеседника
    firstName: string; // Имя собеседника
    lastName: string; // Фамилия собеседника
    onClick: () => void; // Функция для обработки клика
}

const ChatListItem: React.FC<ChatListItemProps> = ({ avatarUrl, firstName, lastName, onClick }) => {
    return (
        <ListItem component={Box} onClick={onClick}>
            <ListItemAvatar>
                <Avatar src={'http://localhost:8080' + avatarUrl} alt={`${firstName} ${lastName}`} />
            </ListItemAvatar>
            <ListItemText primary={`${firstName} ${lastName}`} />
        </ListItem>
    );
};

export default ChatListItem;