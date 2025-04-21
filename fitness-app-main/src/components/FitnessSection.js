import { Box, Typography, Paper, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { ExerciseFinder } from "../features/ExerciseFinder";
import { FitnessPlanner } from "../features/FitnessPlanner";
import { Header } from "./Header";

const FitnessSection = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#000", // Solid black background to match signup
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 5,
      }}
    >
      <Header />
      <Container maxWidth="lg">
        {/* Fitness Section Header */}
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            textAlign: "center",
            mb: 5,
            mt: 3,
            color: "gold", // Changed to match signup's gold color
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Fitness Section
        </Typography>

        {/* Fitness Content Box */}
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            background: "#1a1a1a", // Matching the signup dark background
            textAlign: "center",
            color: "white",
            boxShadow: "0px 5px 20px rgba(255, 215, 0, 0.3)", // Matching signup's shadow
            border: "1px solid gold", // Adding gold border like signup
          }}
        >
          {/* Section Description */}
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: "gold" }}>
            Elevate Your Fitness Journey
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "#cccccc" }}>
            Get personalized workout plans, track your progress, and achieve your fitness goals efficiently.
          </Typography>

          {/* UI Containers with Dynamic Width Stretching */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
            
            {/* Fitness Planner Container - Removed duplicate container since FitnessPlanner already has its own styling */}
            <Box sx={{ width: "100%" }}>
              <FitnessPlanner />
            </Box>

            {/* Exercise Finder Container */}
            <Paper
              sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid gold", // Matching signup's border
                background: "#1a1a1a", // Matching signup's background
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                boxShadow: "0px 5px 20px rgba(255, 215, 0, 0.3)", // Matching signup's shadow
              }}
            >
              <Typography variant="h4" fontWeight="bold" sx={{ mb: 3, color: "gold", textAlign: "center" }}>
                Exercise Finder
              </Typography>
              <Box sx={{ width: "100%" }}>
                <ExerciseFinder />
              </Box>
            </Paper>

            {/* Navigation Button */}
            <Button
              component={Link}
              to="/meal-section"
              variant="contained"
              sx={{
                mt: 2,
                p: 1.5,
                backgroundColor: "gold",
                color: "#000",
                fontWeight: "bold",
                borderRadius: 2,
                width: "100%",
                maxWidth: 800,
                "&:hover": { backgroundColor: "#d4af37" }, // Darker gold on hover, matching signup
              }}
            >
              Nutrition Guide
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FitnessSection;