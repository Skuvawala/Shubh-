import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";

export const Header = () => {
  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: "linear-gradient(to right, #111, #222)", // Dark gradient
        boxShadow: "0px 4px 10px rgba(255, 215, 0, 0.3)", // Subtle gold glow
        borderBottom: "2px solid #FFD700"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* App Name */}
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: "bold", 
            letterSpacing: 1,
            color: "#FFD700", // Gold text
            textTransform: "uppercase"
          }}
        >
          Fitness & Health
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            component={Link}
            to="/after-login"
            startIcon={<HomeIcon />}
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "white",
              "&:hover": { color: "#FFD700", transform: "scale(1.1)" },
              transition: "0.3s ease-in-out",
            }}
          >
            Home
          </Button>

          <Button
            component={Link}
            to="/user-profile"
            startIcon={<AccountCircleIcon />}
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              color: "white",
              "&:hover": { color: "#FFD700", transform: "scale(1.1)" },
              transition: "0.3s ease-in-out",
            }}
          >
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
