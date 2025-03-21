import React from "react";
import { TextField } from "@mui/material";
import { TestLesson } from "../../../../../../types";

interface TestLessonEditorProps {
  lesson: TestLesson;
  onChange: (updatedLesson: TestLesson) => void;
}

const TestLessonEditor: React.FC<TestLessonEditorProps> = ({
  lesson,
  onChange,
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
