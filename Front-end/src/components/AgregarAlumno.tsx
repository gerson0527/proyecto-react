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
  colegio: number;
  edad: number;
  grado: string;
}
interface Colegio {
  id: number;
  nome: string;  // Cambiado de 'nombre' a 'nome'
  endereco: string;
  telefone: string;
  data_criacao: string;
}
interface AgregarAlumnoProps {
  open: boolean;
  onClose: () => void;
  onSave: (alumno: Alumno) => void;
  alumno?: Alumno;
  mode: 'add' | 'edit' | 'view';
}

const AgregarAlumno: React.FC<AgregarAlumnoProps> = ({ open, onClose, onSave, alumno, mode }) => {
  const [alumnoData, setAlumnoData] = useState<Alumno>({
    nombre: '',
    telefono: '',
    direccion: '',
    correo: '',
    colegio: 0,
    edad: 0,
    grado: '',
  });

  const [user, setUser] = useState({ username: 'guest', token: '' });
  const [colegios, setColegios] = useState<Colegio[]>([]);
  const [colegioSeleccionado, setColegioSeleccionado] = useState<Colegio | null>(null);

  useEffect(() => {
    if (alumno) {
      setAlumnoData(alumno);
      const colegioEncontrado = colegios.find(c => c.nombre === alumno.colegio);
      setColegioSeleccionado(colegioEncontrado || null);
    }
  }, [alumno, colegios]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchColegios = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/escolas/getRows');
        const data = await response.json();
        setColegios(data);
      } catch (error) {
        console.error('Error fetching colegios:', error);
      }
    };

    fetchColegios();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlumnoData({
      ...alumnoData,
      [e.target.name]: e.target.value,
    });
  };

  const handleColegioChange = (event: React.SyntheticEvent, value: Colegio | null) => {
    setColegioSeleccionado(value);
    setAlumnoData({
      ...alumnoData,
      colegio: value ? value.id : 0,
    });
  };

  const handleSave = async () => {
    if (!user.token) {
      console.error('No hay token de autenticación');
      return;
    }
    if( !alumnoData.nombre || !alumnoData.telefono || !alumnoData.direccion || !alumnoData.correo || !alumnoData.colegio || !alumnoData.edad || !alumnoData.grado) {
      alert('Por favor, rellene todos los campos');
    }
    try {
      let response;
      const token = user.token;
      console.log('alumnoData:', alumnoData);
      if (mode === 'add') {
        response = await fetch('http://localhost:5000/alumnos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(alumnoData),
        });
      } else if (mode === 'edit' && alumno?.id) {
        response = await fetch(`http://localhost:5000/alumnos/${alumno.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(alumnoData),
        });
      }
      if (response?.ok) {
        const data = await response.json();
        console.log('Alumno guardado con éxito', data);
        onSave(alumnoData);
        onClose();
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
          e.preventDefault();
          handleSave(); 
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
                id='colegio'
                options={colegios}
                getOptionLabel={(option) => {
                  return option.nome;
                }}
                value={colegioSeleccionado}
                onChange={handleColegioChange}
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
