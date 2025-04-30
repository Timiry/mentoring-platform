import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Dialog,
  Chip,
  FormControlLabel,
  Alert,
  Snackbar,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { accountApi, mentorCatalogApi } from "../../../api";
import { AccountData, MentorDataToCreate, RawMentorData } from "../../../types";
import InvalidInputMessage from "../../../components/InvalidInputMessage";
import chekTokens from "../../../services/CheckTokens";
import MuiSwitch from "../../../components/MuiSwitch";

const validationSchema = Yup.object().shape({
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
});

const mentorValidationSchema = Yup.object().shape({
  shortAboutMe: Yup.string()
    .required("Краткая информация обязательна")
    .max(100, "Максимум 100 символов"),
  longAboutMe: Yup.string()
    .required("Подробная информация обязательна")
    .max(500, "Максимум 500 символов"),
  specializations: Yup.string()
    .required("Специализации обязательны")
    .test(
      "at-least-one-specialization",
      "Укажите хотя бы одну специализацию",
      (value) =>
        !!value && value.split(",").filter((item) => item.trim()).length > 0
    ),
});

const Profile: React.FC = () => {
  const [initialValues, setInitialValues] = useState<AccountData | null>();
  const [mentorValues, setMentorValues] = useState<RawMentorData>({
    userId: 1,
    shortAboutMe: "",
    longAboutMe: "",
    specializations: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [isMentorDialogOpen, setIsMentorDialogOpen] = useState(false);
  const [mentorStatus, setMentorStatus] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        chekTokens();
        const { data } = await accountApi.getUserData();
        setInitialValues(data);

        // Проверяем, является ли пользователь ментором
        if (data.userStatus === "mentor") {
          const mentorData = await mentorCatalogApi.getMentorById(data.id);
          setMentorValues({
            userId: data.id,
            shortAboutMe: mentorData.data.shortAboutMe,
            longAboutMe: mentorData.data.longAboutMe,
            specializations: mentorData.data.specializations.join(", "),
          });
          setMentorStatus(true);
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        setSnackbarMessage("Ошибка при получении данных");
        setSeverity("error");
        setOpenSnackbar(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileSubmit = async (values: AccountData) => {
    try {
      setIsLoading(true);
      chekTokens();

      await accountApi.updateUserData({
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      });

      if (photo) {
        await accountApi.addAvatar(photo);
      }

      setSnackbarMessage("Данные успешно обновлены");
      setSeverity("success");
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
      setSnackbarMessage("Ошибка при обновлении данных");
      setSeverity("error");
    } finally {
      setOpenSnackbar(true);
      setIsLoading(false);
    }
  };

  const handleMentorSubmit = async (values: RawMentorData) => {
    try {
      setIsLoading(true);
      // chekTokens();

      const mentorData: MentorDataToCreate = {
        ...values,
        specializations: values.specializations
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
      };

      if (mentorStatus) {
        await mentorCatalogApi.updateMentor(mentorData);
        setSnackbarMessage("Данные ментора обновлены");
      } else {
        await mentorCatalogApi.createMentor(mentorData);
        setMentorStatus(true);
        setSnackbarMessage("Вы успешно стали ментором!");
      }

      setSeverity("success");
      setIsMentorDialogOpen(false);
    } catch (error) {
      console.error("Ошибка:", error);
      setSnackbarMessage("Ошибка при сохранении данных ментора");
      setSeverity("error");
    } finally {
      setOpenSnackbar(true);
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleMentorToggle = () => {
    if (!mentorStatus) {
      setIsMentorDialogOpen(true);
    } else {
      // Здесь можно добавить логику для отключения статуса ментора
      setSnackbarMessage("Функция отключения менторства в разработке");
      setOpenSnackbar(true);
    }
  };

  const isProfileComplete = (values: AccountData) => {
    return values.firstName && values.lastName;
  };

  if (isLoading && !initialValues) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!initialValues) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">
          Не удалось загрузить данные профиля
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", padding: 3 }}>
      <Paper elevation={3} sx={{ borderRadius: 2, padding: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          mb={4}
        >
          Личный профиль
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleProfileSubmit}
          enableReinitialize
        >
          {({ isSubmitting, values }) => (
            <Form>
              {/* Основной контейнер с тремя колонками */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 4,
                }}
              >
                {/* Левый блок - аватар */}
                <Box
                  sx={{
                    width: { md: "25%" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="User Photo"
                    src={
                      photo
                        ? URL.createObjectURL(photo)
                        : initialValues.photoUrl || "/avatars/data_wizard.jpg"
                    }
                    sx={{
                      width: 150,
                      height: 150,
                      mb: 3,
                      border: "2px solid",
                    }}
                  />
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="photo-upload"
                    type="file"
                    onChange={(e) =>
                      e.target.files && setPhoto(e.target.files[0])
                    }
                  />
                  <label htmlFor="photo-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      fullWidth
                      sx={{
                        mb: 2,
                        color: "button.primary",
                        borderColor: "button.primary",
                      }}
                    >
                      {photo ? "Изменить фото" : "Загрузить фото"}
                    </Button>
                  </label>
                </Box>

                {/* Правый блок - основная информация */}
                <Box
                  sx={{
                    width: { md: "50%" },
                    flex: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ width: "calc(50% - 8px)" }}>
                      <Field
                        name="username"
                        as={TextField}
                        label="Логин"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <ErrorMessage
                        name="username"
                        component={InvalidInputMessage}
                      />
                    </Box>
                    <Box sx={{ width: "calc(50% - 8px)" }}>
                      <Field
                        name="phone"
                        as={TextField}
                        label="Телефон"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        placeholder="+7 (XXX) XXX-XX-XX"
                      />
                      <ErrorMessage
                        name="phone"
                        component={InvalidInputMessage}
                      />
                    </Box>
                    <Box sx={{ width: "calc(50% - 8px)" }}>
                      <Field
                        name="firstName"
                        as={TextField}
                        label="Имя"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <ErrorMessage
                        name="firstName"
                        component={InvalidInputMessage}
                      />
                    </Box>
                    <Box sx={{ width: "calc(50% - 8px)" }}>
                      <Field
                        name="lastName"
                        as={TextField}
                        label="Фамилия"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                      <ErrorMessage
                        name="lastName"
                        component={InvalidInputMessage}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end", // Выравнивание по правому краю
                      width: "100%",
                      my: 3,
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      sx={{
                        width: { xs: "100%", sm: "auto" }, // На мобильных - на всю ширину, на десктопе - по содержимому
                        minWidth: 200, // Фиксированная минимальная ширина
                        backgroundColor: "button.primary",
                      }}
                    >
                      {isSubmitting ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Сохранить изменения"
                      )}
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Divider />
              <Box>
                {/* Нижний блок - менторская информация */}
                <Box
                  sx={{
                    width: { md: "25%" },
                  }}
                >
                  <Box display="flex" flexDirection="column">
                    <FormControlLabel
                      control={
                        <MuiSwitch
                          checked={mentorStatus}
                          onChange={handleMentorToggle}
                          color="primary"
                          disabled={!isProfileComplete(values)}
                        />
                      }
                      label="Я ментор"
                      sx={{ m: 1 }}
                    />

                    {!isProfileComplete(values) && (
                      <Alert severity="info" sx={{ mb: 2 }}>
                        Заполните имя и фамилию, чтобы стать ментором
                      </Alert>
                    )}

                    {mentorStatus && (
                      <Box display="flex">
                        <Box width="50%" display="flex" flexDirection="column">
                          <Typography variant="subtitle1" gutterBottom>
                            Кратко о себе:
                          </Typography>
                          <Typography variant="body2" paragraph>
                            {mentorValues.shortAboutMe || "Не указано"}
                          </Typography>

                          <Typography variant="subtitle1" gutterBottom>
                            Специализации:
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 1,
                              mb: 2,
                            }}
                          >
                            {mentorValues.specializations ? (
                              mentorValues.specializations
                                .split(",")
                                .map((spec, i) => (
                                  <Chip
                                    key={i}
                                    label={spec.trim()}
                                    size="small"
                                  />
                                ))
                            ) : (
                              <Typography variant="body2">
                                Не указаны
                              </Typography>
                            )}
                          </Box>
                        </Box>
                        <Box width="50%" display="flex" flexDirection="column">
                          <Typography variant="subtitle1" gutterBottom>
                            Подробно о себе:
                          </Typography>
                          <Typography variant="body2" paragraph>
                            {mentorValues.longAboutMe || "Не указано"}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end", // Выравнивание по правому краю
                              width: "100%",
                              my: 3,
                            }}
                          >
                            <Button
                              variant="contained"
                              onClick={() => setIsMentorDialogOpen(true)}
                              sx={{ backgroundColor: "button.primary" }}
                            >
                              Редактировать
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>

      {/* Диалог редактирования менторского профиля */}
      <Dialog
        open={isMentorDialogOpen}
        onClose={() => setIsMentorDialogOpen(false)}
        fullWidth
        maxWidth="desktop"
        // sx={{ width: "80%", margin: "autho" }}
      >
        <DialogTitle>
          {mentorStatus ? "Редактировать профиль ментора" : "Стать ментором"}
        </DialogTitle>
        <DialogContent>
          <Formik
            initialValues={mentorValues}
            validationSchema={mentorValidationSchema}
            onSubmit={handleMentorSubmit}
            enableReinitialize
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Field
                  name="shortAboutMe"
                  as={TextField}
                  label="Кратко о себе (макс. 100 символов)"
                  fullWidth
                  margin="normal"
                  error={touched.shortAboutMe && Boolean(errors.shortAboutMe)}
                  helperText={touched.shortAboutMe && errors.shortAboutMe}
                  inputProps={{ maxLength: 100 }}
                />

                <Field
                  name="longAboutMe"
                  as={TextField}
                  label="Подробно о себе (макс. 500 символов)"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  error={touched.longAboutMe && Boolean(errors.longAboutMe)}
                  helperText={touched.longAboutMe && errors.longAboutMe}
                  inputProps={{ maxLength: 500 }}
                />

                <Field
                  name="specializations"
                  as={TextField}
                  label="Специализации (через запятую)"
                  fullWidth
                  margin="normal"
                  error={
                    touched.specializations && Boolean(errors.specializations)
                  }
                  helperText={touched.specializations && errors.specializations}
                  placeholder="Например: JavaScript, React, TypeScript"
                />

                <DialogActions>
                  <Button
                    onClick={() => setIsMentorDialogOpen(false)}
                    sx={{ color: "button.primary" }}
                  >
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ backgroundColor: "button.primary" }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : mentorStatus ? (
                      "Обновить"
                    ) : (
                      "Стать ментором"
                    )}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
