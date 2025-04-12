import React, { useState } from "react";
import { TextField, Typography, Box } from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { CourseToCreate } from "../../../../types";
import { coursesApi } from "../../../../api";
import { useParams } from "react-router-dom";
import SavePanel from "../../../../components/SavePanel";

interface EditCourseDescriptionProps {
  initialCourse: CourseToCreate; // Используйте initialCourse как часть пропсов
}

const EditCourseDescription: React.FC<EditCourseDescriptionProps> = ({
  initialCourse,
}) => {
  const [course, setCourse] = useState(initialCourse);
  const [isHovered, setIsHovered] = useState(false); // Состояние для отслеживания наведения

  const { courseId } = useParams<{ courseId: string }>();
  const curCourseId = courseId ? parseInt(courseId) : 1;

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setCourse({ ...course, logo: e.target.files[0] }); // Сохраняем файл
  //   }
  // };

  const handleSubmit = () => {
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
    <Box sx={{ padding: 2, margin: "20px auto 100px", width: "80%" }}>
      <Typography variant="h4" mb={3}>
        Описание
      </Typography>
      <form>
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
            border: "1px dashed #ccc",
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
      </form>
      <SavePanel handleSave={handleSubmit} />
    </Box>
  );
};

export default EditCourseDescription;
