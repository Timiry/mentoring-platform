import { IconButton, List, ListItem, Typography } from "@mui/material";
import SideBar from "../../../../../components/SideBar";
import { Link } from "react-router-dom";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import SchoolIcon from "@mui/icons-material/School";

const CoursesListSideBar: React.FC = () => {
  return (
    <SideBar>
      <List>
        {/* мб добавить картинку для красоты */}
        <ListItem>
          <IconButton component={Link} to={"/education"}>
            <ImportContactsIcon />
            <Typography pl="10px">Курсы</Typography>
          </IconButton>
        </ListItem>
        <ListItem>
          <IconButton component={Link} to={""}>
            <SchoolIcon />
            <Typography pl="10px">Менторы</Typography>
          </IconButton>
        </ListItem>
      </List>
    </SideBar>
  );
};

export default CoursesListSideBar;
