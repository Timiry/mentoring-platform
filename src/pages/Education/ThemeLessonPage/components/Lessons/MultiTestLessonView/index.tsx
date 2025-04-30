import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { MultiTestLesson } from "../../../../../../types";

interface MultiTestLessonViewProps {
  lesson: MultiTestLesson;
}

const MultiTestLessonView: React.FC<MultiTestLessonViewProps> = ({
  lesson,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerToggle = (answer: string) => {
    setSelectedAnswers((prev) =>
      prev.includes(answer)
        ? prev.filter((a) => a !== answer)
        : [...prev, answer]
    );
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // onSubmit(selectedAnswers);
  };

  return (
    <Box>
      <Typography
        variant="body1"
        paragraph
        sx={{
          whiteSpace: "pre-line",
          mb: 4,
          backgroundColor: "rgba(0, 0, 0, 0.02)",
          borderRadius: 1,
        }}
      >
        {lesson.condition}
      </Typography>

      <Box sx={{ mb: 4 }}>
        {lesson.possibleAnswers.map((answer, index) => (
          <Box
            key={index}
            sx={{
              mb: 1,
              p: 2,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 1,
              transition: "all 0.2s ease",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedAnswers.includes(answer)}
                  onChange={() => handleAnswerToggle(answer)}
                  color="success"
                />
              }
              label={<Typography variant="body1">{answer}</Typography>}
              sx={{ width: "100%", m: 0 }}
            />
          </Box>
        ))}
      </Box>

      {isSubmitted && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Ваши ответы отправлены на проверку
        </Alert>
      )}

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={isSubmitted || selectedAnswers.length === 0}
        sx={{ bgcolor: "button.primary" }}
      >
        {isSubmitted ? "Ответ отправлен" : "Отправить ответ"}
      </Button>
    </Box>
  );
};

export default MultiTestLessonView;
