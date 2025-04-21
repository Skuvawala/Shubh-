import { useState, useEffect } from "react";
import { Typography, Box, Avatar, Button, Paper, CircularProgress } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";

export const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          name: currentUser.displayName || "Anonymous User",
          email: currentUser.email,
          photoURL: currentUser.photoURL || "https://via.placeholder.com/150",
        });
      } else {
        setUser(null);
      }
      setLoading(false); // Stop loading once user data is fetched
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Loading profile...</Typography>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          textAlign: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6" color="error">No user signed in</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <div>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            boxShadow: 3,
            bgcolor: "background.paper",
            minWidth: 300,
          }}
        >
          <Avatar
            src={user.photoURL}
            alt={user.name}
            sx={{ width: 120, height: 120, margin: "auto", mb: 2 }}
          />
          <Typography variant="h5" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.email}
          </Typography>
          <Button
            variant="contained"
            color="error"
            startIcon={<Logout />}
            sx={{ mt: 3 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Paper>
      </Box>
    </div>
  );
};

export default UserProfile;
