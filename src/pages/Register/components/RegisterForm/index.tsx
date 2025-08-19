import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import InvalidInputMessage from "../../../../components/InvalidInputMessage";
import Alert from "../../../../components/Alert";
import { securityApi } from "../../../../api";
import axios from "axios";

const RegisterForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const initialValues = {
    email: "",
    login: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Некорректный адрес электронной почты")
      .required("Обязательное поле"),
    login: Yup.string().required("Обязательное поле"),
    password: Yup.string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .required("Обязательное поле"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Пароли не совпадают")
      .required("Обязательное поле"),
  });

  const navigate = useNavigate();

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (values: typeof initialValues) => {
    const response = securityApi.registerUser(values);
    response.then(console.log);
    response
      .then((result) => {
        if (result.status == 201) {
          console.log(result);
          navigate("/login");
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          // Выводим статус ошибки, если он доступен
          if (error.response) {
            console.error(
              "Ошибка при регистрации:",
              error.response.status,
              error.response.data.message,
              error
            );
            setMessage(
              `Ошибка: ${error.response.data.message} с кодом ${error.response.status}. Попробуйте снова.`
            );
          } else {
            console.error("Ошибка при регистрации:", error.message);
            setMessage("Ошибка при соединении с сервером. Попробуйте снова.");
          }
        } else {
          console.error("Неизвестная ошибка:", error);
          setMessage("Произошла неизвестная ошибка. Попробуйте снова.");
        }
        setOpen(true);
      });
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        padding: 4,
        maxWidth: 400,
        margin: "auto",
        mt: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Регистрация
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur }) => (
          <Form>
            <Box sx={{ width: "100%", minHeight: "12px" }}>
              <ErrorMessage name="email" component={InvalidInputMessage} />
            </Box>

            <Field
              name="email"
              as={TextField}
              label="Электронная почта"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Box sx={{ width: "100%", minHeight: "12px" }}>
              <ErrorMessage name="login" component={InvalidInputMessage} />
            </Box>

            <Field
              name="login"
              as={TextField}
              label="Логин"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Box sx={{ width: "100%", minHeight: "12px" }}>
              <ErrorMessage name="password" component={InvalidInputMessage} />
            </Box>

            <Field
              name="password"
              as={TextField}
              label="Пароль"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Box sx={{ width: "100%", minHeight: "12px" }}>
              <ErrorMessage
                name="confirmPassword"
                component={InvalidInputMessage}
              />
            </Box>

            <Field
              name="confirmPassword"
              as={TextField}
              label="Повторите пароль"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "button.primary" }}
              fullWidth
            >
              Зарегистрироваться
            </Button>
          </Form>
        )}
      </Formik>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterForm;
