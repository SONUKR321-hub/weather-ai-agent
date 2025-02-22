const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.json());

// OpenAI and OpenWeatherMap API keys from .env file
const OPENAI_API_KEY = "itsk-proj-DlAdXm5W15_1zAcFBtktgTr4nO7I0OtGJ-Xh9CGU0i1QE1AgwuHhxEXSN7dhvQIy7uQoWk99sHT3BlbkFJBipgTf1q9xJJ9rOxnkJruWRXs459kLPSnoJ-tnEhnvzEmFnndZtkfzaWqKH_JLefSg_6ShV_IA";
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

// Route for handling chat requests
app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Use OpenAI API to analyze the user's query
        const openaiResponse = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [{ role: "user", content: userMessage }],
            },
            { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
        );

        const aiReply = openaiResponse.data.choices[0].message.content;

        // If the AI detects a city, fetch weather data from OpenWeatherMap
        const cityMatch = aiReply.match(/weather in (\w+)/i);
        if (cityMatch) {
            const cityName = cityMatch[1];
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`
            );

            const weatherData = weatherResponse.data;
            const weatherInfo = `The current temperature in ${cityName} is ${weatherData.main.temp}°C with ${weatherData.weather[0].description}.`;

            return res.json({ reply: `${aiReply}\n\n${weatherInfo}` });
        }

        res.json({ reply: aiReply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "Sorry, I couldn't process your request." });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
