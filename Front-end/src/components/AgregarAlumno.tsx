import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Autocomplete, Grid, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import CakeIcon from '@mui/icons-material/Cake';

interface Alumno {
  id?: number;
  nombre: string;
  telefono: string;
  direccion: string;
  correo: string;
  colegio: string;
  edad: number;
  grado: string;
}

interface AgregarAlumnoProps {
  open: boolean;
  onClose: () => void;
  onSave: (alumno: Alumno) => void;
  alumno?: Alumno; // Si pasas un alumno, es para editar o visualizar
  mode: 'add' | 'edit' | 'view'; // Modo de operación
}

const colegios = ['Colegio Nacional', 'Instituto Moderno', 'Escuela Internacional']; // Opciones de autocompletar

const AgregarAlumno: React.FC<AgregarAlumnoProps> = ({ open, onClose, onSave, alumno, mode }) => {
  const [alumnoData, setAlumnoData] = useState<Alumno>({
    nombre: '',
    telefono: '',
    direccion: '',
    correo: '',
    colegio: '',
    edad: 0,
    grado: '',
  });

  useEffect(() => {
    if (alumno) {
      setAlumnoData(alumno);
    }
  }, [alumno]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlumnoData({
      ...alumnoData,
      [e.target.name]: e.target.value,
    });
  };

  const [user, setUser] = useState({ username: 'guest', token: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  let token = user.token;
  // Función para hacer la petición al servidor
  const handleSave = async () => {
    try {
      let response;
      console.log('mode', mode);
      if (mode === 'add') {
        // Petición POST para agregar un alumno
        response = await fetch('http://localhost:5000/alumnos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Incluye el token en los headers
          },
          body: JSON.stringify(alumnoData),
        });
      } else if (mode === 'edit' && alumno?.id) {
        // Petición PUT para editar un alumno existente
        response = await fetch(`http://localhost:5000/alumnos/${alumno.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Incluye el token en los headers
          },
          body: JSON.stringify(alumnoData),
        });
      }
      console.log('Respuesta:', response);
      if (response?.ok) {
        const data = await response.json();
        console.log('Alumno guardado con éxito', data);
        onSave(alumnoData); // Llama a la función de guardado externa
        onClose(); // Cierra el diálogo
      } else {
        console.error('Error al guardar el alumno');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === 'add' ? 'Agregar Alumno' : mode === 'edit' ? 'Editar Alumno' : 'Ver Alumno'}
      </DialogTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Evita el comportamiento predeterminado del formulario
          handleSave(); // Llama la función de guardado
        }}
      >
        <DialogContent>
          <Grid container spacing={2}>
            {/* Nombre y Teléfono */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="nombre"
                label="Nombre"
                value={alumnoData.nombre}
                onChange={handleChange}
                fullWidth
                disabled={mode === 'view'}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="telefono"
                label="Teléfono"
                value={alumnoData.telefono}
                onChange={handleChange}
                fullWidth
                disabled={mode === 'view'}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Dirección y Correo */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="direccion"
                label="Dirección"
                value={alumnoData.direccion}
                onChange={handleChange}
                fullWidth
                disabled={mode === 'view'}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <HomeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="correo"
                label="Correo"
                value={alumnoData.correo}
                onChange={handleChange}
                fullWidth
                disabled={mode === 'view'}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Colegio y Edad */}
            <Grid item xs={12} sm={6}>
              <Autocomplete
                options={colegios}
                getOptionLabel={(option) => option}
                value={alumnoData.colegio}
                onChange={(event, newValue) => {
                  setAlumnoData({
                    ...alumnoData,
                    colegio: newValue || '',
                  });
                }}
                disabled={mode === 'view'}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Colegio"
                    fullWidth
                    margin="dense"
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <InputAdornment position="start">
                            <SchoolIcon />
                          </InputAdornment>
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="edad"
                label="Edad"
                value={alumnoData.edad}
                onChange={handleChange}
                type="number"
                fullWidth
                disabled={mode === 'view'}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CakeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Grado */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="grado"
                label="Grado"
                value={alumnoData.grado}
                onChange={handleChange}
                fullWidth
                disabled={mode === 'view'}
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancelar</Button>
          {mode !== 'view' && (
            <Button type="submit" color="primary">
              {mode === 'add' ? 'Agregar' : 'Guardar'}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AgregarAlumno;
