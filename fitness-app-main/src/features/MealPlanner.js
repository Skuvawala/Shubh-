import React, { useState } from 'react';
import { getAIResponse } from '../api/groqClient';
import { Button, TextField, Grid, Typography, Paper, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { RestaurantMenu } from '@mui/icons-material';

const MealPlanner = () => {
  const [inputs, setInputs] = useState({
    calories: 2000,
    protein: 50,
    diet: 'balanced'
  });
  const [mealPlan, setMealPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const generateMealPlan = async () => {
    setLoading(true);
    const prompt = `Create a daily meal plan with:
    - Total calories: ${inputs.calories}
    - Protein target: ${inputs.protein}g
    - Diet type: ${inputs.diet}
    Include recipes with ingredients and preparation steps. Format in markdown.`;
    
    const response = await getAIResponse(prompt, "You are a professional nutritionist");
    setMealPlan(response);
    setLoading(false);
  };

  // Common styles for inputs
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

  const dietOptions = ['balanced', 'low-carb', 'high-protein', 'vegetarian', 'vegan', 'keto', 'paleo'];

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        maxWidth: '100%',
        width: '100%',
        textAlign: "center",
        borderRadius: 3,
        background: "#1a1a1a",
        boxShadow: "0px 5px 20px rgba(255, 215, 0, 0.3)",
        border: "1px solid gold",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "gold", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <RestaurantMenu /> AI Meal Planner
      </Typography>
      <Typography variant="body2" color="white" mb={3}>
        Generate a customized daily meal plan based on your nutritional needs
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Daily Calories"
            type="number"
            value={inputs.calories}
            onChange={(e) => setInputs({...inputs, calories: e.target.value})}
            fullWidth
            sx={inputStyles}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Protein (grams)"
            type="number"
            value={inputs.protein}
            onChange={(e) => setInputs({...inputs, protein: e.target.value})}
            fullWidth
            sx={inputStyles}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="diet-type-label" sx={{ color: "gold" }}>Diet Type</InputLabel>
            <Select
              labelId="diet-type-label"
              value={inputs.diet}
              label="Diet Type"
              onChange={(e) => setInputs({...inputs, diet: e.target.value})}
              sx={inputStyles}
            >
              {dietOptions.map(option => (
                <MenuItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={generateMealPlan}
        disabled={loading}
        sx={{
          mb: 4,
          p: 1.5,
          borderRadius: 2,
          backgroundColor: "gold",
          color: "#000",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#d4af37" },
        }}
        fullWidth
      >
        {loading ? <CircularProgress size={24} sx={{ color: "#000" }} /> : 'Create Meal Plan'}
      </Button>

      {mealPlan && (
        <Box sx={{ mt: 4, p: 3, border: '1px solid gold', borderRadius: 2, textAlign: 'left' }}>
          <Typography variant="h6" sx={{ color: "gold", mb: 2 }}>Your Personalized Meal Plan:</Typography>
          <Box sx={{ color: "white" }}>
            <ReactMarkdown>{mealPlan}</ReactMarkdown>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default MealPlanner;