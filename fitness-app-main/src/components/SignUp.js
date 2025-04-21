import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Alert, Typography, Box, Paper } from "@mui/material";
import { auth, signInWithGoogle } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Google as GoogleIcon } from "@mui/icons-material";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/after-login");
    } catch (err) {
      setError(err.message.replace(/Firebase:|auth\/|-|_/g, " ").trim());
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/after-login");
    } catch (err) {
      setError(err.message.replace(/Firebase:|auth\/|-|_/g, " ").trim());
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "white",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
          background: "#1a1a1a",
          boxShadow: "0px 5px 20px rgba(255, 215, 0, 0.3)",
          border: "1px solid gold",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "gold" }}>
          Sign Up
        </Typography>
        <Typography variant="body2" color="white" mb={2}>
          Create an account to get started!
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2, background: "#b71c1c", color: "white" }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              borderRadius: 2,
              input: { color: "white" },
              label: { color: "gold" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gold" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "gold" },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              borderRadius: 2,
              input: { color: "white" },
              label: { color: "gold" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gold" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "gold" },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              borderRadius: 2,
              input: { color: "white" },
              label: { color: "gold" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gold" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "gold" },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: "gold",
              color: "#000",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#d4af37" },
            }}
          >
            Sign Up
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleSignIn}
            startIcon={<GoogleIcon sx={{ color: "gold" }} />}
            sx={{
              mb: 2,
              p: 1.5,
              borderRadius: 2,
              borderColor: "gold",
              color: "gold",
              "&:hover": { borderColor: "white", color: "white" },
            }}
          >
            Sign Up with Google
          </Button>

          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="body2" sx={{ color: "white" }}>
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "gold",
                    fontWeight: "bold",
                    transition: "0.3s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "white")}
                  onMouseLeave={(e) => (e.target.style.color = "gold")}
                >
                  Sign In
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
