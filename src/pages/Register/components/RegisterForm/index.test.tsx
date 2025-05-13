import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import RegisterForm from "./index";
import { securityApi } from "../../../../api";

// Мокаем axios для обработки ошибок
jest.mock("axios");

describe("RegisterForm Integration Test", () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    // Очищаем моки перед каждым тестом
    jest.clearAllMocks();
  });

  test("should navigate to /login after successful registration", async () => {
    jest.spyOn(securityApi, "registerUser").mockResolvedValue({
      status: 201,
      data: { message: "User registered successfully" },
    });

    render(
      <Router location={history.location} navigator={history}>
        <RegisterForm />
      </Router>
    );

    await userEvent.type(
      screen.getByLabelText("Электронная почта"),
      "test@example.com"
    );
    await userEvent.type(screen.getByLabelText("Логин"), "testuser");
    await userEvent.type(screen.getByLabelText("Пароль"), "password123");
    await userEvent.type(
      screen.getByLabelText("Повторите пароль"),
      "password123"
    );

    await userEvent.click(
      screen.getByRole("button", { name: /Зарегистрироваться/i })
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe("/login");
    });
  });

  test("should show error message when registration fails", async () => {
    // Мокаем ошибку от API
    (securityApi.registerUser as jest.Mock).mockRejectedValue({
      isAxiosError: true,
      response: {
        status: 400,
        data: { message: "Email already exists" },
      },
    });

    render(
      <Router location={history.location} navigator={history}>
        <RegisterForm />
      </Router>
    );

    // Заполняем форму
    await userEvent.type(
      screen.getByLabelText("Электронная почта"),
      "test@example.com"
    );
    await userEvent.type(screen.getByLabelText("Логин"), "testuser");
    await userEvent.type(screen.getByLabelText("Пароль"), "password123");
    await userEvent.type(
      screen.getByLabelText("Повторите пароль"),
      "password123"
    );

    // Отправляем форму
    await userEvent.click(
      screen.getByRole("button", { name: /Зарегистрироваться/i })
    );

    // Проверяем отображение сообщения об ошибке
    await waitFor(() => {
      expect(
        screen.getByText(/Ошибка: Email already exists с кодом 400/i)
      ).toBeInTheDocument();
    });
  });

  test("should show network error message when connection fails", async () => {
    // Мокаем ошибку сети
    (securityApi.registerUser as jest.Mock).mockRejectedValue({
      isAxiosError: true,
      message: "Network Error",
    });

    render(
      <Router location={history.location} navigator={history}>
        <RegisterForm />
      </Router>
    );

    // Заполняем форму
    await userEvent.type(
      screen.getByLabelText("Электронная почта"),
      "test@example.com"
    );
    await userEvent.type(screen.getByLabelText("Логин"), "testuser");
    await userEvent.type(screen.getByLabelText("Пароль"), "password123");
    await userEvent.type(
      screen.getByLabelText("Повторите пароль"),
      "password123"
    );

    // Отправляем форму
    await userEvent.click(
      screen.getByRole("button", { name: /Зарегистрироваться/i })
    );

    // Проверяем отображение сообщения об ошибке сети
    await waitFor(() => {
      expect(
        screen.getByText(/Ошибка при соединении с сервером/i)
      ).toBeInTheDocument();
    });
  });
});
