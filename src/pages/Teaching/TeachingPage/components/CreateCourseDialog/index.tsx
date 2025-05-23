import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CourseToCreate } from "../../../../../types";

interface CreateCourseDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (course: CourseToCreate) => void;
}

const CreateCourseDialog: React.FC<CreateCourseDialogProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const handleCreate = (values: CourseToCreate) => {
    onCreate(values);
    onClose();
  };

  const initialValues: CourseToCreate = {
    title: "",
    description: "",
    completionTimeInHours: 40,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Название курса обязательно"),
    description: Yup.string().required("Описание обязательно"),
    completionTimeInHours: Yup.number().required(
      "Время прохождения обязательно"
    ),
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Создать новый курс</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleCreate}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="title"
                as={TextField}
                label="Название курса"
                variant="outlined"
                fullWidth
                margin="normal"
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
              <Field
                name="description"
                as={TextField}
                label="Описание"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              <Field
                name="completionTimeInHours"
                as={TextField}
                label="Время прохождения курса (в часах)"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                error={
                  touched.completionTimeInHours &&
                  Boolean(errors.completionTimeInHours)
                }
                helperText={
                  touched.completionTimeInHours && errors.completionTimeInHours
                }
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

export default CreateCourseDialog;
