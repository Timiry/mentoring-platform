import { Button, IconButton, List, ListItem, Typography } from "@mui/material";
import SideBar from "../../../../components/SideBar";
import { Link } from "react-router-dom";

const CourseSideBar = ({
  courseTitle,
  courseId,
}: {
  courseTitle: string;
  courseId: number;
}) => {
  return (
    <SideBar>
      <List>
        <ListItem>
          <img
            src="/logo.png"
            alt={courseTitle}
            style={{ width: 50, height: 50 }}
          />
        </ListItem>
        <ListItem>
          <Typography variant="h6">{courseTitle}</Typography>
        </ListItem>
        <ListItem>
          <Button variant="outlined">Опубликовать</Button>
        </ListItem>
        <ListItem>
          <IconButton
            component={Link}
            to={`/courses/${courseId}/edit-description`}
          >
            <Typography>Описание</Typography>
          </IconButton>
        </ListItem>
        <ListItem>
          <IconButton component={Link} to={`/courses/${courseId}/edit-content`}>
            <Typography>Содержание</Typography>
          </IconButton>
        </ListItem>
      </List>
    </SideBar>
  );
};

export default CourseSideBar;
