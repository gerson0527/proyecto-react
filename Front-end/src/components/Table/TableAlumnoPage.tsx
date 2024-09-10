import React, { useState, useEffect } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Toolbar, Typography, Paper, Checkbox, IconButton, 
  TablePagination, Tooltip, Button, Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import AgregarAlumno from '../AgregarAlumno';

interface Alumno {
  id: number;
  nombre: string;
  telefono: string;
  direccion: string;
  correo: string;
  colegio: string;
  edad: number;
  grado: string;
}

const headCells = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'telefono', label: 'Telefono' },
  { id: 'direccion', label: 'Direccion' },
  { id: 'correo', label: 'Correo' }, 
  { id: 'colegio', label: 'Colegio' },
  { id: 'actions', label: 'Opciones' },
];

const TableAlumnoPage: React.FC = () => {
  const [rows, setRows] = useState<Alumno[]>([]);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [alumno, setAlumno] = useState<Alumno | null>(null);
  const [mode, setMode] = useState<'add' | 'edit' | 'view'>('add');
  const [user, setUser] = useState({ username: 'guest', token: '' });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState<readonly number[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);  
  
  useEffect(() => {
    const fetchRows = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/alumnos/getRows');
        const data: Alumno[] = await response.json();
        setRows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRows();
  }, []);

  const handleAlumnoAction = (id: number, actionMode: 'edit' | 'view') => {
    const alumnoSeleccionado = rows.find((alumno) => alumno.id === id);
    if (alumnoSeleccionado) {
      setAlumno(alumnoSeleccionado);
      setMode(actionMode);
      setOpenModal(true);
    }
  };
  
  const handleOpenDeleteDialog = () => {
    if (selected.length === 0) {
      console.error('No hay alumnos seleccionados para eliminar');
      return;
    }
    setSelectedToDelete(selected); // Guardar los alumnos seleccionados para eliminar
    setOpenDeleteDialog(true);     // Abrir el di�logo
  };

  const handleDelete = async () => {
    if (!user.token || selectedToDelete.length === 0) {
      console.error('No hay token de autenticación o no hay alumnos seleccionados');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/alumnos', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedToDelete }), // Enviar los IDs como array en el cuerpo
      });
  
      if (response.ok) {
        console.log('Alumnos eliminados con éxito');
        setRows((prevRows) => prevRows.filter((row) => !selectedToDelete.includes(row.id)));
        setSelected([]);
      } else {
        console.error('Error al eliminar los alumnos');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    } finally {
      setOpenDeleteDialog(false); // Cerrar el diálogo
    }
  };
  

  const handleCloseModal = () => setOpenModal(false);
  
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => row.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const EnhancedTableToolbar: React.FC<{ numSelected: number }> = ({ numSelected }) => (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} seleccionado(s)
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Alumnos
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Eliminar">
          <IconButton onClick={handleOpenDeleteDialog}>
            <DeleteIcon style={{ color: '#EA3C53' }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filtrar">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ maxHeight: 380, overflow: 'auto' }}>
          <Table aria-labelledby="tableTitle" size="medium" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < rows.length}
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all alumnos' }}
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align="left">
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${row.id}`;
                return (
                  <TableRow
                    hover
                    onClick={() => handleClick(row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell>{row.nombre}</TableCell>
                    <TableCell>{row.telefono}</TableCell>
                    <TableCell>{row.direccion}</TableCell>
                    <TableCell>{row.correo}</TableCell>
                    <TableCell>{row.colegio}</TableCell>
                    <TableCell style={{ display: 'flex', gap: '12px' }}>
                      <Button
                        style={{ color: '#EA3C53', borderColor: '#EA3C53', outline: 'none' }}
                        variant="outlined"
                        color="primary"
                        startIcon={<VisibilityIcon />}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleAlumnoAction(row.id, 'view');
                        }}
                        size="small"
                      >
                        Ver
                      </Button>
                      <Button
                        style={{ color: '#EA3C53', borderColor: '#EA3C53', outline: 'none' }}
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleAlumnoAction(row.id, 'edit');
                        }}
                        size="small"
                      >
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 15, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
      <AgregarAlumno 
        open={openModal} 
        onClose={handleCloseModal}
        onSave={handleCloseModal} 
        alumno={alumno} 
        mode={mode} 
      />
      
      {/* Dialogo de confirmacion de eliminacion */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar los alumnos seleccionados? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">Cancelar</Button>
          <Button onClick={handleDelete} color="secondary">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TableAlumnoPage;
