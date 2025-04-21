require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Groq } = require('groq-sdk');

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.post('/api/groq', async (req, res) => {
  try {
    const { messages } = req.body;
    const completion = await groq.chat.completions.create({
      messages,
      model: "mixtral-8x7b-32768"
    });
    res.json(completion.choices[0].message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'API request failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));