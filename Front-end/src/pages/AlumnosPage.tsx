import Sidebar from '../components/Sidebar';
import Navbar from "../components/Navbar";
import AgregarAlumno from '../components/AgregarAlumno';
import TableAlumnoPage from '../components/Table/TableAlumnoPage'; // Asegúrate de importar tu componente de tabla
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';


// Definir la interfaz del Alumno
interface Alumno {
  id?: number;
  nombre: string;
  edad: number;
  grado: string;
}

// Página de alumnos
const AlumnosPage = () => {
  const [openAgregarAlumno, setOpenAgregarAlumno] = useState(false);
  const [alumno, setAlumno] = useState<Alumno | null>(null); // Alumno actual para editar/ver
  const [mode, setMode] = useState<'add' | 'edit' | 'view'>('add'); // Modo del modal

  // Función para abrir el modal en modo "Agregar"
  const handleOpenAgregarAlumno = () => {
    setAlumno(null); // Limpia el alumno actual (para agregar uno nuevo)
    setMode('add');
    setOpenAgregarAlumno(true);
  };

  // Función para manejar el cierre del modal
  const handleCloseModal = () => {
    setOpenAgregarAlumno(false);
  };

  // Función para manejar cuando se guarda un alumno (en agregar o editar)
  const handleSaveAlumno = (nuevoAlumno: Alumno) => {
    setOpenAgregarAlumno(false); // Cierra el modal después de guardar
  };


  return (
    <div style={{ display: 'flex', height: '100vh'}}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Navbar />
        <div style={{ marginTop: '20px', padding: '20px' }}>
          <h1 style={{fontSize:'15px',}}>Panel Alumnos</h1>
          <Button style={{marginTop :'30px'}}
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAgregarAlumno}
            sx={{ mb: 2, backgroundColor: '#e63946', color: 'white' }}
          >
            Agregar Alumno
          </Button>

          <div className="table" style={{  width: '100%' }}>
            <AgregarAlumno
              open={openAgregarAlumno} // Controla si el modal está abierto
              onClose={handleCloseModal} // Función para cerrar el modal
              onSave={handleSaveAlumno} // Función que se llama cuando se guarda el alumno
              alumno={alumno} // Alumno actual si es para editar o visualizar
              mode={mode} // Modo del modal: agregar, editar o ver
            />
            <div style={{height:'100px'}}>
              <TableAlumnoPage/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumnosPage;
