import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import MainLayout from "../../../components/layout/Main";
import { CourseToCreate } from "../../../types";
import { coursesApi } from "../../../api";

const EditCourseDescription: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const curCourseId = courseId ? parseInt(courseId) : 1;
  const [course, setCourse] = useState<CourseToCreate>({
    title: "",
    description: "",
    completionTimeInHours: 0,
  });

  const [isHovered, setIsHovered] = useState(false); // Состояние для отслеживания наведения

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const courseResponse = await coursesApi.getCourseById(curCourseId);
        setCourse(courseResponse.data);
      } catch (error) {
        console.error("Ошибка при получении данных курса:", error);
      }
    };

    fetchUserData();
  }, [curCourseId]);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setCourse({ ...course, logo: e.target.files[0] }); // Сохраняем файл
  //   }
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика для создания или редактирования курса (пока тут тока редактирование)
    try {
      coursesApi.updateCourse(curCourseId, course);
    } catch (error) {
      console.error("Ошибка при сохранении курса:", error);
      throw error; // Пробрасываем ошибку дальше
    }

    // сохранение логотипа
    // const formData = new FormData();
    // if (course.logo) {
    //   formData.append("logo", course.logo);
    // }
    // Отправка formData на сервер
  };

  return (
    <MainLayout>
      <Box sx={{ padding: 2, mb: 8 }}>
        <Typography variant="h4" mb={3}>
          Информация о курсе {courseId}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            onMouseEnter={() => setIsHovered(true)} // Наведение
            onMouseLeave={() => setIsHovered(false)} // Убрать наведение
            onClick={() => document.getElementById("logo-upload")?.click()} // Открыть выбор файла
            sx={{
              // border: course.logo
              //   ? "none"
              //   : isHovered
              //     ? "1px solid #000"
              //     : "1px dashed #ccc",
              borderRadius: 2,
              width: "200px",
              height: "200px",
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              position: "relative",
              // backgroundColor: course.logo ? "transparent" : "white",
              // "&:hover": {
              //   backgroundColor: course.logo
              //     ? "rgba(0, 0, 0, 0.1)"
              //     : "transparent",
              // },
            }}
          >
            {/* {course.logo ? (
              <img
                src={URL.createObjectURL(course.logo)} // Предварительный просмотр изображения
                alt="Логотип курса"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : ( */}
            <>
              {isHovered ? (
                <>
                  <CloudUploadIcon fontSize="large" />
                  <Typography variant="body1">Загрузить</Typography>
                </>
              ) : (
                <>
                  <ImageIcon fontSize="large" />
                  <Typography variant="body1">Логотип</Typography>
                </>
              )}
            </>
            {/* )} */}
            <input
              type="file"
              id="logo-upload"
              accept="image/*" // Ограничиваем выбор только изображениями
              //onChange={handleFileChange}
              style={{ display: "none" }} // Скрываем стандартный input
            />
          </Box>
          <TextField
            label="Название курса"
            value={course.title}
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
            fullWidth
            sx={{ mb: 2 }} // Отступ между полями
          />
          <TextField
            label="Описание"
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
            fullWidth
            sx={{ mb: 2 }} // Отступ между полями
          />
          <TextField
            label="Время прохождения курса (в часах)"
            value={course.completionTimeInHours}
            onChange={(e) =>
              setCourse({ ...course, completionTimeInHours: +e.target.value })
            }
            fullWidth
            type="number" // Указываем тип как число
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Сохранить
          </Button>
        </form>
      </Box>
    </MainLayout>
  );
};

export default EditCourseDescription;
