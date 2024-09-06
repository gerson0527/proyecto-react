// src/pages/Routes.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage'; 
import DashboardPage from '../pages/DashboardPage';
import AlumnosPage from '../pages/AlumnosPage';
import ProfesoresPage from '../pages/ProfesoresPage';
import EscuelasPage from '../pages/EscuelasPage';
import RentaPage from '../pages/RentaPage';


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/alumnos' element={<AlumnosPage />} />
        <Route path='/profesores' element={<ProfesoresPage />} />
        <Route path='/escuelas' element={<EscuelasPage />} />
        <Route path='/renta' element={<RentaPage />} />
      </Routes>
    </Router>
  );
}
