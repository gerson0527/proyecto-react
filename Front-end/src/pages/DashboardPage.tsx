import Navbar from "../components/Navbar"
import Sidebar from '../components/Sidebar';
import { FaUser, FaBook, FaSchool,FaMoneyBillWave  } from 'react-icons/fa';
import Card from '../components/Card';


const DashboardPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Navbar />
        <div style={{ padding: '20px' }}>
          <h1>Panel</h1>
          <div style={{ marginTop: '20px',  display : 'flex', gap: '15px', justifyContent: 'space-between'}}>
          <Card 
              title="Estudiantes" 
              icon={FaUser} 
              fetchUrl="http://localhost:5000/api/students"  
            />
            <Card 
              title="Profesores" 
              icon={FaBook} 
              fetchUrl="http://localhost:5000/api/teachers" 
            />
            <Card 
              title="Escuelas" 
              icon={FaSchool} 
              fetchUrl="http://localhost:5000/api/schools" 
            />
            <Card 
              title="Renta" 
              icon={FaMoneyBillWave} 
              fetchUrl="http://localhost:5000/api/schools" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage