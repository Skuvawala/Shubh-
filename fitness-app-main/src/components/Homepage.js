import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Paper, Grid } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #000, #222)", // Dark theme
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 5,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 3,
          background: "#1a1a1a", // Dark grey background
          textAlign: "center",
          maxWidth: 900,
          boxShadow: "0px 0px 15px rgba(255, 215, 0, 0.4)", // Gold glow
          border: "2px solid #FFD700",
        }}
      >
        {/* Hero Section */}
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            color: "#FFD700",
            textTransform: "uppercase",
            letterSpacing: 2,
            mb: 2,
          }}
        >
          Welcome to Health & Fitness Hub
        </Typography>

        <Typography variant="h6" color="white" sx={{ mb: 4 }}>
          Transform your health with personalized fitness and wellness plans, 
          expert guidance, and real-time tracking.
        </Typography>

        {/* Feature Highlights */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <FitnessCenterIcon sx={{ fontSize: 50, color: "#FFD700" }} />
              <Typography variant="h6"  color="white" sx={{ mt: 1 }}>Custom Workouts</Typography>
              <Typography variant="body2" color="gray">
                Personalized exercise plans to match your fitness level and goals.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <FavoriteIcon sx={{ fontSize: 50, color: "#FFD700" }} />
              <Typography variant="h6" color="white" sx={{ mt: 1 }}>Heart Health Monitoring</Typography>
              <Typography variant="body2" color="gray">
                AI-powered heart attack risk predictions to keep you safe.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <EmojiEventsIcon sx={{ fontSize: 50, color: "#FFD700" }} />
              <Typography variant="h6"  color="white" sx={{ mt: 1 }}>Achieve Your Goals</Typography>
              <Typography variant="body2" color="gray">
                Stay motivated with progress tracking and challenges.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Why Choose Us? */}
        <Typography variant="h5" color="white" fontWeight="bold" sx={{ mb: 2 }}>
          Why Choose Us?
        </Typography>
        <Typography variant="body1" color="gray" sx={{ mb: 3 }}>
          Our platform is designed for **everyone**—beginners, athletes, and fitness enthusiasts.  
          With **AI-driven insights**, expert fitness routines, and nutrition guidance,  
          we make your wellness journey **simple and effective**.
        </Typography>

        {/* CTA Button */}
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/SignUp"
          sx={{
            backgroundColor: "#FFD700",
            color: "#000",
            fontWeight: "bold",
            borderRadius: 2,
            px: 4,
            py: 1.5,
            boxShadow: "0px 0px 10px rgba(255, 215, 0, 0.6)",
            "&:hover": {
              backgroundColor: "#FFC107",
            },
          }}
        >
          Get Started
        </Button>
      </Paper>
    </Box>
  );
};

export default HomePage;
