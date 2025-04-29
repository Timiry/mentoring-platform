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
  LinearProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Course, ExtendCourseProgress } from "../../../../../types";

interface CourseListProps {
  courses: Course[];
  coursesProgress: ExtendCourseProgress[];
  handleConfirmLeave: (selectedCourse: Course | null) => void;
}

const CoursesList: React.FC<CourseListProps> = ({
  courses,
  coursesProgress,
  handleConfirmLeave,
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

  const handleLeaveClick = () => {
    setOpenDialog(true);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ padding: 2, ml: "120px", mt: "10px", width: "70%" }}>
      <Typography variant="h4" mb={3} pl="16px">
        Текущие курсы
      </Typography>
      <List>
        {courses.map((course) => (
          <ListItem
            key={course.id}
            sx={{ position: "relative", marginBottom: 2 }}
            divider
            secondaryAction={
              <Box display="flex" flexDirection="column" alignItems="end">
                <IconButton onClick={(event) => handleClick(event, course)}>
                  <MoreVertIcon />
                </IconButton>
                <Button
                  sx={{
                    m: 1,
                    color: "button.primary",
                    borderColor: "button.primary",
                  }}
                  size="small"
                  variant="outlined"
                  component={Link}
                  to={`/theme/${1}/lesson/${1}`}
                >
                  Продожить
                </Button>
              </Box>
            }
          >
            <ListItemIcon>
              <img
                src={"/logo.png"}
                alt={course.title}
                style={{ width: 50, height: 50 }}
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
                <Box sx={{ mt: 1, ml: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "50%", mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={
                          (coursesProgress.find(
                            (progress) => progress.courseId === course.id
                          )?.progressPercentage || 0) * 100
                        }
                        sx={{ height: 5, borderRadius: 4 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {coursesProgress.find(
                        (progress) => progress.courseId === course.id
                      )?.completedLessons || 0}
                      /
                      {coursesProgress.find(
                        (progress) => progress.courseId === course.id
                      )?.totalLessons || 0}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>

      {/* Меню для покидания курса */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleLeaveClick}>Покинуть</MenuItem>
      </Menu>

      {/* Диалоговое окно подтверждения покидания курса*/}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Покинуть курс &quot;{selectedCourse?.title}&quot;?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы потеряете доступ ко всем материалам курса и ваш прогресс не
            сохранится.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "center", mb: "16px" }}
        >
          <Button
            onClick={() => {
              handleConfirmLeave(selectedCourse);
              handleCloseDialog();
            }}
            color="primary"
            variant="contained"
          >
            Покинуть
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
