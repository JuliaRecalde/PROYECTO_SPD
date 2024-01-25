import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, createTheme, ThemeProvider, CssBaseline, Container } from '@mui/material';

const LoginTemplate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica para manejar el inicio de sesión
    console.log('Iniciar sesión con:', email, password);
  };

  const handleRegister = () => {
    // Lógica para manejar el registro
    console.log('Registro con:', email, password);
  };

  const theme = createTheme({
    palette: {
      background: {
        default: '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography component="h1" variant="h5" style={{ fontFamily: 'Work Sans, sans-serif' }}>
          Iniciar Sesión
        </Typography>
        <form style={{ width: '100%', marginTop: '1rem' }} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Correo Electrónico"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            style={{ marginTop: '2rem', backgroundColor: '#F9AA33', color: '#344955', fontFamily: 'Work Sans, sans-serif' }}
          >
            Iniciar Sesión
          </Button>
        </form>
        <Grid container justifyContent="center">
          <Button
            type="button"
            fullWidth
            variant="contained"
            onClick={handleRegister}
            style={{ marginTop: '1rem', backgroundColor: '#F9AA33', color: '#344955', fontFamily: 'Work Sans, sans-serif' }}
          >
            Registrarse
          </Button>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default LoginTemplate;
