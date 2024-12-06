// src/components/Auth.tsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Link } from '@mui/material';
//import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Пример простейшей валидации
    if (!login || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    // Здесь вы можете добавить логику для отправки данных на сервер, например:
    console.log('Отправка данных:', { login, password });
    
    // После успешной авторизации можно очистить поля
    setLogin('');
    setPassword('');
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
        mt: 8,
        borderRadius: 2,
      }}
    >
      <Typography  variant='h5' gutterBottom> 
        Вход в систему
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Логин"
          variant="outlined"
          fullWidth
          margin="normal"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginY: "15px"}}>
          Войти
        </Button>
        <Box sx={{pt: '20px', textAlign: 'center'}}>
            <Link href="/register" sx={{ textDecoration: 'none'}}>
                <Typography variant='B4Regular' color='text.secondary'>
                    Зарегистрироваться
                </Typography>
            </Link>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
 