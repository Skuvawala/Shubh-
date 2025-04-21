import React, { useState, useEffect } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Select, 
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  CircularProgress,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  FormControl,
  InputLabel
} from '@mui/material';
import { Restaurant, LocalDining, Schedule, DinnerDining, FitnessCenter } from '@mui/icons-material';
import { getMealRecommendations } from '../api/groqClient';

const MealFinder = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [dietaryPreference, setDietaryPreference] = useState('Any');
  const [cuisine, setCuisine] = useState('Any');
  const [cookingTime, setCookingTime] = useState('Any');
  const [mealType, setMealType] = useState('Any');
  const [difficulty, setDifficulty] = useState('Any');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const dietaryOptions = ['Any','Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Gluten-Free'];
  const cuisineOptions = ['Any','Italian', 'Mexican', 'Asian', 'Mediterranean', 'American'];
  const timeOptions = ['Any','15', '30', '45', '60'];
  const mealTypeOptions = ['Any','Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];
  const difficultyOptions = ['Any','Easy', 'Medium', 'Advanced'];

  const fetchMeals = async () => {
    setLoading(true);
    setError('');
    try {
      const filters = {
        dietaryPreference,
        cuisine,
        cookingTime,
        mealType,
        difficulty
      };
      const meals = await getMealRecommendations(filters);
      setMeals(meals);
    } catch (err) {
      setError('Failed to generate meal ideas. Please try again.');
      console.error('Meal fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [dietaryPreference, cuisine, cookingTime, mealType, difficulty]);

  // Common styles for inputs
  const selectStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'gold' },
      '&:hover fieldset': { borderColor: 'white' },
      '&.Mui-focused fieldset': { borderColor: 'gold' }
    },
    '& .MuiInputLabel-root': { color: 'gold' },
    '& .MuiSelect-icon': { color: 'gold' },
    '& .MuiSelect-select': { color: 'white' }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        maxWidth: '100%',
        width: '100%',
        background: '#1a1a1a',
        color: 'white',
        borderRadius: 3,
        boxShadow: '0px 5px 20px rgba(255, 215, 0, 0.3)',
        border: '1px solid gold',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ color: 'gold', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
        <LocalDining fontSize="large" sx={{ color: 'gold' }} /> AI Meal Finder
      </Typography>

      {/* Enhanced Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel id="dietary-label" sx={{ color: 'gold' }}>Diet</InputLabel>
          <Select
            labelId="dietary-label"
            value={dietaryPreference}
            onChange={(e) => setDietaryPreference(e.target.value)}
            label="Diet"
            sx={selectStyles}
          >
            {dietaryOptions.map(option => (
              <MenuItem key={option} value={option.toLowerCase()}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel id="time-label" sx={{ color: 'gold' }}>Cooking Time</InputLabel>
          <Select
            labelId="time-label"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            label="Cooking Time"
            sx={selectStyles}
          >
            {timeOptions.map(option => (
              <MenuItem key={option} value={option}>
                {option === 'Any' ? 'Any Time' : `${option} mins`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel id="meal-type-label" sx={{ color: 'gold' }}>Meal Type</InputLabel>
          <Select
            labelId="meal-type-label"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            label="Meal Type"
            sx={selectStyles}
          >
            {mealTypeOptions.map(option => (
              <MenuItem key={option} value={option.toLowerCase()}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Loading and Error States */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: 'gold' }} />
          <Typography variant="body1" sx={{ ml: 2, color: 'gold' }}>Crafting delicious ideas...</Typography>
        </Box>
      )}

      {error && (
        <Typography sx={{ mt: 2, color: '#ff6b6b', fontWeight: 'bold' }}>
          {error}
        </Typography>
      )}

      {/* Meal Grid */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {meals.map((meal, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                background: '#222',
                border: '1px solid gold',
                borderRadius: 2,
                boxShadow: '0px 3px 10px rgba(255, 215, 0, 0.2)',
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: 'gold' }}>
                  {meal.name}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    label={`${meal.cookingTime} mins`} 
                    size="small"
                    icon={<Schedule fontSize="small" />}
                    sx={{ 
                      backgroundColor: '#2c2c2c', 
                      color: 'gold', 
                      borderColor: 'gold', 
                      '& .MuiChip-icon': { color: 'gold' } 
                    }}
                  />
                  <Chip 
                    label={meal.dietaryPreference} 
                    variant="outlined" 
                    size="small"
                    sx={{ color: 'white', borderColor: 'gold' }}
                  />
                  <Chip
                    label={meal.mealType}
                    size="small"
                    icon={<DinnerDining fontSize="small" />}
                    sx={{ 
                      backgroundColor: '#2c2c2c', 
                      color: 'gold', 
                      borderColor: 'gold',
                      '& .MuiChip-icon': { color: 'gold' }
                    }}
                  />
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setSelectedMeal(meal)}
                  startIcon={<Restaurant />}
                  sx={{
                    backgroundColor: 'gold',
                    color: 'black',
                    fontWeight: 'bold',
                    '&:hover': { backgroundColor: '#d4af37' },
                    borderRadius: 2,
                  }}
                >
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Enhanced Meal Detail Dialog */}
      <Dialog
        open={Boolean(selectedMeal)}
        onClose={() => setSelectedMeal(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: '#1a1a1a',
            color: 'white',
            border: '1px solid gold',
            borderRadius: 2,
          }
        }}
      >
        {selectedMeal && (
          <>
            <DialogTitle sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: 'gold',
              borderBottom: '1px solid #333'
            }}>
              <Restaurant sx={{ color: 'gold' }} /> {selectedMeal.name}
            </DialogTitle>
            <DialogContent dividers sx={{ borderColor: '#333' }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label={`Ready in: ${selectedMeal.cookingTime} mins`} 
                  sx={{ backgroundColor: '#2c2c2c', color: 'gold', borderColor: 'gold' }}
                />
                <Chip 
                  label={`Diet: ${selectedMeal.dietaryPreference}`} 
                  variant="outlined" 
                  sx={{ color: 'white', borderColor: 'gold' }}
                />
                <Chip 
                  label={`Meal Type: ${selectedMeal.mealType}`} 
                  sx={{ backgroundColor: '#2c2c2c', color: 'gold', borderColor: 'gold' }}
                />
              </Box>

              <Typography variant="h6" gutterBottom sx={{ color: 'gold', mt: 2 }}>
                Nutritional Info
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Chip 
                  label={`Calories: ${selectedMeal.nutrition?.calories}`} 
                  sx={{ backgroundColor: '#2c2c2c', color: 'white', borderColor: '#333' }}
                />
                <Chip 
                  label={`Protein: ${selectedMeal.nutrition?.protein}g`} 
                  sx={{ backgroundColor: '#2c2c2c', color: '#76ff7a', borderColor: '#333' }}
                />
                <Chip 
                  label={`Carbs: ${selectedMeal.nutrition?.carbs}g`} 
                  sx={{ backgroundColor: '#2c2c2c', color: '#79e2ff', borderColor: '#333' }}
                />
                <Chip 
                  label={`Fats: ${selectedMeal.nutrition?.fats}g`} 
                  sx={{ backgroundColor: '#2c2c2c', color: '#ffd666', borderColor: '#333' }}
                />
              </Box>

              <Typography variant="h6" gutterBottom sx={{ color: 'gold' }}>
                Ingredients
              </Typography>
              <List dense sx={{ mb: 2 }}>
                {selectedMeal.ingredients.map((ingredient, i) => (
                  <ListItem key={i}>
                    <ListItemText 
                      primary={`• ${ingredient}`} 
                      sx={{ '& .MuiListItemText-primary': { color: 'white' } }}
                    />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" gutterBottom sx={{ color: 'gold' }}>
                Instructions
              </Typography>
              <Typography variant="body1" whiteSpace="pre-wrap" sx={{ color: '#e0e0e0' }}>
                {selectedMeal.instructions}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ borderTop: '1px solid #333' }}>
              <Button 
                onClick={() => setSelectedMeal(null)}
                sx={{ 
                  color: 'gold', 
                  '&:hover': { backgroundColor: 'rgba(255, 215, 0, 0.1)' } 
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Paper>
  );
};

export default MealFinder;