// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, InputAdornment } from '@mui/material';
import { AccountCircle, Lock, Email } from '@mui/icons-material';
import Alert from '../components/Alert';
import imganebag from '../assets/cool-background.png'

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string; variant: 'filled' | 'outlined'; duration? : number } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("username",username,"email",email,"password",password);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      console.log("response",response);
      const data = await response.json();

      if (response.ok) {
        setAlert({ type: 'success', message: data.message, variant: 'filled' });
      } else {
        setAlert({ type: 'error', message: data.message, variant: 'filled' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Error de conexión', variant: 'filled' });
    }
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <Container component="main" maxWidth='100%' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundImage: `url(${imganebag})`,    backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          width: '100%',
          maxWidth: 400,
        }}
        >
        <Typography variant="h5" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {alert && <Alert duration={3000} variant={alert.variant} type={alert.type} message={alert.message} onClose={handleCloseAlert}/>}
          <TextField
            variant="outlined"
            margin="normal"
            //required
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
            />
          <TextField
            variant="outlined"
            margin="normal"
            //required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            //required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            Registrarse
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <a href="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Volver a Iniciar Sesión
          </a>
        </Box>
      </Box>
    </Container>
  );
}
