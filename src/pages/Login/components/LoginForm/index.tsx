import React from 'react';
import { Box, Button, TextField, Typography, Paper, Link } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import InvalidInputMessage from '../../../../components/InvalidInputMessage';
import * as Yup from 'yup';

const LoginForm: React.FC = () => {
  const initialValues = {
    login: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    login: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log('Вход:', values);
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
    </Box>
  );
};

export default LoginForm;
 