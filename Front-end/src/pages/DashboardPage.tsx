import Navbar from "../components/Navbar"
import Sidebar from '../components/Sidebar';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Card from '../components/Card';
import TableDashboard from "../components/Table/TableDashboard";
import TableDashboardStudens from "../components/Table/TableDashboardStudens";

const DashboardPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Navbar />
        <div style={{ padding: '20px'}}>
          <h1>Panel</h1>
          <div style={{ marginTop: '20px',  display : 'flex', gap: '15px', justifyContent: 'space-between',  height: '15%'}}>
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
          <div style={{display : 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div className="datagrid1" style={{width:'55%', marginTop: '60px'}}>
              <TableDashboard />
            </div>
            <div className="datagrid2" style={{width:'40%',marginTop: '60px'}}>
              <TableDashboardStudens />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage