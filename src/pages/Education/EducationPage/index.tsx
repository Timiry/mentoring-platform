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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesResponse = await progressApi.getUserCourses();
        setCourses(coursesResponse.data);

        let progress: ExtendCourseProgress[] = [];
        for (const course of coursesResponse.data) {
          const progressResponse = await progressApi.getCourseProgress(
            course.id
          );
          progress = [...progress, progressResponse.data];
        }
        setCoursesProgress(progress);
      } catch (error) {
        console.error("Ошибка при получении данных курса:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleConfirmLeave = (selectedCourse: Course | null) => {
    // Отправка запроса покидания курса после подтверждения
    if (selectedCourse !== null) {
      try {
        progressApi.excludeUserFromCourse(
          selectedCourse.id,
          localStorage.userId
        );
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
