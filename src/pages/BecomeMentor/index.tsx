import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { MentorDataToCreate, RawMentorData } from "../../types";
import { mentorCatalogApi } from "../../api"; // Импортируйте ваш API
import chekTokens from "../../services/CheckTokens";

interface CreateMentorDialogProps {
  open: boolean;
  onClose: () => void;
}

const BecomeMentorDialog: React.FC<CreateMentorDialogProps> = ({
  open,
  onClose,
}) => {
  const initialValues: RawMentorData = {
    userId: Number(
      JSON.parse(atob(localStorage.accessToken.split(".")[1])).sub
    ), // Получаем userId из localStorage
    shortAboutMe: "",
    longAboutMe: "",
    specializations: "",
  };

  const validationSchema = Yup.object().shape({
    shortAboutMe: Yup.string().required("Краткая информация обязательна"),
    longAboutMe: Yup.string().required("Подробная информация обязательна"),
    specializations: Yup.string().required("Специализации обязательны"),
  });

  const handleSubmit = async (values: RawMentorData) => {
    const specializationsArray = values.specializations
      .split(",")
      .map((item: string) => item.trim())
      .filter((item: string) => item !== "");
    const mentorData: MentorDataToCreate = {
      ...values,
      specializations: specializationsArray,
    };

    try {
      chekTokens();
      await mentorCatalogApi.createMentor(mentorData); // Отправка данных в API
      onClose(); // Закрытие модального окна после успешной отправки
    } catch (error) {
      console.error("Ошибка при создании ментора:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="desktop">
      <DialogTitle>Стать ментором</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="shortAboutMe"
                as={TextField}
                label="Краткая информация"
                fullWidth
                margin="normal"
                error={touched.shortAboutMe && Boolean(errors.shortAboutMe)}
                helperText={touched.shortAboutMe && errors.shortAboutMe}
              />
              <Field
                name="longAboutMe"
                as={TextField}
                label="Подробная информация"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={touched.longAboutMe && Boolean(errors.longAboutMe)}
                helperText={touched.longAboutMe && errors.longAboutMe}
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
              />
              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Отмена
                </Button>
                <Button type="submit" color="primary">
                  Создать
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default BecomeMentorDialog;
