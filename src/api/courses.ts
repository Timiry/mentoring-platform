import api from "./index";
import {
  CourseToCreate,
  ModuleToCreate,
  ThemeToCreate,
  AnyLessonToCreate,
} from "../types";

export default {
  // курсы

  createCourse: async (course: CourseToCreate) => {
    const response = await api.post(`/courses`, course);
    return response;
  },

  getCourseById: async (courseId: number) => {
    const response = await api.get(`/courses/${courseId}`);
    return response;
  },

  getCoursesByMentorId: async (mentorId: number) => {
    const response = await api.get(`/courses?mentor=${mentorId}`); // возможно изменить
    return response;
  },

  updateCourse: async (courseId: number, course: CourseToCreate) => {
    const response = await api.put(`/courses/${courseId}`, course);
    return response;
  },

  deleteCourse: async (courseId: number) => {
    const response = await api.delete(`/courses/${courseId}`);
    return response;
  },

  // модули

  createModule: async (module: ModuleToCreate) => {
    const response = await api.post(`/modules`, module);
    return response;
  },

  getModuleById: async (moduleId: number) => {
    const response = await api.get(`/modules/${moduleId}`);
    return response;
  },

  getModulesByCourse: async (courseId: number) => {
    const response = await api.get(`/modules/byCourse/${courseId}`);
    return response;
  },

  updateModule: async (moduleId: number, module: ModuleToCreate) => {
    const response = await api.put(`/modules/${moduleId}`, module);
    return response;
  },

  deleteModule: async (moduleId: number) => {
    const response = await api.delete(`/modules/${moduleId}`);
    return response;
  },

  // темы

  createTheme: async (theme: ThemeToCreate) => {
    const response = await api.post(`/themes`, theme);
    return response;
  },

  getThemeById: async (themeId: number) => {
    const response = await api.get(`/themes/${themeId}`);
    return response;
  },

  getThemeByCourse: async (courseId: number) => {
    const response = await api.get(`/themes/byCourse/${courseId}`);
    return response;
  },

  updateTheme: async (themeId: number, theme: ThemeToCreate) => {
    const response = await api.put(`/themes/${themeId}`, theme);
    return response;
  },

  deleteTheme: async (themeId: number) => {
    const response = await api.delete(`/themes/${themeId}`);
    return response;
  },

  // уроки

  createLesson: async (lesson: AnyLessonToCreate) => {
    const response = await api.post(`/lessons`, lesson);
    return response;
  },

  getLessonById: async (lessonId: number) => {
    const response = await api.get(`/lessons/${lessonId}`);
    return response;
  },

  updateLesson: async (lessonId: number, lesson: AnyLessonToCreate) => {
    const response = await api.put(`/lessons/${lessonId}`, lesson);
    return response;
  },

  deleteLesson: async (lessonId: number) => {
    const response = await api.delete(`/lessons/${lessonId}`);
    return response;
  },
};
