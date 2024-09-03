import React from 'react';
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

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: '#1976d2',
        height: '100vh',
        color: 'white',
        padding: 2,
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        MARCA
      </Typography>
      <Divider sx={{ borderColor: 'white', marginBottom: 2 }} />
      <List>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Panel" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SchoolIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Professors" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BusinessIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Schools" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AttachMoneyIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Renda" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HelpIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Configurations" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
