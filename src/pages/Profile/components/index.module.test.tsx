import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import "@testing-library/jest-dom";
import Profile from ".";
// import { accountApi } from "../../../api";

describe("Profile Form Validation", () => {
  const mockInitialValues = {
    username: "testuser",
    firstName: "Иван",
    lastName: "Петров",
    phone: "+79991112233",
    photoUrl: "",
  };

  const renderForm = () => {
    return render(
      <Formik
        initialValues={mockInitialValues}
        validationSchema={Yup.object().shape({
          username: Yup.string().required("Обязательное поле"),
          firstName: Yup.string()
            .required("Обязательное поле")
            .matches(/^[а-яА-ЯёЁ]+$/, "Только русские буквы"),
          lastName: Yup.string()
            .required("Обязательное поле")
            .matches(/^[а-яА-ЯёЁ]+$/, "Только русские буквы"),
          phone: Yup.string()
            .matches(/^\+?[0-9\s\-()]+$/, "Некорректный номер телефона")
            .nullable(),
        })}
        onSubmit={jest.fn()}
      >
        {() => (
          <form>
            <TextField
              name="firstName"
              label="Имя"
              data-testid="firstName-input"
            />
            <TextField
              name="lastName"
              label="Фамилия"
              data-testid="lastName-input"
            />
            <TextField name="phone" label="Телефон" data-testid="phone-input" />
          </form>
        )}
      </Formik>
    );
  };

  test("rejects empty first name", async () => {
    renderForm();
    const input = screen.getByTestId("firstName-input");
    await userEvent.clear(input);
    await userEvent.tab();
    expect(await screen.findByText("Обязательное поле")).toBeInTheDocument();
  });

  test("rejects non-russian letters in first name", async () => {
    renderForm();
    const input = screen.getByTestId("firstName-input");
    await userEvent.type(input, "John");
    await userEvent.tab();
    expect(await screen.findByText("Только русские буквы")).toBeInTheDocument();
  });

  test("accepts valid russian first name", async () => {
    renderForm();
    const input = screen.getByTestId("firstName-input");
    await userEvent.type(input, "Александр");
    await userEvent.tab();
    expect(screen.queryByText("Только русские буквы")).not.toBeInTheDocument();
  });

  test("rejects invalid phone format", async () => {
    renderForm();
    const input = screen.getByTestId("phone-input");
    await userEvent.type(input, "invalid_phone");
    await userEvent.tab();
    expect(
      await screen.findByText("Некорректный номер телефона")
    ).toBeInTheDocument();
  });

  test("accepts valid phone formats", async () => {
    renderForm();
    const input = screen.getByTestId("phone-input");

    const validPhones = [
      "+79991112233",
      "89991112233",
      "+7 (999) 111-22-33",
      "8 (999) 111-22-33",
    ];

    for (const phone of validPhones) {
      await userEvent.clear(input);
      await userEvent.type(input, phone);
      await userEvent.tab();
      expect(
        screen.queryByText("Некорректный номер телефона")
      ).not.toBeInTheDocument();
    }
  });

  test("disables mentor toggle when name fields are empty", async () => {
    render(<Profile />);

    // jest.spyOn(accountApi, "getUserData").mockResolvedValue({
    //   data: {
    //     username: "test",
    //     firstName: "",
    //     lastName: "",
    //     phone: "",
    //     photoUrl: "",
    //   },
    // });

    await waitFor(() => {
      expect(screen.getByLabelText("Я ментор")).toBeDisabled();
      expect(
        screen.getByText("Заполните имя и фамилию, чтобы стать ментором")
      ).toBeInTheDocument();
    });
  });
});
