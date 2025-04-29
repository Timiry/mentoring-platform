import React from "react";
import { List, ListItem, ListItemText, Typography, Link } from "@mui/material";
import { Module } from "../../../../../types";
import { MuiTooltip } from "../../../../../components/MuiTooltip";

interface CourseStructureWithProgressProps {
  courseTitle: string;
  modules: Module[];
  currentThemeId: number | null;
}

const CourseStructureWithProgress: React.FC<
  CourseStructureWithProgressProps
> = ({ courseTitle, modules, currentThemeId }) => {
  return (
    <div
      style={{
        width: "250px",
        borderRight: "1px solid #ccc",
        position: "fixed",
        top: "60px",
        left: "0",
        bottom: "0",
        backgroundColor: "#2D3047",
      }}
    >
      <Link
        href={`/courses/${modules[0].courseId}/edit-content`}
        sx={{
          color: "#ffffff",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        <Typography variant="h6" p={2}>
          {courseTitle}
        </Typography>
      </Link>
      <List
        sx={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 180px)",
          marginRight: "2px",
          paddingRight: "2px",
          "&::-webkit-scrollbar": {
            width: "6px", // Ширина полосы прокрутки
            marginRight: "2px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc", // Цвет полосы прокрутки
            borderRadius: "5px", // Закругление углов полосы прокрутки
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#2D3047", // Цвет фона полосы прокрутки
          },
        }}
      >
        {modules.map((module) => (
          <div key={module.id}>
            <MuiTooltip
              title={module.title}
              arrow
              placement="right"
              key={module.id}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#ffffff",
                  padding: 2,
                  "&:hover": {
                    backgroundColor: "#383B57",
                  },
                  whiteSpace: "nowrap", // Запретить перенос слов
                  overflow: "hidden", // Обрезать текст
                  textOverflow: "ellipsis", // вставить многоточие
                }}
              >
                {module.ordinalNumber} {module.title}
              </Typography>
            </MuiTooltip>
            <List>
              {module.themes.map((theme) => (
                <MuiTooltip
                  title={theme.title}
                  arrow
                  placement="right"
                  key={theme.id}
                >
                  <ListItem
                    component={Link}
                    href={`/edit-theme/${theme.id}/lesson/1`}
                    sx={{
                      color: "#ffffff",
                      paddingLeft: 5,
                      borderRadius: "1px",
                      backgroundColor:
                        theme.id === currentThemeId ? "#419D78" : "transparent",
                      "&:hover": {
                        backgroundColor:
                          theme.id === currentThemeId ? "#419D78" : "#383B57",
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            whiteSpace: "nowrap", // Запретить перенос слов
                            overflow: "hidden", // Обрезать текст
                            textOverflow: "ellipsis", // Вставить многоточие
                            display: "block",
                            width: "100%",
                          }}
                        >
                          {`${module.ordinalNumber}.${theme.ordinalNumber} ${theme.title}`}
                        </Typography>
                      }
                    />
                  </ListItem>
                </MuiTooltip>
              ))}
            </List>
          </div>
        ))}
      </List>
    </div>
  );
};

export default CourseStructureWithProgress;
