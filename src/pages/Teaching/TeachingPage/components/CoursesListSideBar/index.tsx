import { Button, IconButton, List, ListItem, Typography } from "@mui/material";
import SideBar from "../../../../../components/SideBar";
import { Link } from "react-router-dom";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import SchoolIcon from "@mui/icons-material/School";

interface CoursesListSideBarProps {
  handleOpenDialog: () => void;
}

const CoursesListSideBar: React.FC<CoursesListSideBarProps> = ({
  handleOpenDialog,
}) => {
  return (
    <SideBar>
      <List>
        {/* мб добавить картинку для красоты */}
        <ListItem>
          <Button variant="outlined" onClick={handleOpenDialog}>
            Создать курс
          </Button>
        </ListItem>
        <ListItem>
          <IconButton component={Link} to={"/teaching"}>
            <ImportContactsIcon />
            <Typography pl="10px">Курсы</Typography>
          </IconButton>
        </ListItem>
        <ListItem>
          <IconButton component={Link} to={""}>
            <SchoolIcon />
            <Typography pl="10px">Ученики</Typography>
          </IconButton>
        </ListItem>
      </List>
    </SideBar>
  );
};

export default CoursesListSideBar;
