import { AnyLesson } from "../types";
import axios from "./index";

export default {
  // взаимодействие с курсами и прогресс

  assignUserToCourse: async (courseId: number, userId: number) => {
    const response = await axios.post(
      `/progress/${courseId}/assign?userId=${userId}`
    );
    return response;
  },

  // самописный эндпоинт, такого нет на беке
  excludeUserFromCourse: async (courseId: number, userId: number) => {
    const response = await axios.delete(
      `/progress/${courseId}/exclude?userId=${userId}`
    );
    return response;
  },

  getUserCourses: async () => {
    const response = await axios.get(`/progress/courses`);
    return response;
  },

  getCourseProgress: async (courseId: number) => {
    const response = await axios.get(`/progress/course/${courseId}`);
    return response;
  },

  getLastVisitedLessonInCourse: async (courseId: number) => {
    const response = await axios.get(
      `/progress/course/${courseId}/last-visited`
    );
    return response;
  },

  getNextLesson: async (courseId: number) => {
    const response = await axios.get(`/progress/course/${courseId}/next`);
    return response;
  },

  completeLesson: async (lesson: AnyLesson) => {
    const response = await axios.patch(
      `/progress/lessons/${lesson.id}/complete`,
      lesson
    );
    return response;
  },
};
