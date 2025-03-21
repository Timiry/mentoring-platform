import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CourseStructure from "./components/CourseStructure";
import EditTheme from "./components/EditTheme";
import MainLayout from "../../../components/layout/Main";
import { Module, Theme, LessonType } from "../../../types";

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
          lessons: [
            {
              id: 1,
              ordinalNumber: 1,
              type: LessonType.HTML,
              html: "<h1>Пример HTML урока</h1>",
            },
            {
              id: 2,
              ordinalNumber: 2,
              type: LessonType.VIDEO,
              videoUrl: "http://example.com/video.mp4",
            },
            {
              id: 3,
              ordinalNumber: 3,
              type: LessonType.TEST,
              condition: "Какой результат 2 + 2?",
              possibleAnswers: ["3", "4", "5"],
              answer: "4",
            },
            {
              id: 4,
              ordinalNumber: 4,
              type: LessonType.MULTI_TEST,
              condition: "Выберите правильные ответы:",
              possibleAnswers: ["Ответ 1", "Ответ 2", "Ответ 3"],
              correctAnswers: ["Ответ 2", "Ответ 3"],
            },
            {
              id: 5,
              ordinalNumber: 5,
              type: LessonType.CODE,
              condition: "Напишите функцию, которая складывает два числа.",
              codeTests: [
                { input: "1, 2", output: "3" },
                { input: "3, 4", output: "7" },
              ],
            },
          ],
        },
        {
          id: 2,
          title: "Тема 2",
          ordinalNumber: 2,
          lessons: [
            {
              id: 6,
              ordinalNumber: 1,
              type: LessonType.HTML,
              html: "<h1>HTML Урок 2</h1>",
            },
          ],
        },
      ],
      originalTitle: "",
      newThemeTitle: "",
    },
    {
      id: 2,
      title: "Модуль 2",
      themes: [
        {
          id: 3,
          title: "Тема 3",
          lessons: [
            {
              id: 7,
              ordinalNumber: 1,
              type: LessonType.VIDEO,
              videoUrl: "http://example.com/video2.mp4",
            },
          ],
          ordinalNumber: 1,
        },
      ],
      originalTitle: "",
      newThemeTitle: "",
      ordinalNumber: 3,
    },
  ]);

  const changeThemeTitle = (newTitle: string) => {
    const updatedModules = modules.map((module) => {
      const updatedThemes = module.themes.map((t) =>
        t.id === currentThemeId ? { ...t, title: newTitle } : t
      );
      return { ...module, themes: updatedThemes };
    });
    setModules(updatedModules);
  };

  const changeTheme = (updatedTheme: Theme) => {
    const updatedModules = modules.map((module) => {
      const updatedThemes = module.themes.map((t) =>
        t.id === updatedTheme.id ? updatedTheme : t
      );
      return { ...module, themes: updatedThemes };
    });
    setModules(updatedModules);
  };

  // Найти текущую тему по ID
  const currentTheme = modules
    .flatMap((module) => module.themes)
    .find((theme) => theme.id === currentThemeId);

  return (
    <MainLayout>
      <div style={{ display: "flex" }}>
        <CourseStructure
          courseTitle={courseTitle}
          modules={modules}
          currentThemeId={currentThemeId}
        />
        {currentTheme && (
          <EditTheme
            theme={currentTheme}
            changeThemeTitle={changeThemeTitle}
            changeTheme={changeTheme}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default EditThemePage;
