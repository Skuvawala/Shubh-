import React, { useState } from 'react';
import { getAIResponse } from '../api/groqClient';
import ReactMarkdown from 'react-markdown';
import { 
  Button, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Typography,
  Card,
  CircularProgress,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const SkinCare = () => {
  const [skinType, setSkinType] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'];

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const getRecommendations = async () => {
    setLoading(true);
    setError('');
    try {
      const prompt = `Provide detailed skincare recommendations for ${skinType} skin type including:
      - Morning routine
      - Evening routine
      - Product recommendations
      - Weekly treatments
      Format the response in markdown with clear sections.`;
      
      const systemMessage = `You are a dermatology skincare expert. 
        Provide accurate, safe recommendations using only verified medical information.
        Format response in markdown with headers and bullet points.`;

      const response = await getAIResponse(prompt, systemMessage);
      setRecommendations(response);
      setRetryCount(0);
    } catch (err) {
      if(retryCount < 3) {
        setRetryCount(c => c + 1);
        setTimeout(getRecommendations, 2000);
      } else {
        setError('Failed to fetch recommendations. Please try again later.');
        console.error('API Error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#121212', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#FFD700' }}>
        Skin Care Advisor
        <IconButton 
          onClick={handleStartQuiz}
          sx={{ color: '#FFD700', ml: 1 }}
          title="Take skin type quiz"
        >
          <HelpOutlineIcon />
        </IconButton>
      </Typography>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Card sx={{ backgroundColor: '#1E1E1E', color: 'white', border: '2px solid #FFD700', p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Select your skin type:
        </Typography>
        <RadioGroup 
          value={skinType} 
          onChange={(e) => setSkinType(e.target.value)}
          row
        >
          {skinTypes.map((type) => (
            <FormControlLabel
              key={type}
              value={type}
              control={<Radio sx={{ color: '#FFD700' }} />}
              label={type}
              sx={{ color: 'white' }}
            />
          ))}
        </RadioGroup>
        
        <Button 
          variant="contained"
          onClick={handleStartQuiz}
          sx={{ backgroundColor: '#FFD700', color: 'black', mt: 1, '&:hover': { backgroundColor: '#E6C200' } }}
          startIcon={<HelpOutlineIcon />}
        >
          Not sure? Take our skin type quiz
        </Button>
      </Card>

      {skinType && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button 
            variant="contained" 
            onClick={getRecommendations}
            disabled={loading}
            size="large"
            sx={{ 
              backgroundColor: '#FFD700', 
              color: 'black', 
              '&:hover': { backgroundColor: '#E6C200' },
              minWidth: 200
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'black' }} />
            ) : (
              `Get Recommendations${retryCount > 0 ? ` (Retry ${retryCount})` : ''}`
            )}
          </Button>
        </Box>
      )}

      {recommendations && (
        <Card sx={{ 
          backgroundColor: '#1E1E1E', 
          color: 'white', 
          border: '2px solid #FFD700', 
          mt: 4, 
          p: 3,
          '& pre': { 
            backgroundColor: '#000', 
            padding: 2, 
            borderRadius: 1,
            overflowX: 'auto'
          }
        }}>
          <ReactMarkdown>{recommendations}</ReactMarkdown>
        </Card>
      )}

      <Dialog open={showQuiz} onClose={() => setShowQuiz(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ backgroundColor: '#1E1E1E', color: 'white', borderBottom: '2px solid #FFD700' }}>
          Skin Type Quiz
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#1E1E1E', color: 'white' }}>
          <Typography>Quiz Coming Soon...</Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#1E1E1E', borderTop: '2px solid #FFD700' }}>
          <Button onClick={() => setShowQuiz(false)} sx={{ color: '#FFD700' }}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SkinCare;