import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/Main";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/Profile";
import MessengerPage from "./pages/Messenger";
import TeachingPage from "./pages/Teaching/TeachingPage";

import Button from "@mui/material/Button";
import CatalogPage from "./pages/Catalog";
import LogoutPage from "./pages/Logout";
import { useEffect, useState } from "react";
import WebSocketService from "./services/WebSocketService";
import * as Stomp from "stompjs";
import { Snackbar } from "@mui/material";
import Alert from "./components/Alert";
import { communicationApi } from "./api";
import { AccountData } from "./types";
import EditTheme from "./pages/Teaching/EditThemePage";
import EditCoursePage from "./pages/Teaching/EditCoursePage";

function App() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const connect = async () => {
      const handleNotificationMessage = async (stompMessage: Stomp.Message) => {
        const message = JSON.parse(stompMessage.body);
        const members = await communicationApi.getChatUsers(message.fromChatId);
        const currentUserId = Number(
          JSON.parse(atob(localStorage.accessToken.split(".")[1])).sub
        );
        const member = members.data.content.find(
          (m: AccountData) => m.id !== currentUserId
        );
        setMessage(
          `Новое сообщение от ${member.firstName} ${member.lastName}: ${message.smallContent}`
        );
        setOpen(true);
        console.log(
          `Новое сообщение от ${member.firstName} ${member.lastName}: ${message.smallContent}`
        );
      };
      if (localStorage.accessToken) {
        const currentUserId = Number(
          JSON.parse(atob(localStorage.accessToken.split(".")[1])).sub
        );
        WebSocketService.connectToUserTopic(
          localStorage.accessToken,
          currentUserId,
          handleNotificationMessage
        ); // Подключаемся к топику с уведомлениями
      }
    };

    connect();
  });

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <ErrorBoundary
      fallback={
        <div>
          <span>Что-то пошло не так...</span>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Обновить страницу
          </Button>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/messenger" element={<MessengerPage />} />
        <Route path="/messenger/:chatId" element={<MessengerPage />} />
        <Route path="/teaching" element={<TeachingPage />} />
        <Route
          path="/courses/:courseId/edit-description"
          element={<EditCoursePage />}
        />
        <Route
          path="/courses/:courseId/edit-content"
          element={<EditCoursePage />}
        />
        <Route
          path="/edit-theme/:themeId/lesson/:lessonOrdinalNumber"
          element={<EditTheme />}
        />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {message}
        </Alert>
      </Snackbar>
    </ErrorBoundary>
  );
}

export default App;
