import { Box, Typography, Avatar, Chip, Dialog } from "@mui/material";
import { MentorDataToShow } from "../../../../types";
import { useState } from "react";
import MentorDetail from "../MentorDetail";

interface MentorCardProps {
  mentor: MentorDataToShow;
}

const MentorCard: React.FC<MentorCardProps> = ({ mentor }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault(); // Предотвращаем стандартное поведение прокрутки
    event.currentTarget.scrollLeft += event.deltaY; // Прокручиваем по оси X
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 330,
        boxShadow: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <Avatar
          alt={`${mentor.firstName || ""} ${mentor.lastName || ""}`}
          src={mentor.avatarUrl || ""}
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />
        <Typography variant="h6" component="div">
          {mentor.firstName || ""} {mentor.lastName || ""}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{
          marginBottom: 2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "100%",
        }}
      >
        {mentor.shortAboutMe}
      </Typography>
      <Box
        sx={{
          maxWidth: "100%",
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          cursor: "default",
        }}
        onWheel={handleWheel}
      >
        {mentor.specializations.map((specialization, index) => (
          <Chip key={index} label={specialization} sx={{ margin: 0.5 }} />
        ))}
      </Box>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="desktop">
        <MentorDetail mentor={mentor} />
      </Dialog>
    </Box>
  );
};

export default MentorCard;
