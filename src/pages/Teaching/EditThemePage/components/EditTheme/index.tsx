import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Theme,
  LessonType,
  Lesson,
  HtmlLesson,
  VideoLesson,
  TestLesson,
  MultiTestLesson,
  CodeLesson,
  AnyLesson,
} from "../../../../../types";
import HtmlLessonEditor from "../Lessons/HtmlLessonEditor";
import VideoLessonEditor from "../Lessons/VideoLessonEditor";
import TestLessonEditor from "../Lessons/TestLessonEditor";
import MultiTestLessonEditor from "../Lessons/MultiTestLessonEditor";
import CodeLessonEditor from "../Lessons/CodeLessonEditor";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotesIcon from "@mui/icons-material/Notes";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CodeIcon from "@mui/icons-material/Code";
import AddIcon from "@mui/icons-material/Add";

interface EditThemeProps {
  theme: Theme;
  saveChanges: (themeId: number, deletedLessonsIds: number[]) => void;
  changeTheme: (updatedTheme: Theme) => void;
}

const EditTheme: React.FC<EditThemeProps> = ({
  theme,
  changeTheme,
  saveChanges,
}) => {
  const { lessonOrdinalNumber } = useParams<{ lessonOrdinalNumber: string }>();
  const curLessonOrdinalNumber = lessonOrdinalNumber
    ? parseInt(lessonOrdinalNumber)
    : 1;
  const curLesson = theme.fullLessons[curLessonOrdinalNumber - 1];

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [deletedLessonsIds, setDeletedLessonsIds] = useState<number[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeTheme({ ...theme, title: e.target.value, wasChanged: true });
    setHasUnsavedChanges(true); // Отмечаем, что есть несохраненные изменения
  };

  const handleSave = () => {
    if (theme.title.trim() !== "") {
      saveChanges(theme.id ?? 0, deletedLessonsIds);
      theme.wasChanged = false;
      setHasUnsavedChanges(false); // Сбрасываем флаг после сохранения
    }
  };

  const getContentIcon = (type: LessonType) => {
    switch (type) {
      case LessonType.VIDEO:
        return <PlayArrowIcon />;
      case LessonType.TEST:
      case LessonType.MULTI_TEST:
        return <QuestionMarkIcon />;
      case LessonType.CODE:
        return <CodeIcon />;
      case LessonType.HTML:
        return <NotesIcon />;
      default:
        return null; // Пустое содержимое
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = ""; // Стандартный текст предупреждения
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleCreateLesson = (lessonType: LessonType) => {
    const newLesson: Lesson = {
      ordinalNumber: theme.fullLessons.length + 1,
      type: lessonType,
      themeId: theme.id ?? 0, // костыыыль(!)
      wasChanged: false,
    };

    // Создание урока в зависимости от типа
    let specificLesson: AnyLesson;

    switch (lessonType) {
      case LessonType.HTML:
        specificLesson = {
          ...newLesson,
          html: "<p>Вы можете добавить сюда текст, математические формулы, примеры кода и многое другое.</p>",
        } as HtmlLesson;
        break;
      case LessonType.VIDEO:
        specificLesson = { ...newLesson, videoUrl: "" } as VideoLesson;
        break;
      case LessonType.TEST:
        specificLesson = {
          ...newLesson,
          condition:
            "Вы можете изменить условие задания в этом поле и указать настройки ниже. Чему равняется 2+2 ?",
          possibleAnswers: ["5", "4", "6"],
          answer: "4",
        } as TestLesson;
        break;
      case LessonType.MULTI_TEST:
        specificLesson = {
          ...newLesson,
          condition:
            "Вы можете изменить условие задания в этом поле и указать настройки ниже. Какие из указанных цветов есть в радуге?",
          possibleAnswers: ["Красный", "Коричневый", "Фиолетовый", "Серый"],
          correctAnswers: ["Красный", "Фиолетовый"],
        } as MultiTestLesson;
        break;
      case LessonType.CODE:
        specificLesson = {
          ...newLesson,
          condition:
            "Вы можете изменить условие задания в этом поле и указать настройки ниже. Напишите программу для сложения двух чисел.",
          codeTests: [
            {
              input: "7 8",
              output: "15",
            },
          ],
        } as CodeLesson;
        break;
      default:
        return; // Неизвестный тип урока
    }

    const updatedTheme = {
      ...theme,
      fullLessons: [...theme.fullLessons, specificLesson],
      wasChanged: true,
    };
    changeTheme(updatedTheme); // Обновляем тему
    setHasUnsavedChanges(true); // Устанавливаем флаг при создании нового урока

    // Переход к новому уроку
    navigate(`/edit-theme/${theme.id}/lesson/${newLesson.ordinalNumber}`);
    handleCloseDialog(); // Закрываем диалог
  };

  const handleDeleteLesson = (lesson: AnyLesson) => {
    if (theme.fullLessons.length == 1) {
      console.log("В теме должен быть хотя бы 1 урок");
      return;
    }
    if (lesson.id != undefined) {
      const id = lesson.id;
      setDeletedLessonsIds((prev) => [...prev, id]);
    }
    const updatedTheme = {
      ...theme,
      fullLessons: theme.fullLessons
        .filter((les) => les.ordinalNumber !== lesson.ordinalNumber)
        .map((les, index) => ({
          ...les,
          ordinalNumber: index + 1,
          wasChanged: index >= lesson.ordinalNumber - 1 ? true : false,
        })),
    };
    if (theme.fullLessons.length == lesson.ordinalNumber) {
      navigate(`/edit-theme/${theme.id}/lesson/${lesson.ordinalNumber - 1}`);
    }
    changeTheme(updatedTheme);
  };

  const onLessonChange = (updatedLesson: AnyLesson) => {
    const updatedLessons = theme.fullLessons.map((lesson) =>
      lesson.ordinalNumber === updatedLesson.ordinalNumber
        ? updatedLesson
        : lesson
    );
    const updatedTheme = { ...theme, fullLessons: updatedLessons };
    changeTheme(updatedTheme);
    setHasUnsavedChanges(true); // Устанавливаем флаг при изменении урока
  };

  return (
    <div style={{ marginLeft: "200px", padding: "20px", width: "100%" }}>
      <TextField
        label="Название темы"
        value={theme.title}
        onChange={handleTitleChange}
        variant="outlined"
        fullWidth
      />
      {theme.title.trim() === "" && (
        <Typography color="error">Придумайте название темы</Typography>
      )}
      <Box
        display="flex"
        flexDirection={"row"}
        mt={3}
        mb={3}
        alignItems={"flex-end"}
      >
        {theme.fullLessons.map((lesson, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mr: 1,
            }}
          >
            <Typography variant="B6Medium" color="text.secondary">
              {lesson.ordinalNumber}
            </Typography>
            <Box
              component={Link}
              to={`/edit-theme/${theme.id}/lesson/${lesson.ordinalNumber}`}
              sx={{
                width: "50px",
                height: "50px",
                color: "white",
                backgroundColor:
                  lesson.ordinalNumber === curLessonOrdinalNumber
                    ? "#419D78"
                    : "darkgray",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor:
                    lesson.ordinalNumber === curLessonOrdinalNumber
                      ? "darkgreen"
                      : "gray",
                },
                borderRadius: "8px",
                position: "relative",
                textDecoration: "none",
              }}
            >
              {getContentIcon(lesson.type)}
            </Box>
          </Box>
        ))}
        <Box
          component={Button}
          onClick={handleOpenDialog}
          sx={{
            width: "50px",
            height: "50px",
            backgroundColor: "#E0A458",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "darkblue",
            },
            borderRadius: "8px",
            position: "relative",
            textDecoration: "none",
            padding: "0",
            paddingBlock: "0",
            paddingInline: "0",
          }}
        >
          <AddIcon />
        </Box>
      </Box>

      <Box>
        {(() => {
          switch (curLesson.type) {
            case LessonType.HTML:
              return (
                <HtmlLessonEditor
                  lesson={curLesson as HtmlLesson}
                  onChange={onLessonChange}
                  handleDeleteLesson={handleDeleteLesson}
                />
              );
            case LessonType.VIDEO:
              return (
                <VideoLessonEditor
                  lesson={curLesson as VideoLesson}
                  onChange={onLessonChange}
                  handleDeleteLesson={handleDeleteLesson}
                />
              );
            case LessonType.TEST:
              return (
                <TestLessonEditor
                  lesson={curLesson as TestLesson}
                  onChange={onLessonChange}
                  handleDeleteLesson={handleDeleteLesson}
                />
              );
            case LessonType.MULTI_TEST:
              return (
                <MultiTestLessonEditor
                  lesson={curLesson as MultiTestLesson}
                  onChange={onLessonChange}
                  handleDeleteLesson={handleDeleteLesson}
                />
              );
            case LessonType.CODE:
              return (
                <CodeLessonEditor
                  lesson={curLesson as CodeLesson}
                  onChange={onLessonChange}
                  handleDeleteLesson={handleDeleteLesson}
                />
              );
            default:
              return null;
          }
        })()}
      </Box>

      {/* панель внизу экрана с кнопкой "сохранить" */}
      <Box
        sx={{
          // width: "100%",
          //height: "50px",
          padding: 1,
          backgroundColor: "#F0F0F0",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "end",
          position: "absolute",
          left: "250px",
          right: "0",
          bottom: "0",
        }}
      >
        <Button variant="contained" onClick={handleSave}>
          Сохранить
        </Button>
      </Box>

      {/* Модальное окно для выбора типа урока */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Выберите тип урока</DialogTitle>
        <DialogContent>
          <List>
            <ListItem
              component={Button}
              onClick={() => handleCreateLesson(LessonType.HTML)}
            >
              <NotesIcon />
              <ListItemText primary="Текст" />
            </ListItem>
            <ListItem
              component={Button}
              onClick={() => handleCreateLesson(LessonType.VIDEO)}
            >
              <PlayArrowIcon />
              <ListItemText primary="Видео" />
            </ListItem>
            <ListItem
              component={Button}
              onClick={() => handleCreateLesson(LessonType.TEST)}
            >
              <QuestionMarkIcon />
              <ListItemText primary="Тест" />
            </ListItem>
            <ListItem
              component={Button}
              onClick={() => handleCreateLesson(LessonType.MULTI_TEST)}
            >
              <QuestionMarkIcon />
              <ListItemText primary="Множественный тест" />
            </ListItem>
            <ListItem
              component={Button}
              onClick={() => handleCreateLesson(LessonType.CODE)}
            >
              <CodeIcon />
              <ListItemText primary="Программирование" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Отмена</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTheme;
