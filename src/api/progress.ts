import { AnyLesson } from "../types";
import api from "./index";

export default {
  // взаимодействие с курсами и прогресс

  assignUserToCourse: async (courseId: number, userId: number) => {
    const response = await api.post(
      `/progress/${courseId}/assign?userId=${userId}`
    );
    return response;
  },

  // самописный эндпоинт, такого нет на беке
  excludeUserFromCourse: async (courseId: number, userId: number) => {
    const response = await api.delete(
      `/progress/${courseId}/exclude?userId=${userId}`
    );
    return response;
  },

  getUserCourses: async () => {
    const response = await api.get(`/progress/courses`);
    return response;
  },

  getCourseProgress: async (courseId: number) => {
    const response = await api.get(`/progress/course/${courseId}`);
    return response;
  },

  getLastVisitedLessonInCourse: async (courseId: number) => {
    const response = await api.get(`/progress/course/${courseId}/last-visited`);
    return response;
  },

  getNextLesson: async (courseId: number) => {
    const response = await api.get(`/progress/course/${courseId}/next`);
    return response;
  },

  completeLesson: async (lesson: AnyLesson) => {
    const response = await api.patch(
      `/progress/lessons/${lesson.id}/complete`,
      lesson
    );
    return response;
  },
};
