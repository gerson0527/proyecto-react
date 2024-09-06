import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography, List } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import NavigationListItem from './NavigationListItem';

const Sidebar = () => {
  const [user, setUser] = useState({ username: 'guest', token: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
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
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', textAlign: 'left' }}>
        <p>{user.username}</p>
      </Typography>
      <Divider sx={{ borderColor: 'white', marginBottom: 5 }} />
      <List>
        <NavigationListItem icon={DashboardIcon} text="Panel" route="/dashboard" />
        <NavigationListItem icon={PeopleIcon} text="Alumnos" route="/alumnos" />
        <NavigationListItem icon={SchoolIcon} text="Profesores" route="/professores" />
        <NavigationListItem icon={BusinessIcon} text="Escuelas" route="/escuelas" />
        <NavigationListItem icon={AttachMoneyIcon} text="Renta" route="/renta" />
        <NavigationListItem icon={HelpIcon} text="Ayuda" route="/ayuda" />
        <NavigationListItem icon={SettingsIcon} text="Configuraciones" route="/configuraciones" />
      </List>
    </Box>
  );
};

export default Sidebar;
