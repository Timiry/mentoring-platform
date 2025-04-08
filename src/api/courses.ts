import axios from "./index";
import {
  CourseToCreate,
  ModuleToCreate,
  ThemeToCreate,
  AnyLessonToCreate,
} from "../types";

export default {
  // курсы

  createCourse: async (course: CourseToCreate) => {
    const response = await axios.post(`/courses`, course);
    return response;
  },

  getCourseById: async (courseId: number) => {
    const response = await axios.get(`/courses/${courseId}`);
    return response;
  },

  updateCourse: async (courseId: number, course: CourseToCreate) => {
    const response = await axios.put(`/courses/${courseId}`, course);
    return response;
  },

  deleteCourse: async (courseId: number) => {
    const response = await axios.delete(`/courses/${courseId}`);
    return response;
  },

  // модули

  createModule: async (module: ModuleToCreate) => {
    const response = await axios.post(`/modules`, module);
    return response;
  },

  getModuleById: async (moduleId: number) => {
    const response = await axios.get(`/modules/${moduleId}`);
    return response;
  },

  getModulesByCourse: async (courseId: number) => {
    //const response = await axios.get(`/modules/byCourse/${courseId}`);
    //return response;
    //тестируемс, типа замокали
    return {
      data: [
        {
          id: 1,
          title: "New Module",
          description: "This is a description for the new module.",
          ordinalNumber: 1,
          courseId: courseId,
        },
      ],
    };
  },

  updateModule: async (moduleId: number, module: ModuleToCreate) => {
    const response = await axios.put(`/modules/${moduleId}`, module);
    return response;
  },

  deleteModule: async (moduleId: number) => {
    const response = await axios.delete(`/modules/${moduleId}`);
    return response;
  },

  // темы

  createTheme: async (theme: ThemeToCreate) => {
    const response = await axios.post(`/themes`, theme);
    return response;
  },

  getThemeById: async (themeId: number) => {
    const response = await axios.get(`/themes/${themeId}`);
    return response;
  },

  getThemeByCourse: async (courseId: number) => {
    // const response = await axios.get(`/themes/byCourse/${courseId}`);
    // return response;
    return {
      data: [
        {
          id: 1,
          title: "New Theme",
          description: "This is a description for the new theme.",
          moduleId: 1,
          ordinalNumber: 1,
          contentType: "TEXT",
          lessons: [
            {
              id: 2,
              ordinalNumber: 1,
            },
            {
              id: 3,
              ordinalNumber: 2,
            },
          ],
        },
        {
          id: 2,
          title: "New Theme",
          description: "This is a description for the new theme.",
          moduleId: 1,
          ordinalNumber: 2,
          contentType: "TEXT",
          lessons: [],
        },
        {
          id: 3,
          title: "New Theme",
          description: "This is a description for the new theme.",
          moduleId: 1,
          ordinalNumber: 3,
          contentType: "TEXT",
          lessons: [],
        },
      ],
      courseId: courseId,
    };
  },

  updateTheme: async (themeId: number, theme: ThemeToCreate) => {
    const response = await axios.put(`/themes/${themeId}`, theme);
    return response;
  },

  deleteTheme: async (themeId: number) => {
    const response = await axios.delete(`/themes/${themeId}`);
    return response;
  },

  // уроки

  createLesson: async (lesson: AnyLessonToCreate) => {
    const response = await axios.post(`/lessons`, lesson);
    return response;
  },

  getLessonById: async (lessonId: number) => {
    const response = await axios.get(`/lessons/${lessonId}`);
    return response;
  },

  updateLesson: async (lessonId: number, lesson: AnyLessonToCreate) => {
    const response = await axios.put(`/lessons/${lessonId}`, lesson);
    return response;
  },

  deleteLesson: async (lessonId: number) => {
    const response = await axios.delete(`/lessons/${lessonId}`);
    return response;
  },
};
