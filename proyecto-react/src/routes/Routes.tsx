// src/pages/Routes.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage'; // Si tienes una p�gina de registro

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* Ruta para la p�gina de registro */}
      </Routes>
    </Router>
  );
}
