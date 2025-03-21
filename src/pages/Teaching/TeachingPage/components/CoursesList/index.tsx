import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const CoursesList: React.FC = () => {
  const courses = [
    {
      id: 1,
      title: "Курс 1",
      description: "Описание 1",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      logo: "/logo.png",
    },
    {
      id: 2,
      title: "Курс 2",
      description: "Описание 2",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      logo: "/logo.png",
    },
    {
      id: 3,
      title: "Курс 3",
      description: "Описание 3",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      logo: "/logo.png",
    },
    {
      id: 4,
      title: "Курс 1",
      description: "Описание 1",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      logo: "/logo.png",
    },
    {
      id: 5,
      title: "Курс 2",
      description: "Описание 2",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      logo: "/logo.png",
    },
    {
      id: 6,
      title: "Курс 3",
      description: "Описание 3",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      logo: "/logo.png",
    },
    {
      id: 7,
      title: "Курс 1",
      description: "Описание 1",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      logo: "/logo.png",
    },
    {
      id: 8,
      title: "Курс 2",
      description: "Описание 2",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      logo: "/logo.png",
    },
    {
      id: 9,
      title: "Курс 3",
      description: "Описание 3",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      logo: "/logo.png",
    },
  ];

  return (
    <Box sx={{ padding: 2, mb: 8 }}>
      <Typography variant="h4" mb={3}>
        Курсы
      </Typography>
      <List>
        {courses.map((course) => (
          <ListItem
            key={course.id}
            sx={{ position: "relative", marginBottom: 2 }}
          >
            <ListItemIcon>
              <img
                src={course.logo}
                alt={course.title}
                style={{ width: 50, height: 50 }}
              />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">{course.title}</Typography>}
            />
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
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CoursesList;
