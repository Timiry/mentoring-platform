import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/Main";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/Profile";
import MessengerPage from "./pages/Messenger"

import Button from "@mui/material/Button";

function App() {
  
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
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/messenger" element={<MessengerPage />} />
        <Route path="/messenger/:chatId" element={<MessengerPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App