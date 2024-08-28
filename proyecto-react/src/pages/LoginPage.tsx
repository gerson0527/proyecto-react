// src/pages/LoginPage.tsx
import { useState } from 'react';
import Alert from '../components/Alert';
import imganebag from '../assets/cool-background.png'
import { TextField, Button, Container, Typography, Box, InputAdornment } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string; variant: 'filled' | 'outlined';  duration?: number; } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setAlert({ type: 'success', message: data.message, variant: 'filled' });
      } else {
        setAlert({ type: 'error', message: data.message, variant: 'filled' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Error de conexion', variant: 'filled' });
    }
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  return (
    <Container component="main" maxWidth='100%' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundImage: `url(${imganebag})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
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
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        {alert && <Alert duration={2000}  variant={alert.variant} type={alert.type} message={alert.message} onClose={handleCloseAlert}/>}
          <TextField
            variant="outlined"
            margin="normal"
            required
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
            required
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
            Iniciar Sesion
          </Button>
        </form>
        <Box mt={2} textAlign="center" display="flex" justifyContent="space-between" width='100%'>
          <a href="#" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Olvidaste tu contraseña
          </a>
          <a href="/register" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Registrarte
          </a>
        </Box>
      </Box>
    </Container>
  );
}
