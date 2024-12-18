import { ListItem, ListItemAvatar, Avatar, ListItemText, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import chekTokens from '../../../../services/CheckTokens';
import { communicationApi } from '../../../../api';
import { useParams } from 'react-router-dom';
import { AccountData } from '../../../../types';


const ChatHeader = () => {
    const { chatId } = useParams<{ chatId: string }>();
    const [member, setMember] = useState<AccountData>();
    
    useEffect(() => {
        const fetchUserData = async () => {
            chekTokens();
            if (!chatId) return;
            const members = await communicationApi.getChatUsers(chatId);
            const currentUserId = Number(JSON.parse(atob(localStorage.accessToken.split('.')[1])).sub);
            const member = members.data.content.find((m: AccountData) => m.id !== currentUserId);
            setMember(member);
        };

        fetchUserData();
    }, [chatId]);

    return (
        <Box
            sx={{
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                //p: '4px',
                backgroundColor: '#fff', // Фон для инпута
                borderRadius: '0 8px 0 0',
                borderBottom: '1px solid #ccc', 
            }}
        >
            {member ? (<ListItem component={Box}>
                <ListItemAvatar>
                    <Avatar src={ member.photoUrl || '' } alt={`${member.firstName} ${member.lastName}`} />
                </ListItemAvatar>
                <ListItemText primary={`${member.firstName} ${member.lastName}`} />
            </ListItem>) : (<></>)}
        </Box>
    );
};

export default ChatHeader;