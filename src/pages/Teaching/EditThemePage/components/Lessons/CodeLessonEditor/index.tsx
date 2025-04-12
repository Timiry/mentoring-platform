import React from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { CodeLesson } from "../../../../../../types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface CodeLessonEditorProps {
  lesson: CodeLesson;
  onChange: (updatedLesson: CodeLesson) => void;
  handleDeleteLesson: (lesson: CodeLesson) => void;
}

const CodeLessonEditor: React.FC<CodeLessonEditorProps> = ({
  lesson,
  onChange,
  handleDeleteLesson,
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
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <Typography variant="h5" mr={2}>
          Урок {lesson.ordinalNumber}: Программирование
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
            sx={{ marginBottom: "25px" }}
          />
          <TextField
            label="Вывод"
            value={test.output}
            onChange={(e) =>
              handleCodeTestsChange(index, "output", e.target.value)
            }
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "25px" }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CodeLessonEditor;
