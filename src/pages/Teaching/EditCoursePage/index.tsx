import { useEffect, useState } from "react";
import NoMarginsLayout from "../../../components/layout/NoMargins";
import { useParams, useLocation } from "react-router-dom";
import CourseSideBar from "./CourseSideBar";
import { coursesApi } from "../../../api";
import { CourseToCreate } from "../../../types";
import EditCourseDescription from "./EditCourseDescription";
import EditCourseContent from "./EditCourseContent";

const EditCoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const curCourseId = courseId ? parseInt(courseId) : 1;
  const mode = useLocation().pathname.split("/").filter(Boolean).pop();

  const [course, setCourse] = useState<CourseToCreate>({
    title: "",
    description: "",
    completionTimeInHours: 40,
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const courseResponse = await coursesApi.getCourseById(curCourseId);
        setCourse(courseResponse.data);
      } catch (error) {
        console.error("Ошибка при получении данных курса:", error);
      }
    };

    fetchCourseData();
  }, [curCourseId]);

  return (
    <NoMarginsLayout>
      <CourseSideBar
        courseTitle={course.title}
        courseId={curCourseId}
        logo={course.logo || ""}
      />
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
