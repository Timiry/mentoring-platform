// src/components/MentorDetail.tsx
import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import { MentorDataToShow } from '../../../../types';
import { communicationApi } from '../../../../api';
import { useNavigate } from 'react-router-dom';
import chekTokens from '../../../../services/CheckTokens';

interface MentorDetailProps {
    mentor: MentorDataToShow
}

const MentorDetail: React.FC<MentorDetailProps> = ({ mentor }) => {

    const navigate = useNavigate();

    const openChat = async (userId: number) => {
        try {
            chekTokens();
            // Получаем все чаты текущего пользователя
            const response = await communicationApi.getUserChats();
            
            if (response.status === 200) {
                console.log(response);
                const chats = response.data;
                let chatFound = false;
    
                for (const chat of chats) {
                    // Проверяем, есть ли потенциальный собеседник в участниках чата
                    const members = chat.members;
                    if (members.includes(userId)) {
                        console.log("Нашелся же", chat.chatId);
                        navigate(`/messenger/${chat.chatId}`);  // Если участник найден, отображаем этот чат
                        chatFound = true;
                        break; // Выходим из цикла, так как чат найден
                    }
                }
    
                // Если не нашли чат, создаем новый
                if (!chatFound) {
                    chekTokens();
                    const responseCreate = await communicationApi.createChat();
                    if (responseCreate.status === 200) {
                        const chatId = responseCreate.data.chatId;
                        console.log("Создан чат с id: ", chatId);
                        
                        const responseInvite = await communicationApi.inviteUserToChat(chatId, userId);
                        if (responseInvite.status === 200) {
                            console.log("В чат с id: ", chatId, " добавлен юзер ", userId);
                            navigate(`/messenger/${chatId}`);
                        } else {
                            console.log("Ошибка при добавлении юзера в чат", responseInvite);
                        }
                    } else {
                        console.log("Ошибка при создании чата", responseCreate);
                    }
                }
            }
        } catch (error) {
            console.log("Ошибка:", error);
        }
    };

    
    return (
        <Box sx={{ padding: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 3 }}>
                <Avatar src={'http://89.104.71.252:8080' + mentor.avatarUrl} alt={`${mentor.firstName} ${mentor.lastName}`} sx={{ width: 100, height: 100, marginRight: 2 }} />
                <Box>
                    <Typography variant="h5">{`${mentor.firstName} ${mentor.lastName}`}</Typography>
                    <Typography variant="subtitle1">@{mentor.username}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        Специализации: {mentor.specializations.join(', ')}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary">
                        Количество студентов: {mentor.studentsCount}
                    </Typography> */}
                </Box>
            </Box>
            <Typography variant="h6">Краткая информация:</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {mentor.shortAboutMe}
            </Typography>
            <Typography variant="h6">Подробная информация:</Typography>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {mentor.longAboutMe}
            </Typography>
            <Button 
                variant="contained" 
                sx={{ bgcolor: 'button.primary'}} 
                onClick={() => openChat(mentor.userId)}
            >
                Написать
            </Button>
        </Box>
    );
};

export default MentorDetail;