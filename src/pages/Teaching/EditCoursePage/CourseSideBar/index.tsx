import { Button, IconButton, List, ListItem, Typography } from "@mui/material";
import SideBar from "../../../../components/SideBar";
import { Link } from "react-router-dom";
import { coursesApi } from "../../../../api";
import { Course } from "../../../../types";

const CourseSideBar = ({ course }: { course: Course }) => {
  return (
    <SideBar>
      <List>
        <ListItem>
          <img
            src={course.logo}
            alt={course.title}
            style={{ width: 50, height: 50, borderRadius: "4px" }}
          />
        </ListItem>
        <ListItem>
          <Typography variant="h6">{course.title}</Typography>
        </ListItem>
        <ListItem>
          {course.isPublished ? (
            <Typography color="button.primary">Опубликован</Typography>
          ) : (
            <Button
              variant="outlined"
              sx={{ color: "button.primary", borderColor: "button.primary" }}
              onClick={() => coursesApi.publishCourse(course.id)}
            >
              Опубликовать
            </Button>
          )}
        </ListItem>
        <ListItem>
          <IconButton
            component={Link}
            to={`/courses/${course.id}/edit-description`}
          >
            <Typography>Описание</Typography>
          </IconButton>
        </ListItem>
        <ListItem>
          <IconButton
            component={Link}
            to={`/courses/${course.id}/edit-content`}
          >
            <Typography>Содержание</Typography>
          </IconButton>
        </ListItem>
      </List>
    </SideBar>
  );
};

export default CourseSideBar;
