import React from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { MultiTestLesson } from "../../../../../../types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface MultiTestLessonEditorProps {
  lesson: MultiTestLesson;
  onChange: (updatedLesson: MultiTestLesson) => void;
  handleDeleteLesson: (lesson: MultiTestLesson) => void;
}

const MultiTestLessonEditor: React.FC<MultiTestLessonEditorProps> = ({
  lesson,
  onChange,
  handleDeleteLesson,
}) => {
  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...lesson, condition: e.target.value });
  };

  const handleCorrectAnswersChange = (index: number, value: string) => {
    const updatedAnswers = [...lesson.correctAnswers];
    updatedAnswers[index] = value;
    onChange({ ...lesson, correctAnswers: updatedAnswers });
  };

  const handlePossibleAnswersChange = (index: number, value: string) => {
    const updatedAnswers = [...lesson.possibleAnswers];
    updatedAnswers[index] = value;
    onChange({ ...lesson, possibleAnswers: updatedAnswers });
  };

  return (
    <div>
      <Box display="flex" alignItems="center" mb={4}>
        <Typography variant="h5" mr={2}>
          Урок {lesson.ordinalNumber}: Множественный тест
        </Typography>
        <IconButton onClick={() => handleDeleteLesson(lesson)}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <TextField
        label="Условие"
        value={lesson.condition}
        onChange={handleConditionChange}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
      />
      {lesson.possibleAnswers.map((answer, index) => (
        <TextField
          key={index}
          label={`Ответ ${index + 1}`}
          value={answer}
          onChange={(e) => handlePossibleAnswersChange(index, e.target.value)}
          variant="outlined"
          fullWidth
        />
      ))}
      {lesson.correctAnswers.map((answer, index) => (
        <TextField
          key={index}
          label={`Правильный ответ ${index + 1}`}
          value={answer}
          onChange={(e) => handleCorrectAnswersChange(index, e.target.value)}
          variant="outlined"
          fullWidth
        />
      ))}
    </div>
  );
};

export default MultiTestLessonEditor;
