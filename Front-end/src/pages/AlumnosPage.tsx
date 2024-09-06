import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Sidebar from '../components/Sidebar';
import Navbar from "../components/Navbar";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'nombre', headerName: 'Nombre', width: 150 },
  { field: 'edad', headerName: 'Edad', width: 130 },
  { field: 'grado', headerName: 'Grado', width: 130 },
  {
    field: 'actions',
    headerName: 'Opciones',
    width: 250,
    renderCell: (params) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<VisibilityIcon />}
          onClick={() => handleViewAlumno(params.row.id)}
          size="small"
        >
          Ver
        </Button>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          onClick={() => handleEditAlumno(params.row.id)}
          size="small"
        >
          Editar
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => handleDeleteAlumno(params.row.id)}
          size="small"
        >
          Eliminar
        </Button>
      </Box>
    ),
  },
];

const rows = [
  { id: 1, nombre: 'Juan Pérez', edad: 15, grado: '10°' },
  { id: 2, nombre: 'María López', edad: 16, grado: '11°' },
  { id: 3, nombre: 'Pedro Gómez', edad: 14, grado: '9°' },
  { id: 4, nombre: 'Ana Martínez', edad: 15, grado: '10°' },
];

const handleAddAlumno = () => {
  console.log('Agregar alumno');
};

const handleEditAlumno = (id) => {
  console.log('Editar alumno', id);
};

const handleDeleteAlumno = (id) => {
  console.log('Eliminar alumno', id);
};

const handleViewAlumno = (id) => {
  console.log('Ver alumno', id);
};

const AlumnosPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Navbar />
        <Box
          sx={{
            padding: 3,
            margin: '0 auto',
            maxWidth: 1200,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Panel de Alumnos
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddAlumno}
            sx={{ mb: 2, backgroundColor: '#e63946', color: 'white' }}
          >
            Agregar Alumno
          </Button>
          <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              checkboxSelection
              sx={{ border: 0 }}
            />
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default AlumnosPage;
