import { useEffect, useState } from "react";
import NoMarginsLayout from "../../../components/layout/NoMargins";
import CoursesList from "./components/CoursesList";
import CoursesListSideBar from "./components/CoursesListSideBar";
import CreateCourseDialog from "./components/CreateCourseDialog";
import { Course, CourseToCreate } from "../../../types";
import { coursesApi } from "../../../api";

const TeachingPage: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Курс 1",
      description: "Описание 1",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      //logo: "/logo.png",
    },
    {
      id: 2,
      title: "Курс 2",
      description: "Описание 2",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      //logo: "/logo.png",
    },
    {
      id: 3,
      title: "Курс 3",
      description: "Описание 3",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      //logo: "/logo.png",
    },
    {
      id: 4,
      title: "Курс 4",
      description: "Описание 1",
      authorId: 1,
      completionTimeInHours: 50,
      createdAt: "2024-12-03T10:15:30+01:00",
      //logo: "/logo.png",
    },
  ]);

  const authorId = 1; // временно

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await coursesApi.getCoursesByMentorId(authorId); // нерабочая заглушка
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error("Ошибка при получении данных курса:", error);
      }
    };

    fetchCourses();
  }, [authorId]);

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
