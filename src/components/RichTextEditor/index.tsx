import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box } from "@mui/material";

interface RichTextEditorProps {
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  editorState,
  onEditorStateChange,
}) => {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        minHeight: "200px",
        padding: "10px",
        "& .rdw-editor-toolbar": {
          backgroundColor: "#f5f5f5", // Цвет фона панели инструментов
          borderBottom: "1px solid #ddd",
        },
        "& .rdw-editor-main": {
          minHeight: "150px",
          padding: "10px",
        },
        "& .rdw-editor-toolbar button": {
          color: "#1976d2", // Цвет кнопок
        },
        "& .rdw-editor-toolbar button:hover": {
          backgroundColor: "#e0e0e0", // Цвет при наведении
        },
      }}
    >
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "link",
            "image",
            "history",
          ],
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
        }}
      />
    </Box>
  );
};

export default RichTextEditor;
