import React, { useState } from 'react';
import { getAIResponse } from '../api/groqClient';
import ReactMarkdown from 'react-markdown';
import { 
  TextField, 
  Button, 
  CircularProgress, 
  Paper, 
  Grid, 
  Select, 
  MenuItem, 
  Typography, 
  Box, 
  Container
} from '@mui/material';

const HeartAttackPrediction = () => {
  const [inputs, setInputs] = useState({
    age: '',
    systolicBP: '',
    diastolicBP: '',
    cholesterol: '',
    weight: '',
    height: '',
    bloodSugar: '',
    smoker: 'no'
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const prompt = `Analyze these health parameters for heart attack risk:
    Age: ${inputs.age}
    Blood Pressure: ${inputs.systolicBP}/${inputs.diastolicBP} mmHg
    Cholesterol: ${inputs.cholesterol} mg/dL
    Weight: ${inputs.weight} kg
    Height: ${inputs.height} cm
    Blood Sugar: ${inputs.bloodSugar} mg/dL
    Smoker: ${inputs.smoker}
    
    Provide risk assessment with percentage probability and recommendations in markdown format.`;
    
    const systemMsg = "You are a medical AI assistant specialized in cardiology. Provide accurate risk assessments with actionable recommendations.";
    
    try {
      const response = await getAIResponse(prompt, systemMsg);
      setResult(response);
    } catch (error) {
      setResult("Error: Please try again later");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212',
      color: 'white',
      padding: 4,
      borderRadius: 3,
    }}>
      <Paper elevation={6} sx={{
        padding: 5,
        width: '80%',
        borderRadius: 3,
        background: "#1a1a1a",
        boxShadow: "0px 0px 20px rgba(255, 215, 0, 0.5)",
        border: "2px solid #FFD700",
      }}>
        <Typography variant="h3" textAlign="center" sx={{ mb: 4, color: '#FFD700', fontWeight: 'bold' }}>
          Heart Health Analysis
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {Object.keys(inputs).map((key) => (
              key !== "smoker" ? (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    type="number"
                    fullWidth
                    required
                    value={inputs[key]}
                    onChange={(e) => setInputs({...inputs, [key]: e.target.value})}
                    sx={{
                      bgcolor: "#333",
                      input: { color: "white" },
                      label: { color: "white" },
                      borderRadius: 2,
                    }}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6} key={key}>
                  <Select
                    fullWidth
                    value={inputs.smoker}
                    onChange={(e) => setInputs({...inputs, smoker: e.target.value})}
                    sx={{ bgcolor: "#333", color: "white", borderRadius: 2 }}
                  >
                    <MenuItem value="yes">Smoker</MenuItem>
                    <MenuItem value="no">Non-Smoker</MenuItem>
                  </Select>
                </Grid>
              )
            ))}
          </Grid>
          <Button 
            variant="contained" 
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              marginTop: '30px',
              padding: '12px',
              bgcolor: '#FFD700',
              color: '#000',
              fontSize: '18px',
              fontWeight: 'bold',
              '&:hover': { bgcolor: '#e6c200' }
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'black' }} /> : 'Analyze Risk'}
          </Button>
        </form>
        
        {result && (
          <Box mt={4} p={3} sx={{
            bgcolor: "#222",
            borderRadius: 2,
            color: "white",
            border: "1px solid #FFD700",
            fontSize: '16px',
          }}>
            <ReactMarkdown>{result}</ReactMarkdown>
          </Box>
        )}
      </Paper>
    </Container>
  );
};
export default HeartAttackPrediction;