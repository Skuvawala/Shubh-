import { Box, Button, Container, Typography, Paper } from "@mui/material";
import { Header } from "./Header";
import { Outlet, Link } from "react-router-dom";
import healthImg from "../assests/health.png";  // Ensure images exist in /assets folder
import fitnessImg from "../assests/fitness.jpg";
import mealImg from "../assests/meal.jpg";

export const AfterLogin = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #000, #2c2c2c)", // Black theme gradient
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Fixed Header */}
      <Box sx={{ position: "fixed", top: 0, width: "100%", zIndex: 10 }}>
        <Header />
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ mt: 12, textAlign: "center" }}> {/* Push content down */}
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 3,
            boxShadow: 5,
            bgcolor: "#121212", // Dark background
            color: "white",
          }}
        >
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 3, color: "#FFD700" }}>
            Welcome to Your Dashboard
          </Typography>
          <Typography variant="h6" color="grey.400" sx={{ mb: 4 }}>
            Explore different sections to manage your health, fitness, and meals.
          </Typography>

          {/* Sections with Images */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
            {[
              { img: healthImg, label: "Health", link: "/health-section" },
              { img: fitnessImg, label: "Fitness", link: "/fitness-section" },
              { img: mealImg, label: "Meals", link: "/meal-section" }
            ].map(({ img, label, link }) => (
              <Box key={label} sx={{ textAlign: "center", width: 280 }}>
                <Box
                  sx={{
                    width: "100%",
                    height: 200,
                    borderRadius: 3,
                    overflow: "hidden",
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.5)", // Gold glow effect
                    mb: 2,
                  }}
                />
                <Button
                  component={Link}
                  to={link}
                  variant="contained"
                  sx={{
                    background: "#FFD700", // Gold Button
                    color: "black",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    borderRadius: 3,
                    px: 3,
                    py: 1,
                    "&:hover": { backgroundColor: "#C9A400" }, // Darker gold on hover
                  }}
                >
                  {label}
                </Button>
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>

      <Outlet />
    </Box>
  );
};

export default AfterLogin;
