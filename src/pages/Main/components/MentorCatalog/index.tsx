// src/components/MentorCatalog.tsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { MentorDataToShow } from '../../../../types';
import MentorCard from '../MentorCard';
import { mentorCatalogApi } from '../../../../api';
import CreateMentorDialog from '../../../BecomeMentor';
import chekTokens from '../../../../services/CheckTokens';

const MentorCatalog: React.FC = () => {
    const [mentors, setMentors] = useState<MentorDataToShow[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                chekTokens();
                const data = searchTerm.trim() !== "" ? await mentorCatalogApi.getMentorsBySpecialization(searchTerm) : await mentorCatalogApi.getAllMentors();
                setMentors(data.data.content);
            } catch (error) {
                console.error('Ошибка при загрузке менторов:', error);
            }
        };

        fetchMentors();
    }, [searchTerm]);

    return (
      <Box sx={{ padding: 2 }}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={3}>
        <Typography variant="h4">
            Каталог менторов
        </Typography>
        <Button sx={{ bgcolor: 'button.primary'}} variant='contained' onClick={() => setDialogOpen(true)}>Стать ментором</Button>
      </Box>
      
      <Box sx={{ marginBottom: 2 }}>
          <TextField
              label="Введите специализацию"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
      </Box>
      <Box 
          sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 2 
          }}
      >
          {mentors.map((mentor) => (
              <Box 
                  key={mentor.avatarUrl} 
                  sx={{ 
                      flex: '1 1 calc(33.33% - 16px)', // 3 колонки с учетом отступов
                      maxWidth: 'calc(33.33% - 16px)' 
                  }}
              >
                  <MentorCard mentor={mentor} />
              </Box>
          ))}
      </Box>
      <CreateMentorDialog open={dialogOpen} onClose={() => setDialogOpen(false)}/>
  </Box>
    );
};

export default MentorCatalog;