// import React, { useEffect, useState } from "react";
import { Button, Typography, Box, Divider } from "@mui/material";
import {
  Theme,
  LessonType,
  // Lesson,
  // HtmlLesson,
  // VideoLesson,
  // TestLesson,
  MultiTestLesson,
  // CodeLesson,
  // AnyLesson,
} from "../../../../../types";
import { Link, useParams } from "react-router-dom";
import NotesIcon from "@mui/icons-material/Notes";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CodeIcon from "@mui/icons-material/Code";
// import { progressApi } from "../../../../../api";
import MultiTestLessonView from "../Lessons/MultiTestLessonView";

interface ThemeWithLessonProps {
  theme: Theme;
}

const ThemeWithLesson: React.FC<ThemeWithLessonProps> = ({ theme }) => {
  const { lessonOrdinalNumber } = useParams<{ lessonOrdinalNumber: string }>();
  const curLessonOrdinalNumber = lessonOrdinalNumber
    ? parseInt(lessonOrdinalNumber)
    : 1;
  const curLesson = theme.fullLessons[curLessonOrdinalNumber - 1];

  // const handleCompleteLesson = (lesson: AnyLesson) => {
  //   progressApi.completeLesson(lesson);
  // };

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

  return (
    <div style={{ margin: "40px auto", width: "80%" }}>
      <Box display="flex" mb={3}>
        <Typography variant="h6">{theme.title}</Typography>
        <Box
          display="flex"
          flexDirection={"row"}
          alignItems={"flex-end"}
          ml={2}
        >
          {theme.fullLessons.map((lesson, index) => (
            <Box
              key={index}
              component={Link}
              to={`/theme/${theme.id}/lesson/${lesson.ordinalNumber}`}
              sx={{
                width: "30px",
                height: "30px",
                mr: 1,
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
                      ? "#368163"
                      : "gray",
                },
                borderRadius: "4px",
                position: "relative",
                textDecoration: "none",
              }}
            >
              {getContentIcon(lesson.type)}
            </Box>
          ))}
        </Box>
      </Box>
      <Divider />
      <Box mt={3} mb={3}>
        {(() => {
          switch (curLesson.type) {
            // case LessonType.HTML:
            //   return (
            //     <HtmlLessonEditor
            //       lesson={curLesson as HtmlLesson}
            //       onChange={onLessonChange}
            //       handleDeleteLesson={handleDeleteLesson}
            //     />
            //   );
            // case LessonType.VIDEO:
            //   return (
            //     <VideoLessonEditor
            //       lesson={curLesson as VideoLesson}
            //       onChange={onLessonChange}
            //       handleDeleteLesson={handleDeleteLesson}
            //     />
            //   );
            // case LessonType.TEST:
            //   return (
            //     <TestLessonEditor
            //       lesson={curLesson as TestLesson}
            //       onChange={onLessonChange}
            //       handleDeleteLesson={handleDeleteLesson}
            //     />
            //   );
            case LessonType.MULTI_TEST:
              return (
                <MultiTestLessonView lesson={curLesson as MultiTestLesson} />
              );
            // case LessonType.CODE:
            //   return (
            //     <CodeLessonEditor
            //       lesson={curLesson as CodeLesson}
            //       onChange={onLessonChange}
            //       handleDeleteLesson={handleDeleteLesson}
            //     />
            //   );
            default:
              return null;
          }
        })()}
      </Box>
      <Divider />
      <Button variant="contained" sx={{ bgcolor: "button.primary", my: 3 }}>
        Следующий урок
      </Button>
    </div>
  );
};

export default ThemeWithLesson;
