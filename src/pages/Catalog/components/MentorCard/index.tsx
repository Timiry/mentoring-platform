import { Box, Typography, Avatar, Chip, Dialog } from '@mui/material';
import { MentorDataToShow } from '../../../../types';
import { useState } from 'react';
import MentorDetail from '../MentorDetail';

interface MentorCardProps {
    mentor: MentorDataToShow;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {    
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box
            sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: 300,
                boxShadow: 2,
                margin: 1,
            }}
        >
            <Avatar
                alt={`${mentor.firstName || ''} ${mentor.lastName || ''}`}
                src={'https://mentorin-lab.ru' + mentor.avatarUrl || ''}
                sx={{ width: 100, height: 100, marginBottom: 2 }}
                onClick={handleOpen} 
            />
            <Typography variant="h6" component="div">
                {mentor.firstName || ''} {mentor.lastName || ''}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ marginBottom: 2 }}>
                {mentor.shortAboutMe}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {mentor.specializations.map((specialization, index) => (
                    <Chip key={index} label={specialization} sx={{ margin: 0.5 }} />
                ))}
            </Box>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth='desktop' >
                <MentorDetail mentor={mentor} />
            </Dialog>
        </Box>
    );
};

export default MentorCard;
