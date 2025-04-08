import React from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { TestLesson } from "../../../../../../types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface TestLessonEditorProps {
  lesson: TestLesson;
  onChange: (updatedLesson: TestLesson) => void;
  handleDeleteLesson: (lesson: TestLesson) => void;
}

const TestLessonEditor: React.FC<TestLessonEditorProps> = ({
  lesson,
  onChange,
  handleDeleteLesson,
}) => {
  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...lesson, condition: e.target.value });
  };

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...lesson, answer: e.target.value });
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
          Урок {lesson.ordinalNumber}: Тест
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
      <TextField
        label="Правильный ответ"
        value={lesson.answer}
        onChange={handleAnswerChange}
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

export default TestLessonEditor;
