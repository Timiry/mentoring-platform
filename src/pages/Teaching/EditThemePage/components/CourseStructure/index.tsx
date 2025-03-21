import React from "react";
import { List, ListItem, ListItemText, Typography, Link } from "@mui/material";
import { Module } from "../../../../../types";

interface CourseStructureProps {
  courseTitle: string;
  modules: Module[];
  currentThemeId: number | null;
}

const CourseStructure: React.FC<CourseStructureProps> = ({
  courseTitle,
  modules,
  currentThemeId,
}) => {
  return (
    <div
      style={{
        width: "250px",
        // padding: "10px",
        borderRight: "1px solid #ccc",
        position: "absolute",
        top: "60px",
        left: "0",
        bottom: "0",
      }}
    >
      <Typography variant="h6" p={2}>
        {courseTitle}
      </Typography>
      <List
        sx={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 180px)",
          "&::-webkit-scrollbar": {
            width: "4px", // Ширина полосы прокрутки
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc", // Цвет полосы прокрутки
            borderRadius: "5px", // Закругление углов полосы прокрутки
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555", // Цвет полосы прокрутки при наведении
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1", // Цвет фона полосы прокрутки
          },
        }}
      >
        {modules.map((module) => (
          <div key={module.id}>
            <Typography variant="subtitle1" pl={2}>
              {module.title}
            </Typography>
            <List>
              {module.themes.map((theme) => (
                <ListItem
                  key={theme.id}
                  component={Link}
                  href={`/edit-theme/${theme.id}/lesson/1`}
                  sx={{
                    paddingLeft: 3,
                    backgroundColor:
                      theme.id === currentThemeId ? "#419D78" : "transparent",
                    "&:hover": {
                      backgroundColor:
                        theme.id === currentThemeId ? "#419D78" : "#f0f0f0",
                    },
                  }}
                >
                  <ListItemText primary={theme.title} />
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </List>
    </div>
  );
};

export default CourseStructure;
