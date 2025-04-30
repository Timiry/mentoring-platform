import { Button, IconButton, List, ListItem, Typography } from "@mui/material";
import SideBar from "../../../../components/SideBar";
import { Link } from "react-router-dom";

const CourseSideBar = ({
  courseTitle,
  logo,
  courseId,
}: {
  courseTitle: string;
  logo: string;
  courseId: number;
}) => {
  return (
    <SideBar>
      <List>
        <ListItem>
          <img
            src={logo}
            alt={courseTitle}
            style={{ width: 50, height: 50, borderRadius: "4px" }}
          />
        </ListItem>
        <ListItem>
          <Typography variant="h6">{courseTitle}</Typography>
        </ListItem>
        <ListItem>
          <Button
            variant="outlined"
            sx={{ color: "button.primary", borderColor: "button.primary" }}
          >
            Опубликовать
          </Button>
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
