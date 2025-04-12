import { Button, List, ListItem, Typography } from "@mui/material";
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
          <Link to={`/courses/${courseId}/edit-description`}>Описание</Link>
        </ListItem>
        <ListItem>
          <Link to={`/courses/${courseId}/edit-content`}>Содержание</Link>
        </ListItem>
      </List>
    </SideBar>
  );
};

export default CourseSideBar;
