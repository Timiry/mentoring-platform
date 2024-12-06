import React from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import InvalidInputMessage from '../../../../components/InvalidInputMessage'
import * as Yup from 'yup';

const RegisterForm: React.FC = () => {
  const initialValues = {
    email: '',
    login: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Некорректный адрес электронной почты').required('Обязательное поле'),
    login: Yup.string().required('Обязательное поле'),
    password: Yup.string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .required('Обязательное поле'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Пароли не совпадают')
      .required('Обязательное поле'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Регистрация:', values);
    // логика для отправки данных на сервер
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
        Регистрация
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur }) => (
          <Form>
            <Box sx={{ width: '100%', minHeight: '12px' }}> 
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
            
            <Box sx={{ width: '100%', minHeight: '12px' }}> 
              <ErrorMessage name="confirmPassword" component={InvalidInputMessage} />
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

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Зарегистрироваться
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterForm;