import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Очистка данных авторизации
    localStorage.clear();

    // Перенаправление на главную страницу
    navigate("/");
  }, [navigate]);

  return null;
};

export default LogoutPage;
