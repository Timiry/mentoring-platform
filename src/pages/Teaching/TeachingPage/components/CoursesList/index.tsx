import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContentText,
  DialogContent,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Course } from "../../../../../types";

interface CourseListProps {
  courses: Course[];
  handleConfirmDelete: (selectedCourse: Course | null) => void;
}

const CoursesList: React.FC<CourseListProps> = ({
  courses,
  handleConfirmDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    course: Course
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourse(course);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ padding: 2, ml: "120px", mt: "10px", width: "70%" }}>
      <Typography variant="h4" mb={3} pl="16px">
        Курсы
      </Typography>
      <List>
        {courses.map((course) => (
          <ListItem
            key={course.id}
            sx={{ position: "relative", marginBottom: 2 }}
            divider
            secondaryAction={
              <IconButton onClick={(event) => handleClick(event, course)}>
                <MoreVertIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <img
                src={course.logo}
                alt={course.title}
                style={{ width: 50, height: 50, borderRadius: "4px" }}
              />
            </ListItemIcon>
            <ListItemText
              primary={
                <IconButton
                  component={Link}
                  to={`/courses/${course.id}/edit-content`}
                >
                  <Typography variant="h6" color="text.primary">
                    {course.title}
                  </Typography>
                </IconButton>
              }
              secondary={
                <Box>
                  <IconButton
                    component={Link}
                    to={`/courses/${course.id}/edit-description`}
                  >
                    <Typography variant="body2">Описание</Typography>
                  </IconButton>
                  <IconButton
                    component={Link}
                    to={`/courses/${course.id}/edit-content`}
                  >
                    <Typography variant="body2">Содержание</Typography>
                  </IconButton>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
      {/* Меню для удаления курса */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleDeleteClick}>Удалить</MenuItem>
      </Menu>

      {/* Диалоговое окно подтверждения удаления */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Удалить курс &quot;{selectedCourse?.title}&quot;?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы и ваши ученики потеряете доступ ко всем материалам курса.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", mb: "16px" }}
        >
          <Button
            onClick={() => {
              handleConfirmDelete(selectedCourse);
              handleCloseDialog();
            }}
            color="primary"
            variant="contained"
          >
            Удалить
          </Button>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="contained"
          >
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CoursesList;
