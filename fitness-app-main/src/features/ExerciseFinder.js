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
  Box
} from '@mui/material';
import { FitnessCenter, TrendingUp } from '@mui/icons-material';
import { getExerciseRecommendations } from '../api/groqClient';

export const ExerciseFinder = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [muscleGroup, setMuscleGroup] = useState('chest');
  const [difficulty, setDifficulty] = useState('beginner');
  const [equipment, setEquipment] = useState('bodyweight');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const muscleGroups = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core'];
  const difficultyLevels = ['beginner', 'intermediate', 'advanced'];
  const equipmentOptions = ['bodyweight', 'dumbbells', 'barbell', 'resistance bands', 'machine'];

  const fetchExercises = async () => {
    setLoading(true);
    setError('');
    try {
      const filters = { muscleGroup, difficulty, equipment };
      const exercises = await getExerciseRecommendations(filters);
      setExercises(exercises);
    } catch (err) {
      setError('Failed to generate exercises. Please try again.');
      console.error('Exercise fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [muscleGroup, difficulty, equipment]);

  return (
    <div style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', padding: '20px' }}>

      {/* Filters */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
        {[{ label: 'Muscle Group', value: muscleGroup, setter: setMuscleGroup, options: muscleGroups },
          { label: 'Difficulty', value: difficulty, setter: setDifficulty, options: difficultyLevels },
          { label: 'Equipment', value: equipment, setter: setEquipment, options: equipmentOptions }]
          .map((filter, index) => (
            <Select
              key={index}
              value={filter.value}
              onChange={(e) => filter.setter(e.target.value)}
              variant="outlined"
              sx={{
                color: 'white',
                bgcolor: '#333',
                borderRadius: 2,
                width: 250,
                border: '2px solid #FFD700',
                '& .MuiSvgIcon-root': { color: 'white' }
              }}
            >
              {filter.options.map(opt => (
                <MenuItem key={opt} value={opt} sx={{ color: 'white', bgcolor: '#222' }}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </MenuItem>
              ))}
            </Select>
        ))}
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: '#FFD700' }} />
          <Typography variant="body1" sx={{ ml: 2 }}>Generating exercises...</Typography>
        </Box>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Exercise Grid */}
      <Grid container spacing={3}>
        {exercises.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', backgroundColor: '#1E1E1E', color: 'white', border: '2px solid #FFD700' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {exercise.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  <Chip label={exercise.muscleGroup} color="primary" size="small" icon={<FitnessCenter fontSize="small" />} sx={{ bgcolor: '#FFD700', color: 'black' }} />
                  <Chip label={exercise.difficulty} color="secondary" size="small" />
                  <Chip label={exercise.equipment} variant="outlined" size="small" sx={{ color: '#FFD700', borderColor: '#FFD700' }} />
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: '#FFD700', color: 'black', '&:hover': { backgroundColor: '#E6C200' } }}
                  onClick={() => setSelectedExercise(exercise)}
                  startIcon={<TrendingUp />}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Exercise Detail Dialog */}
      <Dialog
        open={Boolean(selectedExercise)}
        onClose={() => setSelectedExercise(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedExercise && (
          <>
            <DialogTitle sx={{ backgroundColor: '#1E1E1E', color: 'white', borderBottom: '2px solid #FFD700' }}>{selectedExercise.name}</DialogTitle>
            <DialogContent sx={{ backgroundColor: '#1E1E1E', color: 'white' }}>
              <Typography variant="h6" gutterBottom>Instructions</Typography>
              <Typography variant="body1" whiteSpace="pre-wrap">
                {selectedExercise.instructions}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Precautions</Typography>
              <Typography variant="body1" whiteSpace="pre-wrap">
                {selectedExercise.precautions}
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label={`Muscle: ${selectedExercise.muscleGroup}`} sx={{ bgcolor: '#FFD700', color: 'black' }} />
                <Chip label={`Difficulty: ${selectedExercise.difficulty}`} color="secondary" />
                <Chip label={`Equipment: ${selectedExercise.equipment}`} variant="outlined" sx={{ color: '#FFD700', borderColor: '#FFD700' }} />
              </Box>
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#1E1E1E', borderTop: '2px solid #FFD700' }}>
              <Button onClick={() => setSelectedExercise(null)} sx={{ color: '#FFD700' }}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default ExerciseFinder;
