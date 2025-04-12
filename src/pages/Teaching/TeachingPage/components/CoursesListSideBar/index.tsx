import { Button, List, ListItem } from "@mui/material";
import SideBar from "../../../../../components/SideBar";
import { Link } from "react-router-dom";

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
          <Link to={"/teaching"}>Курсы</Link>
        </ListItem>
        <ListItem>
          <Link to={""}>Учащиеся</Link>
        </ListItem>
      </List>
    </SideBar>
  );
};

export default CoursesListSideBar;
