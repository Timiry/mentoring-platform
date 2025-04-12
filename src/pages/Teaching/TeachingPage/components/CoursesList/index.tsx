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
import { useEffect, useState } from "react";
import { Course } from "../../../../../types";
import { coursesApi } from "../../../../../api";

const CoursesList: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Курс 1",
      description: "Описание 1",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      //logo: "/logo.png",
    },
    {
      id: 2,
      title: "Курс 2",
      description: "Описание 2",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      //logo: "/logo.png",
    },
    {
      id: 3,
      title: "Курс 3",
      description: "Описание 3",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      //logo: "/logo.png",
    },
    {
      id: 4,
      title: "Курс 4",
      description: "Описание 1",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      //logo: "/logo.png",
    },
  ]);

  const authorId = 1; // временно

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await coursesApi.getCoursesByMentorId(authorId); // нерабочая заглушка
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error("Ошибка при получении данных курса:", error);
      }
    };

    fetchCourses();
  }, [authorId]);

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

  const handleConfirmDelete = () => {
    // Отправка запроса удаления курса после подтверждения
    if (selectedCourse !== null) {
      setCourses(courses.filter((course) => course.id !== selectedCourse.id));
      coursesApi.deleteCourse(selectedCourse.id);
      console.log(`Курс с ID ${selectedCourse?.id} удален.`);
    }
    handleCloseDialog();
  };

  return (
    <Box sx={{ padding: 2, ml: "70px", mt: "10px", width: "70%" }}>
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
            onClick={handleConfirmDelete}
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
