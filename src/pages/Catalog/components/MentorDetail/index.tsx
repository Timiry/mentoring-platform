import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Course, MentorDataToShow } from "../../../../types";
import { communicationApi, coursesApi } from "../../../../api";
import { useNavigate } from "react-router-dom";

interface MentorDetailProps {
  mentor: MentorDataToShow;
}

const MentorDetail: React.FC<MentorDetailProps> = ({ mentor }) => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchMentorCourses = async () => {
      try {
        const coursesRequest = await coursesApi.getCoursesByMentorId(
          mentor.userId
        );
        setCourses(coursesRequest.data);
      } catch (error) {
        console.error("Ошибка при загрузке курсов ментора:", error);
      }
    };

    fetchMentorCourses();
  }, [mentor]);

  const handleApply = (courseId: number) => {
    // Обработчик подачи заявки на курс
    console.log(`Заявка на курс ${courseId} отправлена`);
    // В реальном приложении здесь будет вызов API
  };

  const openChat = async (userId: number) => {
    try {
      // Получаем все чаты текущего пользователя
      const response = await communicationApi.getUserChats();

      if (response.status === 200) {
        console.log(response);
        const chats = response.data.content;
        let chatFound = false;

        for (const chat of chats) {
          // Проверяем, есть ли потенциальный собеседник в участниках чата
          const members = chat.members;
          if (members.includes(userId)) {
            console.log("Нашелся же", chat.chatId);
            navigate(`/messenger/${chat.chatId}`); // Если участник найден, отображаем этот чат
            chatFound = true;
            break; // Выходим из цикла, так как чат найден
          }
        }

        // Если не нашли чат, создаем новый
        if (!chatFound) {
          const responseCreate = await communicationApi.createChat();
          if (responseCreate.status === 200) {
            const chatId = responseCreate.data.chatId;
            console.log("Создан чат с id: ", chatId);

            const responseInvite = await communicationApi.inviteUserToChat(
              chatId,
              userId
            );
            if (responseInvite.status === 200) {
              console.log("В чат с id: ", chatId, " добавлен юзер ", userId);
              navigate(`/messenger/${chatId}`);
            } else {
              console.log("Ошибка при добавлении юзера в чат", responseInvite);
            }
          } else {
            console.log("Ошибка при создании чата", responseCreate);
          }
        }
      }
    } catch (error) {
      console.log("Ошибка:", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
        <Avatar
          src={mentor.avatarUrl}
          alt={`${mentor.firstName} ${mentor.lastName}`}
          sx={{ width: 100, height: 100, marginRight: 2 }}
        />
        <Box>
          <Typography variant="h5">{`${mentor.firstName} ${mentor.lastName}`}</Typography>
          <Typography variant="subtitle1">@{mentor.username}</Typography>
          <Typography variant="body2" color="textSecondary">
            Специализации: {mentor.specializations.join(", ")}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary">
                        Количество студентов: {mentor.studentsCount}
                    </Typography> */}
        </Box>
        <Box width="100%" display="flex" justifyContent="end">
          <Button
            variant="contained"
            size="large"
            sx={{ bgcolor: "button.primary" }}
            onClick={() => openChat(mentor.userId)}
          >
            Связаться с ментором
          </Button>
        </Box>
      </Box>
      <Box display="flex">
        <Box maxWidth="450px">
          <Typography variant="h6" mb={2}>
            Краткая информация:
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {mentor.shortAboutMe}
          </Typography>
          <Typography variant="h6" mb={2}>
            Подробная информация:
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {mentor.longAboutMe}
          </Typography>
        </Box>
        <Box width="600px">
          <Typography variant="h6" sx={{ ml: 2 }}>
            Курсы ментора
          </Typography>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {courses.map((course) => (
              <React.Fragment key={course.id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleApply(course.id)}
                      sx={{
                        color: "button.primary",
                        borderColor: "button.primary",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Подать заявку
                    </Button>
                  }
                >
                  <ListItemAvatar>
                    <Avatar alt={course.title} src={course?.logo} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={course.title}
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "inline-block",
                          width: "380px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {course.description}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default MentorDetail;
