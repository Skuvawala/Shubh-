import { List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import {
  Home as HomeIcon,
  Favorite as HealthIcon,
  FitnessCenter as FitnessIcon,
  Restaurant as MealIcon,
  Person as ProfileIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Changed component name to match filename casing
export const SideBar = () => (
  <Paper 
    elevation={3}
    sx={{
      width: 240,
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      borderRadius: 0
    }}
  >
    <List>
      {[
        <div className='SidebarLink'>
        <Link to='./HomePage'>Home</Link>,
        <Link to='./HealthSection'>Health</Link>,
        <Link to='./FitnessSection'>Fitness</Link>,
        <Link to='./MealSection'>Rattatouile</Link>,
        <Link to='./UserProfile'>User Profile</Link>,</div>
      ].map((item) => (
        <ListItem 
          button 
          key={item.text} 
          component={Link} 
          to={item.path}
          sx={{
            '&:hover': {
              backgroundColor: 'action.hover'
            }
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      )
      )}
    </List>
  </Paper>
);

export default SideBar;