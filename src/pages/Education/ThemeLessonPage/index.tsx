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
          title: "Тема 1",
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
        {
          id: 4,
          title: "Тема 2",
          fullLessons: [],
          ordinalNumber: 2,
          moduleId: 2,
          description: "",
          lessons: [],
          contentType: "",
          wasChanged: false,
        },
        {
          id: 5,
          title: "Тема 3",
          fullLessons: [],
          ordinalNumber: 3,
          moduleId: 2,
          description: "",
          lessons: [],
          contentType: "",
          wasChanged: false,
        },
        {
          id: 6,
          title: "Тема 4",
          fullLessons: [],
          ordinalNumber: 4,
          moduleId: 2,
          description: "",
          lessons: [],
          contentType: "",
          wasChanged: false,
        },
        {
          id: 7,
          title: "Тема 5",
          fullLessons: [],
          ordinalNumber: 5,
          moduleId: 2,
          description: "",
          lessons: [],
          contentType: "",
          wasChanged: false,
        },
      ],
      wasChanged: false,
      newThemeTitle: "",
      ordinalNumber: 2,
      description: "",
      courseId: 0,
    },
  ]);

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
