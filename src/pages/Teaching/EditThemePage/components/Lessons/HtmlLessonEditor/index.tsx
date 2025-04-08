import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { HtmlLesson } from "../../../../../../types";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertFromHTML, convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface HtmlLessonEditorProps {
  lesson: HtmlLesson;
  onChange: (updatedLesson: HtmlLesson) => void;
  handleDeleteLesson: (lesson: HtmlLesson) => void;
}

const HtmlLessonEditor: React.FC<HtmlLessonEditorProps> = ({
  lesson,
  onChange,
  handleDeleteLesson,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(convertFromHTML(lesson.html))
  );

  const handleHtmlChange = (editorState: EditorState) => {
    setEditorState(editorState);
    onChange({
      ...lesson,
      html: convertToHTML(editorState.getCurrentContent()),
    });
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <Typography variant="h5" mr={2}>
          Урок {lesson.ordinalNumber}: Текст
        </Typography>
        <IconButton onClick={() => handleDeleteLesson(lesson)}>
          <CloseOutlinedIcon />
        </IconButton>
      </Box>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleHtmlChange}
      />
      <div
        dangerouslySetInnerHTML={{
          __html: convertToHTML(editorState.getCurrentContent()),
        }}
      ></div>
    </Box>
  );
};

export default HtmlLessonEditor;
