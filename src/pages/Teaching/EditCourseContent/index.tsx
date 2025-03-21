import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
//import EditIcon from "@mui/icons-material/Edit";
import MainLayout from "../../../components/layout/Main";
import { Module, Theme, LessonType } from "../../../types";

const EditCourseContent: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
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
      ordinalNumber: 2,
    },
  ]);

  const [deletedIds, setDeletedIds] = useState<{
    moduleIds: number[];
    themeIds: number[];
  }>({
    moduleIds: [],
    themeIds: [],
  });

  const handleAddModule = () => {
    const newModule: Module = {
      title: "Новый модуль",
      originalTitle: "Новый модуль",
      themes: [],
      newThemeTitle: "",
      ordinalNumber: modules.length + 1, // Порядковый номер нового модуля
    };
    setModules([...modules, newModule]);
  };

  const handleDeleteModule = (module: Module) => {
    if (module.id !== undefined) {
      const id = module.id;
      setDeletedIds((prev) => ({
        ...prev,
        moduleIds: [...prev.moduleIds, id],
      }));
    }
    const updatedModules = modules
      .filter((mod) => mod.ordinalNumber !== module.ordinalNumber)
      .map((mod, index) => ({
        ...mod,
        ordinalNumber: index + 1, // Порядковый номер равен индексу + 1
      }));
    setModules(updatedModules);
  };

  const handleAddTheme = (moduleIndex: number) => {
    const newTheme: Theme = {
      title: modules[moduleIndex].newThemeTitle,
      lessons: [],
      ordinalNumber: modules[moduleIndex].themes.length + 1, // Порядковый номер новой темы
    };
    const updatedModules = [...modules];
    updatedModules[moduleIndex].themes.push(newTheme);
    updatedModules[moduleIndex].newThemeTitle = ""; // Очищаем поле после добавления
    setModules(updatedModules);
  };

  const handleDeleteTheme = (moduleIndex: number, themeIndex: number) => {
    const themeId = modules[moduleIndex].themes[themeIndex].id;
    if (themeId !== undefined) {
      setDeletedIds((prev) => ({
        ...prev,
        themeIds: [...prev.themeIds, themeId],
      }));
    }
    const updatedModules = [...modules];
    updatedModules[moduleIndex].themes = updatedModules[moduleIndex].themes
      .filter((theme) => theme.ordinalNumber !== themeIndex + 1)
      .map((theme, index) => ({
        ...theme,
        ordinalNumber: index + 1, // Порядковый номер равен индексу + 1
      }));
    setModules(updatedModules);
  };

  const handleSave = () => {
    // Отправка запросов для удаления модулей и тем
    deletedIds.moduleIds.forEach((id) => {
      // Отправка запроса на удаление модуля с id
      console.log(`Удаление модуля с id: ${id}`);
    });
    deletedIds.themeIds.forEach((id) => {
      // Отправка запроса на удаление темы с id
      console.log(`Удаление темы с id: ${id}`);
    });

    // Проход по всему списку модулей
    // Отправка запросов на создание модулей и тем без id
    // А также отправка запросов на изменение названий модулей с id
    modules.forEach((module) => {
      if (!module.id) {
        // Отправка запроса на создание нового модуля
        console.log(`Создание нового модуля: ${module.title}`);
      } else if (module.title !== module.originalTitle) {
        // Отправка запроса на изменение названия сохраненного модуля
        console.log(
          `Изменение названия модуля с "${module.originalTitle}" на "${module.title}"`
        );
      }
      module.themes.forEach((theme) => {
        if (!theme.id) {
          // Отправка запроса на создание новой темы
          console.log(`Создание новой темы: ${theme.title}`);
        }
      });
    });
  };

  return (
    <MainLayout>
      <Box sx={{ padding: 2, mb: 8 }}>
        <Typography variant="h4" mb={3}>
          Программа курса {courseId}
        </Typography>
        <List>
          {modules.map((module, moduleIndex) => (
            <Box
              key={moduleIndex}
              sx={{
                marginBottom: 2,
                border: "1px solid #ccc",
                padding: 2,
                borderRadius: 1,
              }}
            >
              <Typography variant="h6">
                {module.ordinalNumber}
                <TextField
                  value={module.title}
                  onChange={(e) => {
                    const updatedModules = [...modules];
                    updatedModules[moduleIndex].title = e.target.value;
                    setModules(updatedModules);
                  }}
                  variant="outlined"
                  size="small"
                  sx={{ marginLeft: 1, marginRight: 1 }}
                />
                <IconButton onClick={() => handleDeleteModule(module)}>
                  <DeleteIcon />
                </IconButton>
              </Typography>
              <List>
                {module.themes.map((theme, themeIndex) => (
                  <ListItem key={themeIndex}>
                    <ListItemText
                      primary={`${module.ordinalNumber}.${theme.ordinalNumber} ${theme.title}`}
                    />
                    {theme.id ? (
                      <Link
                        href={`/edit-theme/${theme.id}/lesson/1`}
                        sx={{ textDecoration: "none", padding: 0 }}
                      >
                        Редактировать
                      </Link>
                    ) : (
                      <Typography variant="body2" color="error">
                        Тема не сохранена
                      </Typography>
                    )}
                    <IconButton
                      onClick={() => handleDeleteTheme(moduleIndex, themeIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItem>
                ))}
                <ListItem>
                  <TextField
                    value={module.newThemeTitle}
                    onChange={(e) => {
                      const updatedModules = [...modules];
                      updatedModules[moduleIndex].newThemeTitle =
                        e.target.value;
                      setModules(updatedModules);
                    }}
                    placeholder="Введите название новой темы"
                    variant="outlined"
                    size="small"
                    sx={{ flexGrow: 1 }}
                  />
                  <Button
                    onClick={() => handleAddTheme(moduleIndex)}
                    variant="contained"
                    disabled={!module.newThemeTitle} // Кнопка активна только если поле не пустое
                    sx={{ marginLeft: 1 }}
                  >
                    Создать тему
                  </Button>
                </ListItem>
              </List>
            </Box>
          ))}
        </List>
        <Button
          onClick={handleAddModule}
          variant="contained"
          sx={{ margin: 2 }}
        >
          Создать модуль
        </Button>
        <Button onClick={handleSave} variant="contained" sx={{ margin: 2 }}>
          Сохранить
        </Button>
      </Box>
    </MainLayout>
  );
};

export default EditCourseContent;
