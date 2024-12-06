import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Пример простейшей валидации
    if (!email || !username || !password || !confirmPassword) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли должны совпадать');
      return;
    }

    // Здесь вы можете добавить логику для отправки данных на сервер, например:
    console.log('Регистрация:', { email, username, password });
    
    // После успешной регистрации можно очистить поля и показать сообщение об успехе
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setSuccess('Регистрация прошла успешно!');
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
      <Typography variant="h5" component="h1" gutterBottom>
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Электронная почта"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Логин"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <TextField
          label="Повторите пароль"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success.main" variant="body2" gutterBottom>
            {success}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{marginY: "15px"}}>
          Зарегистрироваться
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;