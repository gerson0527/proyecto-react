import React, { useState, useEffect,useRef  } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { TablePagination  } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';

interface Alumno {
  id: number;
  nombre: string;
  telefono: string;
  direccion: string;
  correo: string;
  colegio: string;
}


const headCells = [
  { id: 'nombre', label: 'Nombre' },
  { id: 'telefono', label: 'Teléfono' },
  { id: 'direccion', label: 'Dirección' },
  { id: 'correo', label: 'Correo' }, 
  { id: 'colegio', label: 'Colegio' },
  { id: 'actions', label: 'Opciones' },
];;

const TableAlumnoPage: React.FC = () => {
  const [rows, setRows] = useState<Alumno[]>([]);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

  const handleViewAlumno = (id: number) => {
    console.log('Ver alumno', id);
  };

  const handleEditAlumno = (id: number) => {
    console.log('Editar alumno', id);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  interface EnhancedTableToolbarProps {
    numSelected: number;
  }
  function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    return (
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          },
          numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          },
        ]}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Alumnos
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon style={{ color: '#EA3C53' }} />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }
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
                    onChange={(event) => handleSelectAllClick(event)}
                    inputProps={{
                      'aria-label': 'select all alumnos',
                    }}
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
              {rows.map((row) => {
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
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
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
                          event.stopPropagation(); // Evita que el clic se propague a la fila
                          handleViewAlumno(row.id);
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
                          event.stopPropagation(); // Evita que el clic se propague a la fila
                          handleEditAlumno(row.id);
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default TableAlumnoPage;
