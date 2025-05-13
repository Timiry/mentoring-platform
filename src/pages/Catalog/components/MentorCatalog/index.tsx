import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { MentorDataToShow } from "../../../../types";
import MentorCard from "../MentorCard";
import { mentorCatalogApi } from "../../../../api";

const MentorCatalog: React.FC = () => {
  const [mentors, setMentors] = useState<MentorDataToShow[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const data =
          searchTerm.trim() !== ""
            ? await mentorCatalogApi.getMentorsBySpecialization(searchTerm)
            : await mentorCatalogApi.getAllMentors();
        setMentors(data.data.content);
      } catch (error) {
        console.error("Ошибка при загрузке менторов:", error);
      }
    };

    fetchMentors();
  }, [searchTerm]);

  return (
    <Box sx={{ padding: 2, mb: 8 }}>
      <Typography variant="h4" mb={3}>
        Каталог менторов
      </Typography>

      <Box sx={{ marginBottom: 2 }}>
        <TextField
          label="Введите специализацию для поиска"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {mentors.map((mentor) => (
          <Box
            key={mentor.avatarUrl}
            sx={{
              width: "calc(33.33% - 16px)",
            }}
          >
            <MentorCard mentor={mentor} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MentorCatalog;
