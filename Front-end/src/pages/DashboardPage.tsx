import Navbar from "../components/Navbar"
import Sidebar from '../components/Sidebar';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Card from '../components/Card';
import { useState,useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';


const DashboardPage = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  useEffect(() => {
  fetch('http://localhost:5000/api/renda/getRows')
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => { // Obtener la respuesta en texto
            throw new Error(`HTTP error! Status: ${response.status}, ${text}`);
          });
        }
        return response.json(); // Procesar la respuesta como JSON si está bien
      })
      .then(data => {
        setRows(data);

        if (data.length > 0) {
          const columnNames = Object.keys(data[0]);
          const cols = columnNames.map(name => ({
            field: name,
            headerName: name.charAt(0).toUpperCase() + name.slice(1),
            width: 150
          }));
          setColumns(cols);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Navbar />
        <div style={{ padding: '20px', height:'92.2%', }}>
          <h1>Panel</h1>
          <div style={{ marginTop: '20px',  display : 'flex', gap: '15px', justifyContent: 'space-between',  height: '20%'}}>
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
          <div style={{ marginTop: '20px',  display : 'flex', gap: '15px', justifyContent: 'space-between',width:'100%' , height:'70%'}}>
            <div className="datagrid1" style={{width:'60%'}}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  checkboxSelection
                  disableSelectionOnClick
                />

            </div>
            <div className="datagrid2" style={{width:'40%'}}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                checkboxSelection
                disableSelectionOnClick
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage