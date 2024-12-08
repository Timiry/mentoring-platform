import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Link, Snackbar } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import InvalidInputMessage from '../../../../components/InvalidInputMessage';
import Alert from '../../../../components/Alert';
import { securityApi } from "../../../../api";
import axios from '../../../../api';

const LoginForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const initialValues = {
    login: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    login: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const navigate = useNavigate();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (values: typeof initialValues) => {
    if (!localStorage.deviceId) localStorage.deviceId = uuidv4();
    const response = securityApi.login(values, {deviceId: localStorage.deviceId});
    response.then((result) => {
      if (result.status === 200) {
        localStorage.accessToken = result.data.accessToken;
        console.log(result);
        navigate('/profile');
      }
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Ошибка при входе:', error.response.status, error.response.data.message);
          setMessage(`Ошибка: ${error.response.data.message} с кодом ${error.response.status}. Попробуйте снова.`);
        } else {
          console.error('Ошибка при входе:', error.message);
          setMessage('Ошибка при соединении с сервером. Попробуйте снова.');
        }
      } else {
        console.error('Неизвестная ошибка:', error);
        setMessage('Произошла неизвестная ошибка. Попробуйте снова.');
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
        margin: 'auto',
        mt: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Вход в систему
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur }) => (
          <Form >
            <Box sx={{ width: '100%', minHeight: '12px' }}> 
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
          
            <Box sx={{ width: '100%', minHeight: '12px' }}> 
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
            
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Войти
            </Button>
          </Form>
        )}
      </Formik>
      <Box sx={{pt: '20px', textAlign: 'center'}}>
          <Link href="/register" sx={{ textDecoration: 'none'}}>
              <Typography variant='B4Regular' color='text.secondary'>
                  Зарегистрироваться
              </Typography>
          </Link>
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='error'> 
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;
 