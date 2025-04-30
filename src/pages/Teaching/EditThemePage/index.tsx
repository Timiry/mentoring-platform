import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CourseStructure from "./components/CourseStructure";
import EditTheme from "./components/EditTheme";
import { Module, Theme } from "../../../types";
import { coursesApi } from "../../../api";
import NoMarginsLayout from "../../../components/layout/NoMargins";

const EditThemePage: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const currentThemeId = themeId ? parseInt(themeId) : 1;

  // Пример данных курса
  const courseTitle = "Основы Data Science с Python";
  const [modules, setModules] = useState<Module[]>([]);

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
      coursesApi.updateTheme(themeId, theme);
      // удаление уроков
      deletedLessonsIds.forEach((id) => {
        coursesApi.deleteLesson(id);
      });

      //создание и сохранение уроков
      theme.fullLessons.forEach(async (lesson) => {
        if (!lesson.id) {
          const newLessonRequest = await coursesApi.createLesson(lesson);
          lesson.id = newLessonRequest.data.id;
          console.log(
            `Создание нового урока: ${lesson.ordinalNumber} ${lesson.type}`
          );
        } else if (lesson.wasChanged) {
          coursesApi.updateLesson(lesson.id, lesson);
          console.log(
            `Изменение урока: ${lesson.ordinalNumber} ${lesson.type}`
          );
          lesson.wasChanged = false;
        }
      });
    } catch (error) {
      console.error("Ошибка при сохранении темы:", error);
      throw error; // Пробрасываем ошибку дальше
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
