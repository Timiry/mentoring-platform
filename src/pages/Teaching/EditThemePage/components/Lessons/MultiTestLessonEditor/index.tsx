import React from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Button,
  Checkbox,
} from "@mui/material";
import { MultiTestLesson } from "../../../../../../types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddIcon from "@mui/icons-material/Add";

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

  const handleAnswerToggle = (index: number) => {
    const answer = lesson.possibleAnswers[index];
    const isCurrentlyCorrect = lesson.correctAnswers.includes(answer);

    let updatedCorrectAnswers;
    if (isCurrentlyCorrect) {
      updatedCorrectAnswers = lesson.correctAnswers.filter((a) => a !== answer);
    } else {
      updatedCorrectAnswers = [...lesson.correctAnswers, answer];
    }

    onChange({
      ...lesson,
      correctAnswers: updatedCorrectAnswers,
    });
  };

  const handlePossibleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...lesson.possibleAnswers];
    const oldValue = updatedAnswers[index];
    updatedAnswers[index] = value;

    // Обновляем correctAnswers если изменяемый ответ был правильным
    const updatedCorrectAnswers = lesson.correctAnswers.includes(oldValue)
      ? lesson.correctAnswers.map((a) => (a === oldValue ? value : a))
      : lesson.correctAnswers;

    onChange({
      ...lesson,
      possibleAnswers: updatedAnswers,
      correctAnswers: updatedCorrectAnswers,
    });
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
      const answerToRemove = lesson.possibleAnswers[index];
      const updatedAnswers = lesson.possibleAnswers.filter(
        (_, i) => i !== index
      );

      // Удаляем ответ из correctAnswers если он там был
      const updatedCorrectAnswers = lesson.correctAnswers.filter(
        (a) => a !== answerToRemove
      );

      onChange({
        ...lesson,
        possibleAnswers: updatedAnswers,
        correctAnswers: updatedCorrectAnswers,
      });
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <Typography variant="h5" mr={2}>
          Урок {lesson.ordinalNumber}: Множественный тест
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
        Варианты ответов (отметьте правильные):
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
          <Checkbox
            checked={lesson.correctAnswers.includes(answer)}
            onChange={() => handleAnswerToggle(index)}
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
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
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
        sx={{ mt: 1, color: "button.primary", borderColor: "button.primary" }}
      >
        Добавить вариант ответа
      </Button>
    </Box>
  );
};

export default MultiTestLessonEditor;
