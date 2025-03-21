import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { CodeLesson } from "../../../../../../types";

interface CodeLessonEditorProps {
  lesson: CodeLesson;
  onChange: (updatedLesson: CodeLesson) => void;
}

const CodeLessonEditor: React.FC<CodeLessonEditorProps> = ({
  lesson,
  onChange,
}) => {
  const handleConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...lesson, condition: e.target.value });
  };

  const handleCodeTestsChange = (
    index: number,
    field: "input" | "output",
    value: string
  ) => {
    const updatedCodeTests = lesson.codeTests.map((test, i) =>
      i === index ? { ...test, [field]: value } : test
    );
    onChange({ ...lesson, codeTests: updatedCodeTests });
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
        sx={{ marginBottom: "25px" }}
      />
      {lesson.codeTests.map((test, index) => (
        <Box key={index} sx={{ marginBottom: "15px" }}>
          <Typography sx={{ marginBottom: "15px" }}>
            Тест № {index + 1}
          </Typography>
          <TextField
            label="Ввод"
            value={test.input}
            onChange={(e) =>
              handleCodeTestsChange(index, "input", e.target.value)
            }
            variant="outlined"
            fullWidth
            sx={{ margin: "0 0 25px 25px" }}
          />
          <TextField
            label="Вывод"
            value={test.output}
            onChange={(e) =>
              handleCodeTestsChange(index, "output", e.target.value)
            }
            variant="outlined"
            fullWidth
            sx={{ margin: "0 0 25px 25px" }}
          />
        </Box>
      ))}
    </div>
  );
};

export default CodeLessonEditor;
