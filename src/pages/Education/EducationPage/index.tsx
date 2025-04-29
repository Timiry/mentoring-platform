import { useEffect, useState } from "react";
import NoMarginsLayout from "../../../components/layout/NoMargins";
import CoursesList from "./components/CoursesList";
import CoursesListSideBar from "./components/CoursesListSideBar";
import { Course, ExtendCourseProgress } from "../../../types";
import { progressApi } from "../../../api";

const EducationPage: React.FC = () => {
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

  const [coursesProgress, setCoursesProgress] = useState<
    ExtendCourseProgress[]
  >([
    {
      courseId: 1,
      completedLessons: 25,
      totalLessons: 100,
      progressPercentage: 0.25,
      completed: false,
      moduleProgresses: [],
    },
    {
      courseId: 2,
      completedLessons: 25,
      totalLessons: 100,
      progressPercentage: 0.25,
      completed: false,
      moduleProgresses: [],
    },
    {
      courseId: 3,
      completedLessons: 25,
      totalLessons: 100,
      progressPercentage: 0.25,
      completed: false,
      moduleProgresses: [],
    },
    {
      courseId: 4,
      completedLessons: 25,
      totalLessons: 100,
      progressPercentage: 0.25,
      completed: false,
      moduleProgresses: [],
    },
  ]);

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
