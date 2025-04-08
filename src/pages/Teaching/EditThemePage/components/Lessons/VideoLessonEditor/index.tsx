import React from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { VideoLesson } from "../../../../../../types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface VideoLessonEditorProps {
  lesson: VideoLesson;
  onChange: (updatedLesson: VideoLesson) => void;
  handleDeleteLesson: (lesson: VideoLesson) => void;
}

const VideoLessonEditor: React.FC<VideoLessonEditorProps> = ({
  lesson,
  onChange,
  handleDeleteLesson,
}) => {
  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...lesson, videoUrl: e.target.value });
  };

  return (
    <div>
      <Box display="flex" alignItems="center" mb={4}>
        <Typography variant="h5" mr={2}>
          Урок {lesson.ordinalNumber}: Видео
        </Typography>
        <IconButton onClick={() => handleDeleteLesson(lesson)}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <TextField
        label="URL видео"
        value={lesson.videoUrl}
        onChange={handleVideoUrlChange}
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

export default VideoLessonEditor;
