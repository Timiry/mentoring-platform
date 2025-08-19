import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseStructure from "./components/CourseStructure";
import EditTheme from "./components/EditTheme";
import { Module, ModuleToGet, Theme, ThemeToGet } from "../../../types";
import { coursesApi } from "../../../api";
import NoMarginsLayout from "../../../components/layout/NoMargins";

const EditThemePage: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const currentThemeId = themeId ? parseInt(themeId) : 1;

  const [courseTitle, setCourseTitle] = useState("");
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    const getModulesWithThemesByCourseId = async (currentThemeId: number) => {
      try {
        // тема
        const theme = (await coursesApi.getThemeById(currentThemeId)).data;
        const module = (await coursesApi.getModuleById(theme.moduleId)).data;
        // Получаем информацию курса
        const course = (await coursesApi.getCourseById(module.courseId)).data;
        setCourseTitle(course.title);

        // Получаем модули курса
        const modulesResponse = await coursesApi.getModulesByCourse(course.id);
        const modules: ModuleToGet[] = modulesResponse.data;

        // Получаем все темы курса
        const themesResponse = await coursesApi.getThemeByCourse(course.id);
        const themes: ThemeToGet[] = themesResponse.data;

        // Итерируемся по каждому модулю и добавляем соответствующие темы
        const modulesWithThemes = await Promise.all(
          modules.map(async (module) => {
            const moduleThemes = await Promise.all(
              themes
                .filter((theme) => theme.moduleId === module.id)
                .map(async (theme) => {
                  const fullLessons = await Promise.all(
                    theme.lessons.map((lesson) =>
                      coursesApi
                        .getLessonById(lesson.lessonId)
                        .then((res) => res.data)
                    )
                  );
                  // Сортируем уроки по ordinalNumber
                  const sortedLessons = [...fullLessons].sort(
                    (a, b) => a.ordinalNumber - b.ordinalNumber
                  );
                  return {
                    ...theme,
                    fullLessons: sortedLessons,
                    wasChanged: false,
                  };
                })
            );
            return {
              ...module,
              newThemeTitle: "",
              themes: moduleThemes,
              wasChanged: false,
            };
          })
        );

        setModules(modulesWithThemes);
      } catch (error) {
        console.error("Ошибка при получении модулей и тем:", error);
      }
    };

    getModulesWithThemesByCourseId(currentThemeId);
  }, [currentThemeId]);

  const changeTheme = (updatedTheme: Theme) => {
    const updatedModules = modules.map((module) => {
      const updatedThemes = module.themes.map((t) =>
        t.id === updatedTheme.id ? updatedTheme : t
      );
      return { ...module, themes: updatedThemes };
    });
    setModules(updatedModules);
  };

  const saveChanges = (themeId: number, deletedLessonsIds: number[]) => {
    const theme = modules
      .flatMap((module) => module.themes)
      .find((theme) => theme.id === themeId);
    if (!theme) {
      console.error(`Тема с id ${themeId} не найдена.`);
      return; // Выход из функции, если тема не найдена
    }
    try {
      //coursesApi.updateTheme(themeId, theme);
      // удаление уроков
      deletedLessonsIds.forEach((id) => {
        coursesApi.deleteLesson(id);
      });

      //создание и сохранение уроков
      theme.fullLessons.forEach(async (lesson) => {
        if (!lesson.lessonId) {
          const newLessonRequest = await coursesApi.createLesson(lesson);
          lesson.lessonId = newLessonRequest.data.id;
          console.log(
            `Создание нового урока: ${lesson.ordinalNumber} ${lesson.type}`
          );
        } else if (lesson.wasChanged) {
          coursesApi.updateLesson(lesson.lessonId, lesson);
          console.log(
            `Изменение урока: ${lesson.ordinalNumber} ${lesson.type}`
          );
          lesson.wasChanged = false;
        }
      });
    } catch (error) {
      console.error("Ошибка при сохранении темы:", error);
    }
  };

  // Найти текущую тему по ID
  const currentTheme = modules
    .flatMap((module) => module.themes)
    .find((theme) => theme.id === currentThemeId);

  return (
    <NoMarginsLayout>
      {currentTheme && (
        <EditTheme
          theme={currentTheme}
          changeTheme={changeTheme}
          saveChanges={saveChanges}
        />
      )}
      <CourseStructure
        courseTitle={courseTitle}
        modules={modules}
        currentThemeId={currentThemeId}
      />
    </NoMarginsLayout>
  );
};

export default EditThemePage;
