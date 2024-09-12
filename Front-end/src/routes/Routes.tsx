import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage'; 
import DashboardPage from '../pages/DashboardPage';
import AlumnosPage from '../pages/AlumnosPage';
import ProfesoresPage from '../pages/ProfesoresPage';
import EscuelasPage from '../pages/EscuelasPage';
import RentaPage from '../pages/RentaPage';
import { InactivityProvider } from '../components/Inactivity/InactivityContext';
import { AuthProvider } from '../components/AuthContext/AuthContext';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const storedUser = localStorage.getItem('user');
  const userObject = storedUser ? JSON.parse(storedUser) : null;
  const isAuthenticated = !!userObject?.token; // Verificamos si el token existe

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // Redirige al login si no está autenticado
  }

  return children;
};

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Rutas protegidas envueltas por AuthProvider e InactivityProvider */}
        <Route path="/dashboard" element={
          <AuthProvider>
            <InactivityProvider>
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            </InactivityProvider>
          </AuthProvider>
        } />
        
        <Route path="/alumnos" element={
          <AuthProvider>
            <InactivityProvider>
              <ProtectedRoute>
                <AlumnosPage />
              </ProtectedRoute>
            </InactivityProvider>
          </AuthProvider>
        } />
        
        <Route path="/profesores" element={
          <AuthProvider>
            <InactivityProvider>
              <ProtectedRoute>
                <ProfesoresPage />
              </ProtectedRoute>
            </InactivityProvider>
          </AuthProvider>
        } />
        
        <Route path="/escuelas" element={
          <AuthProvider>
            <InactivityProvider>
              <ProtectedRoute>
                <EscuelasPage />
              </ProtectedRoute>
            </InactivityProvider>
          </AuthProvider>
        } />

        <Route path="/renta" element={
          <AuthProvider>
            <InactivityProvider>
              <ProtectedRoute>
                <RentaPage />
              </ProtectedRoute>
            </InactivityProvider>
          </AuthProvider>
        } />
      </Routes>
    </Router>
  );
}
