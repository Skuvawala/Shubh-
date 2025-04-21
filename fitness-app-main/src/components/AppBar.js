import { AppBar as MuiAppBar, Toolbar, Typography, Button } from '@mui/material';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export const AppBar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    auth.signOut();
    navigate('/login');
  };

  return (
    <MuiAppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Health & Fitness
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </MuiAppBar>
  );
};