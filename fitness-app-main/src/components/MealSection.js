import React from "react";
import Header from "./Header";
import MealPlanner from "../features/MealPlanner";
import MealFinder from "../features/MealFinder";
import { Box, Typography, Paper, Container } from "@mui/material";

const MealSection = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #000, #2c2c2c)", // Dark-themed background
        color: "white",
      }}
    >
      <Header />

      <Container maxWidth="md" sx={{ textAlign: "center", py: 4 }}>
        {/* Section Title */}
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            color: "#FFD700", // Gold text for premium feel
            textTransform: "uppercase",
            letterSpacing: 2,
            mb: 2,
          }}
        >
          Meal Section
        </Typography>

        <Typography variant="h6" sx={{ color: "gray", mb: 4 }}>
          Meal Planning AI & Meal Discovery
        </Typography>

        {/* Meal Planner */}
        <Paper
          elevation={6}
          sx={{
            p: 4,
            mb: 3,
            backgroundColor: "#1a1a1a",
            borderRadius: 3,
            boxShadow: "0px 0px 15px rgba(255, 215, 0, 0.4)",
            border: "2px solid #FFD700",
          }}
        >
          <MealPlanner />
        </Paper>

        {/* Meal Finder */}
        <Paper
          elevation={6}
          sx={{
            p: 4,
            backgroundColor: "#1a1a1a",
            borderRadius: 3,
            boxShadow: "0px 0px 15px rgba(255, 215, 0, 0.4)",
            border: "2px solid #FFD700",
          }}
        >
          <MealFinder />
        </Paper>
      </Container>
    </Box>
  );
};

export default MealSection;
