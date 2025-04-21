import { Box, Toolbar, Container } from '@mui/material';
import { AppBar } from './AppBar';
import { Sidebar } from './SideBar';

export const Dashboard = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};
export default Dashboard;