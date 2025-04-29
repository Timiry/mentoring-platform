import React from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Button,
  Radio,
} from "@mui/material";
import { TestLesson } from "../../../../../../types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddIcon from "@mui/icons-material/Add";

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

  const handleAnswerChange = (index: number) => {
    if (index >= 0 && index < lesson.possibleAnswers.length) {
      onChange({
        ...lesson,
        answer: lesson.possibleAnswers[index],
      });
    }
  };

  const handlePossibleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...lesson.possibleAnswers];
    updatedAnswers[index] = value;

    const updatedLesson = {
      ...lesson,
      possibleAnswers: updatedAnswers,
    };

    // Если редактируем правильный ответ, обновляем и его
    if (lesson.answer === lesson.possibleAnswers[index]) {
      updatedLesson.answer = value;
    }

    onChange(updatedLesson);
  };

  const addAnswer = () => {
    const newAnswer = "";
    const updatedAnswers = [...lesson.possibleAnswers, newAnswer];
    onChange({
      ...lesson,
      possibleAnswers: updatedAnswers,
    });
  };

  const removeAnswer = (index: number) => {
    if (lesson.possibleAnswers.length > 2) {
      const updatedAnswers = lesson.possibleAnswers.filter(
        (_, i) => i !== index
      );
      const updatedLesson = {
        ...lesson,
        possibleAnswers: updatedAnswers,
      };

      // Если удаляем правильный ответ, сбрасываем выбор
      if (lesson.answer === lesson.possibleAnswers[index]) {
        updatedLesson.answer = updatedLesson.possibleAnswers[0];
      }

      onChange(updatedLesson);
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <Typography variant="h5" mr={2}>
          Урок {lesson.ordinalNumber}: Тест
        </Typography>
        <IconButton onClick={() => handleDeleteLesson(lesson)}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>

      <TextField
        label="Условие вопроса"
        value={lesson.condition}
        onChange={handleConditionChange}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 3 }}
      />

      <Typography variant="subtitle1" gutterBottom>
        Варианты ответов:
      </Typography>

      {lesson.possibleAnswers.map((answer, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            gap: 1,
            border: "1px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "4px",
          }}
        >
          <Radio
            checked={lesson.answer === answer}
            onChange={() => handleAnswerChange(index)}
          />

          <TextField
            value={answer}
            onChange={(e) => handlePossibleAnswerChange(index, e.target.value)}
            variant="outlined"
            fullWidth
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Убираем границу
                },
                "&:hover fieldset": {
                  border: "none", // Убираем границу при наведении
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Убираем границу при фокусе
                },
              },
            }}
          />

          <IconButton onClick={() => removeAnswer(index)} sx={{ ml: 1 }}>
            <CloseOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={addAnswer}
        sx={{ mt: 1 }}
      >
        Добавить вариант ответа
      </Button>
    </Box>
  );
};

export default TestLessonEditor;
