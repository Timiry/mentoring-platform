import { useEffect, useState } from "react";
import NoMarginsLayout from "../../../components/layout/NoMargins";
import { useParams, useLocation } from "react-router-dom";
import CourseSideBar from "./CourseSideBar";
import { coursesApi } from "../../../api";
import { Course } from "../../../types";
import EditCourseDescription from "./EditCourseDescription";
import EditCourseContent from "./EditCourseContent";
import { Box, CircularProgress, Typography } from "@mui/material";

const EditCoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const curCourseId = courseId ? parseInt(courseId) : 1;
  const mode = useLocation().pathname.split("/").filter(Boolean).pop();
  const [isLoading, setIsLoading] = useState(true);

  const [course, setCourse] = useState<Course>();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseResponse = await coursesApi.getCourseById(curCourseId);
        setCourse(courseResponse.data);
      } catch (error) {
        console.error("Ошибка при получении данных курса:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [curCourseId]);

  if (isLoading && !course) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">Не удалось загрузить данные курса</Typography>
      </Box>
    );
  }

  return (
    <NoMarginsLayout>
      <CourseSideBar course={course} />
      {(() => {
        switch (mode) {
          case "edit-description":
            return <EditCourseDescription initialCourse={course} />;
          case "edit-content":
            return <EditCourseContent />;
          default:
            return <EditCourseDescription initialCourse={course} />;
        }
      })()}
    </NoMarginsLayout>
  );
};

export default EditCoursePage;
