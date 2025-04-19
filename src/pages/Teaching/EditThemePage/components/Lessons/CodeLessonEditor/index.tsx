import React from "react";
import { Box, IconButton, TextField, Typography, Button } from "@mui/material";
import { CodeLesson } from "../../../../../../types";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddIcon from "@mui/icons-material/Add";
import LineNumberedTextField from "../../../../../../components/LineNumberedTextField";

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

  const handleAddTest = () => {
    const newTest = { input: "", output: "" };
    onChange({
      ...lesson,
      codeTests: [...lesson.codeTests, newTest],
    });
  };

  const handleDeleteTest = (index: number) => {
    const updatedCodeTests = lesson.codeTests.filter((_, i) => i !== index);
    onChange({
      ...lesson,
      codeTests: updatedCodeTests,
    });
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
        <Box key={index} sx={{ marginBottom: "15px", position: "relative" }}>
          <Typography sx={{ marginBottom: "15px", display: "inline" }}>
            Тест № {index + 1}
          </Typography>
          <IconButton
            onClick={() => handleDeleteTest(index)}
            sx={{ display: "inline" }}
          >
            <CloseOutlinedIcon fontSize="small" />
          </IconButton>
          <Box display={"flex"} mb="20px">
            <Typography width="70px">Ввод</Typography>
            <LineNumberedTextField
              value={test.input}
              onChange={(e) =>
                handleCodeTestsChange(index, "input", e.target.value)
              }
              minLines={1}
            />
          </Box>
          <Box display={"flex"}>
            <Typography width="70px">Вывод</Typography>
            <LineNumberedTextField
              value={test.output}
              onChange={(e) =>
                handleCodeTestsChange(index, "output", e.target.value)
              }
              minLines={1}
            />
          </Box>
        </Box>
      ))}
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleAddTest}
        sx={{ mt: 2 }}
      >
        Добавить тест
      </Button>
    </Box>
  );
};

export default CodeLessonEditor;
