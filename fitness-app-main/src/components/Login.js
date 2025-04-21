import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Alert,
  Box,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { auth, signInWithGoogle } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/after-login");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/after-login");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
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
          borderRadius: 3,
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          background: "#1a1a1a",
          boxShadow: "0px 5px 20px rgba(255, 215, 0, 0.3)",
          border: "1px solid gold",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "gold" }}>
          Login
        </Typography>
        <Typography variant="body2" color="white" mb={2}>
          Log in to get started!
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2, background: "#b71c1c", color: "white" }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email Address"
            autoComplete="email"
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
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
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              input: { color: "white" },
              label: { color: "gold" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "gold" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "gold" },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "gold" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
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
            Sign In
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
            Sign In with Google
          </Button>
        </Box>

        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="body2" sx={{ mt: 2, color: "white" }}>
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  textDecoration: "none",
                  color: "gold",
                  fontWeight: "bold",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "white")}
                onMouseLeave={(e) => (e.target.style.color = "gold")}
              >
                Sign Up
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Login;
