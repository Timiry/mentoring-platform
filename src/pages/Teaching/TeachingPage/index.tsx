import { useState } from "react";
import NoMarginsLayout from "../../../components/layout/NoMargins";
import CoursesList from "./components/CoursesList";
import CoursesListSideBar from "./components/CoursesListSideBar";
import CreateCourseDialog from "./components/CreateCourseDialog";
import { CourseToCreate } from "../../../types";

const TeachingPage: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateCourse = (course: CourseToCreate) => {
    console.log("Создать курс:", course);
    // Здесь добавьте логику для создания курса (например, отправка на сервер)
    handleCloseDialog(); // Закрываем диалог после создания курса
  };

  return (
    <NoMarginsLayout>
      <CoursesListSideBar handleOpenDialog={handleOpenDialog} />
      <CoursesList />
      <CreateCourseDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onCreate={handleCreateCourse}
      />
    </NoMarginsLayout>
  );
};

export default TeachingPage;
