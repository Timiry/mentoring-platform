import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Module, LessonType } from "../../../types";
import NoMarginsLayout from "../../../components/layout/NoMargins";
import CourseStructureWithProgress from "./components/CourseStructureWithProgress";
import ThemeWithLesson from "./components/ThemeWithLesson";

const EditThemePage: React.FC = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const currentThemeId = themeId ? parseInt(themeId) : 1;

  // Пример данных курса
  const courseTitle = "Основы Data Science с Python";
  const [modules, setModules] = useState<Module[]>([]);

  if (!modules)
    setModules([
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
            ],
            lessons: [],
            description: "",
            moduleId: 0,
            contentType: "",
          },
        ],
        wasChanged: false,
        newThemeTitle: "",
        description: "",
        courseId: 0,
      },
    ]);
  // Найти текущую тему по ID
  const currentTheme = modules
    .flatMap((module) => module.themes)
    .find((theme) => theme.id === currentThemeId);

  return (
    <NoMarginsLayout>
      {currentTheme && <ThemeWithLesson theme={currentTheme} />}
      <CourseStructureWithProgress
        courseTitle={courseTitle}
        modules={modules}
        currentThemeId={currentThemeId}
      />
    </NoMarginsLayout>
  );
};

export default EditThemePage;
