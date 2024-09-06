import { useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const NavigationListItem = ({ icon: Icon, text, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <ListItem button sx={{ marginBottom: 4, cursor: 'pointer' }} onClick={handleClick}>
      <ListItemIcon>
        <Icon sx={{ color: 'white' }} />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default NavigationListItem;
