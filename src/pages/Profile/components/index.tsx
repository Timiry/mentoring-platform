import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Avatar } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { accountApi } from '../../../api';
import { AccountData } from '../../../types';
import InvalidInputMessage from '../../../components/InvalidInputMessage';
import chekTokens from '../../../services/CheckTokens';
import { Snackbar } from '@mui/material';
import Alert from '../../../components/Alert';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Обязательное поле'),
  firstName: Yup.string().required('Обязательное поле'),
  lastName: Yup.string().required('Обязательное поле'),
  phone: Yup.string().nullable(),
  address: Yup.string().nullable(),
});

const Profile: React.FC = () => {
  const [initialValues, setInitialValues] = useState<AccountData | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        chekTokens();
        const userData = await accountApi.getUserData();
        setInitialValues(userData.data);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        setError('Ошибка при получении данных пользователя');
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (values: AccountData) => {
    try {
      chekTokens();
      await accountApi.updateUserData(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
        }
      );

      if (photo) {
        chekTokens();
        await accountApi.addAvatar(photo);
      }

      setMessage("Данные успешно обновлены");
      setOpen(true);
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
      setMessage("Ошибка при обновлении данных пользователя");
      setOpen(true);
    }
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
};

  if (error) return <Typography color="error">{error}</Typography>;
  if (!initialValues) {
    return <Typography>Загрузка...</Typography>;
  }

  return (
    <Box component={Paper} elevation={3} sx={{ padding: 4, maxWidth: 600, margin: 'auto', mt: 8, mb: 8, borderRadius: 2 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Личный профиль
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
              <Avatar
                alt="User Photo"
                src={photo ? URL.createObjectURL(photo) : initialValues.photoUrl || ''}
                sx={{ width: 100, height: 100 }}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="photo-upload"
                type="file"
                onChange={(event) => {
                  if (event.currentTarget.files) {
                    setPhoto(event.currentTarget.files[0]);
                  }
                }}
              />
              <label htmlFor="photo-upload">
                <Button variant="contained" component="span" sx={{ bgcolor: 'button.primary', mt: 2 }}>
                  Загрузить фотографию
                </Button>
              </label>
            </Box>

            <Field
              name="username"
              as={TextField}
              label="Логин"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="username" component={InvalidInputMessage} />

            <Field
              name="firstName"
              as={TextField}
              label="Имя"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="firstName" component={InvalidInputMessage} />

            <Field
              name="lastName"
              as={TextField}
              label="Фамилия"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="lastName" component={InvalidInputMessage} />

            <Field
              name="phone"
              as={TextField}
              label="Телефон"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="phone" component={InvalidInputMessage} />

            <Typography variant="body2" sx={{ mt: 2 }}>
              Статус: {initialValues.userStatus}
            </Typography>
            <Typography variant="body2">
              Дата регистрации: {initialValues.registrationDate.toString().replace(new RegExp(',', 'g'), '-')}
            </Typography>

            <Button type="submit" variant="contained" sx={{ bgcolor: 'button.primary', mt: 3}} fullWidth >
              Сохранить изменения
            </Button>
          </Form>
        )}
      </Formik>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success'> 
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
