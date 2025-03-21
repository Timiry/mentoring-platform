import React from "react";
import { TextField } from "@mui/material";
import { HtmlLesson } from "../../../../../../types";

interface HtmlLessonEditorProps {
  lesson: HtmlLesson;
  onChange: (updatedLesson: HtmlLesson) => void;
}

const HtmlLessonEditor: React.FC<HtmlLessonEditorProps> = ({
  lesson,
  onChange,
}) => {
  const handleHtmlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...lesson, html: e.target.value });
  };

  return (
    <div>
      <TextField
        label="Условие"
        value={lesson.html}
        onChange={handleHtmlChange}
        variant="outlined"
        fullWidth
        multiline
        rows={4}
      />
    </div>
  );
};

export default HtmlLessonEditor;
