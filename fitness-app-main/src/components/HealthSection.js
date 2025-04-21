import React from "react";
import HeartAttackPrediction from "../features/HeartAttackPrediction";
import SkinCare from "../features/SkinCare";
import Header from "./Header";
import { Box, Container, Typography, Paper } from "@mui/material";

const HealthSection = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#000", // Sleek dark background
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 5,
      }}
    >
      <Header />

      <Container maxWidth="lg">
        {/* Health Section Header */}
        <Typography
          variant="h1"
          fontWeight="bold"
          sx={{
            textAlign: "center",
            mb: 4,
            margin:5,
            color: "gold",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          Health Section
        </Typography>

        {/* Heart Attack Prediction Section */}
        <Paper
          elevation={6}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 3,
            background: "#1a1a1a",
            boxShadow: "0px 0px 20px rgba(255, 215, 0, 0.5)", // Stronger glow
            border: "1px solid gold",
            transition: "0.3s",
            "&:hover": {
              boxShadow: "0px 0px 25px rgba(255, 215, 0, 0.7)", // Brighter on hover
            },
          }}
        >
          <HeartAttackPrediction />
        </Paper>

        {/* Skin Care Section */}
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            background: "#1a1a1a",
            boxShadow: "0px 0px 20px rgba(255, 215, 0, 0.5)", // Stronger glow
            border: "1px solid gold",
            transition: "0.3s",
            "&:hover": {
              boxShadow: "0px 0px 25px rgba(255, 215, 0, 0.7)", // Brighter on hover
            },
          }}
        >
          <SkinCare />
        </Paper>
      </Container>
    </Box>
  );
};

export default HealthSection;
