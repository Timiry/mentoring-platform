import React from "react";
import { TextField } from "@mui/material";
import { VideoLesson } from "../../../../../../types";

interface VideoLessonEditorProps {
  lesson: VideoLesson;
  onChange: (updatedLesson: VideoLesson) => void;
}

const VideoLessonEditor: React.FC<VideoLessonEditorProps> = ({
  lesson,
  onChange,
}) => {
  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...lesson, videoUrl: e.target.value });
  };

  return (
    <div>
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
