import Navbar from "../components/Navbar"
import Sidebar from '../components/Sidebar';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Card from '../components/Card';
import { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';


const DashboardPage = () => {
  const [selectionModel, setSelectionModel] = useState([]);

  const handleSelectionModelChange = (newSelection) => {
    setSelectionModel(newSelection);
    
    // Obtener información de las filas seleccionadas desde el backend
    const ids = newSelection.join(',');
    fetch(`/api/getRows?ids=${ids}`)
      .then(response => response.json())
      .then(data => {
        console.log("Selected Rows Data from Backend:", data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };
  const rows = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    // Agrega más filas aquí
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 110 },
    // Agrega más columnas aquí
  ];
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Navbar />
        <div style={{ padding: '20px' }}>
          <h1>Panel</h1>
          <div style={{ marginTop: '20px',  display : 'flex', gap: '15px', justifyContent: 'space-between',  height: '200px'}}>
            <Card 
                title="Estudiantes" 
                icon={PeopleIcon}
                fetchUrl="http://localhost:5000/api/students"  
              />
            <Card 
              title="Profesores" 
              icon={BusinessIcon}
              fetchUrl="http://localhost:5000/api/teachers" 
            />
            <Card 
              title="Escuelas" 
              icon={SchoolIcon} 
              fetchUrl="http://localhost:5000/api/schools" 
            />
            <Card 
              title="Renta" 
              icon={AttachMoneyIcon} 
              fetchUrl="http://localhost:5000/api/renda" 
            />
          </div>
          <div style={{ marginTop: '20px',  display : 'flex', gap: '15px', justifyContent: 'space-between',width:'100%'}}>
            <div className="datagrid1" style={{width:'60%'}}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                  disableSelectionOnClick
                  selectionModel={selectionModel}
                  onSelectionModelChange={handleSelectionModelChange}
                />

            </div>
            <div className="datagrid2" style={{width:'40%'}}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
                selectionModel={selectionModel}
                onSelectionModelChange={handleSelectionModelChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage