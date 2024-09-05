import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import  { useState, useEffect } from 'react';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
      console.log(userData);
    }
  }, []);
  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: '#EA3C53',
        height: '100vh',
        color: 'white',
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: 'left'}}>
        {user.username  }
      </Typography>
      <Divider sx={{ borderColor: 'white', marginBottom: 5 }} />
      <List>
        <ListItem button sx={{ marginBottom: 4, cursor:'pointer'}}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Panel" />
        </ListItem>
        <ListItem button sx={{ marginBottom: 4, cursor:'pointer' }}>
          <ListItemIcon>
            <PeopleIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Alumnos" />
        </ListItem>
        <ListItem button sx={{ marginBottom: 4, cursor:'pointer' }}>
          <ListItemIcon>
            <SchoolIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Profesores" />
        </ListItem>
        <ListItem button sx={{ marginBottom: 4, cursor:'pointer' }}>
          <ListItemIcon>
            <BusinessIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Escuelas" />
        </ListItem>
        <ListItem button sx={{ marginBottom: 4, cursor:'pointer' }}>
          <ListItemIcon>
            <AttachMoneyIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Renta" />
        </ListItem>
        <ListItem button sx={{ marginBottom: 4, cursor:'pointer' }}>
          <ListItemIcon>
            <HelpIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Ayuda" />
        </ListItem>
        <ListItem button sx={{ marginBottom: 4, cursor:'pointer' }}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Configuraciones" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
