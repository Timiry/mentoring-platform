import { Box, Button } from "@mui/material";

interface SavePanelProps {
  handleSave: () => void;
}
const SavePanel: React.FC<SavePanelProps> = ({ handleSave }) => {
  return (
    <Box
      sx={{
        // width: "100%",
        //height: "50px",
        padding: 1,
        backgroundColor: "#F0F0F0",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "end",
        position: "fixed",
        left: "0",
        right: "0",
        bottom: "0",
      }}
    >
      <Button
        variant="contained"
        onClick={handleSave}
        sx={{ mr: "calc((100vw - 250px)/10)" }}
      >
        Сохранить
      </Button>
    </Box>
  );
};

export default SavePanel;
