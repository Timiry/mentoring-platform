import { useEffect, useState } from "react";
import NoMarginsLayout from "../../../components/layout/NoMargins";
import CoursesList from "./components/CoursesList";
import CoursesListSideBar from "./components/CoursesListSideBar";
import CreateCourseDialog from "./components/CreateCourseDialog";
import { Course, CourseToCreate } from "../../../types";
import { coursesApi } from "../../../api";

const TeachingPage: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await coursesApi.getCoursesByAuthorId(
          localStorage.userId
        );
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error("Ошибка при получении данных курса:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateCourse = async (course: CourseToCreate) => {
    try {
      const courseResponse = await coursesApi.createCourse(course);
      setCourses([...courses, courseResponse.data]);
      console.log("Создан курс: ", courseResponse.data);
    } catch (error) {
      console.error("Ошибка при создании курса", error);
    }
  };

  const handleConfirmDelete = (selectedCourse: Course | null) => {
    // Отправка запроса удаления курса после подтверждения
    if (selectedCourse !== null) {
      try {
        coursesApi.deleteCourse(selectedCourse.id);
        setCourses(courses.filter((course) => course.id !== selectedCourse.id));
        console.log(`Курс с ID ${selectedCourse?.id} удален.`);
      } catch (error) {
        console.error("Ошибка при удалении курса", error);
      }
    }
    handleCloseDialog();
  };

  return (
    <NoMarginsLayout>
      <CoursesListSideBar handleOpenDialog={handleOpenDialog} />
      <CoursesList
        courses={courses}
        handleConfirmDelete={handleConfirmDelete}
      />
      <CreateCourseDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onCreate={handleCreateCourse}
      />
    </NoMarginsLayout>
  );
};

export default TeachingPage;
