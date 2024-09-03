import Navbar from "../components/Navbar"
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <Navbar />
        <div style={{ padding: '20px' }}>
          <h1>Dashboard</h1>
          <p>Contenido del dashboard</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage