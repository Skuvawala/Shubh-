import { Groq } from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});
export const getMealRecommendations = async (filters) => {
  const systemMessage = `You are a world-class chef and nutritionist. Respond with valid JSON format:
  {
    "meals": [
      {
        "name": "Meal Name",
        "cookingTime": "cooking time in minutes",
        "dietaryPreference": "diet type",
        "mealType": "meal category",
        "ingredients": ["list of ingredients"],
        "instructions": "step-by-step guide",
        "nutrition": {
          "calories": "number",
          "protein": "grams",
          "carbs": "grams",
          "fats": "grams"
        }
      }
    ]
  }`;

  let prompt = `Generate 20 creative and delicious meal ideas with these requirements:\n`;
  
  if (filters.dietaryPreference !== 'any') prompt += `- Dietary: ${filters.dietaryPreference}\n`;
  if (filters.cookingTime !== 'any') prompt += `- Max Cooking Time: ${filters.cookingTime} minutes\n`;
  if (filters.mealType !== 'any') prompt += `- Meal Type: ${filters.mealType}\n`;

  prompt += `Include these details for each meal:
  - Unique and descriptive name
  - Exact cooking time
  - Clear dietary classification
  - Precise meal category
  - Detailed ingredients list with quantities
  - Step-by-step cooking instructions
  - Comprehensive nutrition facts with exact numbers`;

  try {
      const response = await getAIResponse(prompt, systemMessage, true);
      return response.meals;
  } catch (error) {
      console.error("Meal generation failed:", error);
      return [];
  }
};

// In the same groqClient.js file
export const getExerciseRecommendations = async (filters) => {
  const systemMessage = `You are a professional fitness trainer. Always respond with valid JSON format:
  {
    "exercises": [
      {
        "name": "Exercise Name",
        "muscleGroup": "Target muscle group",
        "difficulty": "Beginner/Intermediate/Advanced",
        "equipment": "Required equipment or 'None' if bodyweight",
        "instructions": "Step-by-step execution guide",
        "precautions": "Important safety tips and common mistakes",
        "setsReps": "Recommended sets and reps (e.g., 3 sets of 10 reps)",
        "duration": "Estimated time per set in seconds"
      }
    ]
  }`;

  let prompt = `Generate 10 effective exercises based on these requirements:\n`;
  
  if (filters.muscleGroup !== 'any') prompt += `- Target Muscle Group: ${filters.muscleGroup}\n`;
  if (filters.difficulty !== 'any') prompt += `- Difficulty Level: ${filters.difficulty}\n`;
  if (filters.equipment !== 'any') prompt += `- Equipment Used: ${filters.equipment}\n`;

  prompt += `For each exercise, provide:
  - Unique and descriptive name
  - The exact muscle group targeted
  - Difficulty classification (Beginner/Intermediate/Advanced)
  - Required equipment or mention if it's a bodyweight exercise
  - Clear, step-by-step execution guide
  - Safety tips, common mistakes, and modifications if needed
  - Suggested sets, reps, or duration for optimal effectiveness`;

  try {
      const response = await getAIResponse(prompt, systemMessage, true);
      return response.exercises;
  } catch (error) {
      console.error("Exercise generation failed:", error);
      return [];
  }
};

export const getAIResponse = async (prompt, systemMessage = "", isJSON = false) => {
  try {
    const params = {
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt }
      ],
      model: "mixtral-8x7b-32768",
      temperature: 0.8,
    };

    if (isJSON) {
      params.response_format = { type: "json_object" };
    }

    const response = await groq.chat.completions.create(params);
    const content = response.choices[0].message.content;

    return isJSON ? JSON.parse(content) : content;
    
  } catch (error) {
    console.error("Groq API Error:", error);
    throw new Error(`API request failed: ${error.message}`);
  }
};