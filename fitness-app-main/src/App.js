import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import { 
  HomePage, 
  Login, 
  UserProfile,
  Signup, 
  HealthSection,
  FitnessSection,
  MealSection,
  ProtectedRoute,
  AfterLogin
} from './components';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={< HomePage />}/>
          <Route path="/after-login" element={<AfterLogin />} />
          <Route index element={<HomePage />} />
            <Route path="/health-section" element={<HealthSection />} />
            <Route path="/fitness-section" element={<FitnessSection />} />
            <Route path="/meal-section" element={<MealSection />} />
            <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/Login" element={
            <ProtectedRoute>
              <AfterLogin />
            </ProtectedRoute>
          }>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;