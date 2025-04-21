import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { getAIResponse } from '../api/groqClient';
import { 
  Button, 
  Select, 
  MenuItem, 
  Typography, 
  Grid, 
  TextField,
  CircularProgress,
  Paper,
  Box,
  FormControl,
  InputLabel
} from '@mui/material';

export const FitnessPlanner = () => {
  const [inputs, setInputs] = useState({
    goal: 'weight_loss',
    days: 3,
    level: 'beginner',
    weight: '',
    height: ''
  });
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    setLoading(true);
    const prompt = `Create a ${inputs.days}-day ${inputs.level} ${inputs.goal.replace('_', ' ')} workout plan for someone with:
    - Weight: ${inputs.weight} kg
    - Height: ${inputs.height} cm
    Include exercise names, sets/reps, rest times, and progression tips. Format in basic text explaining everything nicely.`;
    
    const response = await getAIResponse(prompt, "You are a certified fitness trainer");
    setPlan(response);
    setLoading(false);
  };

  // Common styles for TextField and Select
  const inputStyles = {
    input: { color: "white" },
    label: { color: "gold" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "gold" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "gold" },
    },
    "& .MuiInputLabel-root": { color: "gold" },
    "& .MuiSelect-icon": { color: "gold" },
    "& .MuiSelect-select": { color: "white" }
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
          maxWidth: 800,
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
          background: "#1a1a1a",
          boxShadow: "0px 5px 20px rgba(255, 215, 0, 0.3)",
          border: "1px solid gold",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "gold" }}>
          AI Fitness Planner
        </Typography>
        <Typography variant="body2" color="white" mb={2}>
          Fill in the details below to generate a personalized workout plan.
        </Typography>
        
        <Grid container spacing={3} style={{ marginBottom: '20px' }}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="goal-label" sx={{ color: "gold" }}>Select Your Goal</InputLabel>
              <Select
                labelId="goal-label"
                fullWidth
                value={inputs.goal}
                label="Select Your Goal"
                onChange={(e) => setInputs({...inputs, goal: e.target.value})}
                sx={inputStyles}
              >
                <MenuItem value="weight_loss">Weight Loss</MenuItem>
                <MenuItem value="muscle_gain">Muscle Gain</MenuItem>
                <MenuItem value="endurance">Endurance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="days-label" sx={{ color: "gold" }}>Days Per Week</InputLabel>
              <Select
                labelId="days-label"
                fullWidth
                value={inputs.days}
                label="Days Per Week"
                onChange={(e) => setInputs({...inputs, days: e.target.value})}
                sx={inputStyles}
              >
                {[1, 2, 3, 4, 5, 6, 7].map(day => (
                  <MenuItem key={day} value={day}>{day} Day{day > 1 ? 's' : ''}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Weight in kg"
              type="number"
              value={inputs.weight}
              onChange={(e) => setInputs({...inputs, weight: e.target.value})}
              sx={inputStyles}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Height in cm"
              type="number"
              value={inputs.height}
              onChange={(e) => setInputs({...inputs, height: e.target.value})}
              sx={inputStyles}
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="level-label" sx={{ color: "gold" }}>Your Fitness Level</InputLabel>
              <Select
                labelId="level-label"
                fullWidth
                value={inputs.level}
                label="Your Fitness Level"
                onChange={(e) => setInputs({...inputs, level: e.target.value})}
                sx={inputStyles}
              >
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button 
          variant="contained" 
          onClick={generatePlan}
          disabled={loading}
          fullWidth
          sx={{
            p: 1.5,
            borderRadius: 2,
            backgroundColor: "gold",
            color: "#000",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#d4af37" },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "#000" }} /> : 'Generate Plan'}
        </Button>

        {plan && (
          <Box sx={{ mt: 4, p: 2, border: '1px solid gold', borderRadius: 2, textAlign: 'left' }}>
            <Typography variant="h6" sx={{ color: "gold", mb: 2 }}>Your AI-Generated Fitness Plan:</Typography>
            <Box sx={{ color: "white" }}>
              <ReactMarkdown>{plan}</ReactMarkdown>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default FitnessPlanner;