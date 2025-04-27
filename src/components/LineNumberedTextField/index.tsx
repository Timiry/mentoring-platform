import React from "react";
import { Box, TextField } from "@mui/material";

interface LineNumberedTextFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minLines?: number;
}

const LineNumberedTextField: React.FC<LineNumberedTextFieldProps> = ({
  value,
  onChange,
  minLines = 1,
}) => {
  const lineCount = Math.max(minLines, value.split("\n").length);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {/* Блок с номерами строк */}
      <Box
        sx={{
          padding: "4px 8px",
          border: "1px solid rgba(0, 0, 0, 0.23)",
          borderTopLeftRadius: "4px",
          borderBottomLeftRadius: "4px",
          color: "#999999",
          fontFamily: "monospace",
          lineHeight: "1.5",
          overflow: "hidden",
          whiteSpace: "pre",
          textAlign: "right",
        }}
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </Box>

      {/* Текстовое поле без лейбла и эффектов фокуса */}
      <TextField
        value={value}
        onChange={onChange}
        variant="outlined"
        fullWidth
        multiline
        rows={lineCount}
        sx={{
          "& .MuiInputBase-root": {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            padding: "5px 14px",
            alignItems: "flex-start",
            "&:hover": {
              "& fieldset": {
                borderColor: "rgba(0, 0, 0, 0.23)",
              },
            },
            "&.Mui-focused": {
              boxShadow: "none",
              "& fieldset": {
                borderColor: "rgba(0, 0, 0, 0.23)",
                borderWidth: "1px",
              },
            },
          },
          "& textarea": {
            fontFamily: "monospace",
            lineHeight: "1.5",
          },
          "& fieldset": {
            borderLeft: "none",
          },
          width: "100%",
        }}
        InputProps={{
          disableUnderline: true,
        }}
      />
    </Box>
  );
};

export default LineNumberedTextField;
