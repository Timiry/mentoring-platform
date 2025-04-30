import React, { useEffect, useState } from "react";
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
import { Module, ModuleToGet, Theme, ThemeToGet } from "../../../../types";
import { coursesApi } from "../../../../api";
import SavePanel from "../../../../components/SavePanel";

const EditCourseContent: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const curCourseId = courseId ? parseInt(courseId) : 1;
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    const getModulesWithThemesByCourseId = async (courseId: number) => {
      try {
        // Получаем модули курса
        const modulesResponse = await coursesApi.getModulesByCourse(courseId);
        const modules: ModuleToGet[] = modulesResponse.data; // Предполагаем, что данные находятся в response.data

        // Получаем все темы курса
        const themesResponse = await coursesApi.getThemeByCourse(courseId);
        const themes: ThemeToGet[] = themesResponse.data; // Предполагаем, что данные находятся в response.data

        // Итерируемся по каждому модулю и добавляем соответствующие темы
        const modulesWithThemes = modules.map((module) => {
          const moduleThemes = themes
            .filter((theme) => theme.moduleId === module.id) // Фильтруем темы по moduleId
            .map((theme) => ({
              ...theme,
              lessons: [], // Инициализируем массив уроков, если он отсутствует
              fullLessons: [], // Инициализируем массив полных уроков
              wasChanged: false,
            }));

          return {
            ...module,
            newThemeTitle: "", // Инициализируем новое название темы
            themes: moduleThemes, // Добавляем темы к модулю
            wasChanged: false,
          };
        });

        setModules(modulesWithThemes); // Возвращаем массив модулей с их темами
      } catch (error) {
        console.error("Ошибка при получении модулей и тем:", error);
        throw error; // Пробрасываем ошибку дальше
      }
    };

    getModulesWithThemesByCourseId(curCourseId);
  }, [curCourseId]);

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
      themes: [],
      newThemeTitle: "",
      ordinalNumber: modules.length + 1,
      description: "",
      courseId: 0,
      wasChanged: false,
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
        ordinalNumber: index + 1,
        wasChanged: index >= module.ordinalNumber - 1 ? true : false,
      }));
    setModules(updatedModules);
  };

  const handleAddTheme = (moduleIndex: number) => {
    const newTheme: Theme = {
      title: modules[moduleIndex].newThemeTitle,
      lessons: [],
      ordinalNumber: modules[moduleIndex].themes.length + 1,
      description: "",
      moduleId: 0,
      fullLessons: [],
      contentType: "",
      wasChanged: false,
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
        wasChanged: index >= themeIndex ? true : false,
      }));
    setModules(updatedModules);
  };

  const handleSave = () => {
    try {
      // Отправка запросов для удаления модулей и тем
      deletedIds.moduleIds.forEach((id) => {
        // Отправка запроса на удаление модуля с id
        coursesApi.deleteModule(id);
        console.log(`Удаление модуля с id: ${id}`);
      });
      deletedIds.themeIds.forEach((id) => {
        // Отправка запроса на удаление темы с id
        coursesApi.deleteTheme(id);
        console.log(`Удаление темы с id: ${id}`);
      });

      // Проход по всему списку модулей
      // Отправка запросов на создание модулей и тем без id
      // А также отправка запросов на изменение названий модулей с id
      modules.forEach(async (module) => {
        if (!module.id) {
          // Отправка запроса на создание нового модуля
          const newModuleRequest = await coursesApi.createModule(module);
          module.id = newModuleRequest.data.id;
          console.log(`Создание нового модуля: ${module.title}`);
        } else if (module.wasChanged) {
          // Отправка запроса на изменение сохраненного модуля
          coursesApi.updateModule(module.id, module);
          console.log(`Изменение модуля ${module.title}`);
          module.wasChanged = false;
        }
        module.themes.forEach(async (theme) => {
          if (!theme.id) {
            // Отправка запроса на создание новой темы
            const newThemeRequest = await coursesApi.createTheme(theme);
            theme.id = newThemeRequest.data.id;
            console.log(`Создание новой темы: ${theme.title}`);
          } else if (theme.wasChanged) {
            // Отправка запроса на изменение сохраненной темы
            coursesApi.updateTheme(theme.id, theme);
            console.log(`Изменение темы ${theme.title}`);
            theme.wasChanged = false;
          }
        });
      });
    } catch (error) {
      console.error("Ошибка при сохранении модулей и тем:", error);
      throw error; // Пробрасываем ошибку дальше
    }
  };

  return (
    <Box sx={{ padding: 2, margin: "20px auto 100px", width: "80%" }}>
      <Typography variant="h4" mb={3}>
        Программа курса
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
                sx={{ marginLeft: 1, marginRight: 1, width: "400px" }}
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
                      sx={{
                        textDecoration: "none",
                        padding: 0,
                        cursor: "pointer",
                      }}
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
                    updatedModules[moduleIndex].newThemeTitle = e.target.value;
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
                  sx={{ marginLeft: 1, bgcolor: "button.primary" }}
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
        sx={{ bgcolor: "button.primary" }}
      >
        Создать модуль
      </Button>
      <SavePanel handleSave={handleSave} />
    </Box>
  );
};

export default EditCourseContent;
