import { useEffect, useState } from "react";
import NoMarginsLayout from "../../../components/layout/NoMargins";
import CoursesList from "./components/CoursesList";
import CoursesListSideBar from "./components/CoursesListSideBar";
import { Course, ExtendCourseProgress } from "../../../types";
import { progressApi } from "../../../api";

const EducationPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  const [coursesProgress, setCoursesProgress] = useState<
    ExtendCourseProgress[]
  >([]);

  const userId = 1; // временно

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await progressApi.getUserCourses();
        setCourses(coursesResponse.data);

        for (const course of courses) {
          const progressResponse = await progressApi.getCourseProgress(
            course.id
          );
          setCoursesProgress([...coursesProgress, progressResponse.data]);
        }
      } catch (error) {
        console.error("Ошибка при получении данных курса:", error);
      }
    };

    fetchCourses();
  }, [courses, coursesProgress, userId]);

  const handleConfirmLeave = (selectedCourse: Course | null) => {
    // Отправка запроса покидания курса после подтверждения
    if (selectedCourse !== null) {
      try {
        progressApi.excludeUserFromCourse(selectedCourse.id, userId);
        setCourses(courses.filter((course) => course.id !== selectedCourse.id));
        console.log(`Курс с ID ${selectedCourse?.id} удален.`);
      } catch (error) {
        console.error("Ошибка при удалении курса", error);
      }
    }
  };

  return (
    <NoMarginsLayout>
      <CoursesListSideBar />
      <CoursesList
        courses={courses}
        handleConfirmLeave={handleConfirmLeave}
        coursesProgress={coursesProgress}
      />
    </NoMarginsLayout>
  );
};

export default EducationPage;
