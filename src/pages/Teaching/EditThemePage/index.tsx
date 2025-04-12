import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CourseStructure from "./components/CourseStructure";
import EditTheme from "./components/EditTheme";
import { Module, Theme, LessonType } from "../../../types";
import { coursesApi } from "../../../api";
import NoMarginsLayout from "../../../components/layout/NoMargins";

const EditThemePage: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const currentThemeId = themeId ? parseInt(themeId) : 1;

  // Пример данных курса
  const courseTitle = "Курс по программированию";
  const [modules, setModules] = useState<Module[]>([
    {
      id: 1,
      title: "Модуль 1",
      ordinalNumber: 1,
      themes: [
        {
          id: 1,
          title: "Тема 1",
          ordinalNumber: 1,
          wasChanged: false,
          fullLessons: [
            {
              id: 1,
              ordinalNumber: 1,
              type: LessonType.HTML,
              themeId: 1,
              wasChanged: false,
              html: "<h1>Пример текстового урока</h1>",
            },
            {
              id: 2,
              ordinalNumber: 2,
              type: LessonType.VIDEO,
              themeId: 1,
              wasChanged: false,
              videoUrl: "http://example.com/video.mp4",
            },
            {
              id: 3,
              ordinalNumber: 3,
              type: LessonType.TEST,
              themeId: 1,
              wasChanged: false,
              condition: "Какой результат 2 + 2?",
              possibleAnswers: ["3", "4", "5"],
              answer: "4",
            },
            {
              id: 4,
              ordinalNumber: 4,
              type: LessonType.MULTI_TEST,
              themeId: 1,
              wasChanged: false,
              condition: "Выберите правильные ответы:",
              possibleAnswers: ["Ответ 1", "Ответ 2", "Ответ 3"],
              correctAnswers: ["Ответ 2", "Ответ 3"],
            },
            {
              id: 5,
              ordinalNumber: 5,
              type: LessonType.CODE,
              themeId: 1,
              wasChanged: false,
              condition: "Напишите функцию, которая складывает два числа.",
              codeTests: [
                { input: "1, 2", output: "3" },
                { input: "3, 4", output: "7" },
              ],
            },
          ],
          moduleId: 1,
          description: "",
          lessons: [],
          contentType: "",
        },
        {
          id: 2,
          title: "Тема 2",
          ordinalNumber: 2,
          fullLessons: [
            {
              id: 6,
              ordinalNumber: 1,
              type: LessonType.HTML,
              themeId: 2,
              wasChanged: false,
              html: "<h1>HTML Урок 2</h1>",
            },
          ],
          moduleId: 1,
          description: "",
          lessons: [],
          contentType: "",
          wasChanged: false,
        },
      ],
      wasChanged: false,
      newThemeTitle: "",
      description: "",
      courseId: 0,
    },
    {
      id: 2,
      title: "Модуль 2",
      themes: [
        {
          id: 3,
          title: "Тема 3",
          fullLessons: [
            {
              id: 7,
              ordinalNumber: 1,
              type: LessonType.VIDEO,
              themeId: 3,
              wasChanged: false,
              videoUrl: "http://example.com/video2.mp4",
            },
          ],
          ordinalNumber: 1,
          moduleId: 2,
          description: "",
          lessons: [],
          contentType: "",
          wasChanged: false,
        },
      ],
      wasChanged: false,
      newThemeTitle: "",
      ordinalNumber: 3,
      description: "",
      courseId: 0,
    },
  ]);

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
