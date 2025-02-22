# Weather AI Agent

This is a simple Weather AI Agent that uses OpenAI's GPT-4 model to handle natural language queries and fetches real-time weather data using OpenWeatherMap's API.

## Features

- Ask about the current weather in any city.
- Simple chat interface.
- Real-time integration with OpenWeatherMap.

## Setup Instructions

1. Clone this repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd weather-ai-agent
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file in the root directory and add your API keys:
   ```sh
   OPENAI_API_KEY=your_openai_api_key
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   ```
5. Start the server:
   ```sh
   npm start
   ```
6. Open your browser and go to `http://localhost:3000` to use the Weather AI Agent.
