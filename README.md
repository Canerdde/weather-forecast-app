Weather Forecast App

A modern and user-friendly weather forecast application built with Next.js 14, TypeScript, and Tailwind CSS.

The application allows users to view real-time weather information and 5-day forecasts based on the city they search for.
This project was created to practice API integration and modern frontend development.

🚀 Features

🌡️ Real-Time Weather – Current temperature and weather conditions

📅 5-Day Forecast – Detailed daily weather predictions

🎨 Modern UI – Clean and responsive design

🌈 Dynamic Icons – Icons change according to weather conditions

⚡ High Performance – Optimized with Next.js

🛠️ Technologies Used

Next.js 14 – React framework

TypeScript – Type safety and better development experience

Tailwind CSS – Utility-first CSS framework

OpenWeatherMap API – Weather data provider

📦 Installation
1️⃣ Install dependencies
npm install

2️⃣ Start development server
npm run dev

3️⃣ Open in browser
http://localhost:3000

🔑 API Key Setup

This project uses the OpenWeatherMap API.

Steps:

Create a .env.local file in the root directory

Add the following line:

OPENWEATHER_API_KEY=your_api_key_here


Get your API key from:
👉 https://home.openweathermap.org/api_keys

⚠️ Do not push the .env.local file to GitHub.

🧭 Usage

Enter a city name

Click the Search button

View current weather and 5-day forecast

📁 Project Structure
├── app/
│   ├── api/
│   │   └── weather/
│   │       └── route.ts
│   ├── components/
│   │   ├── WeatherCard.tsx
│   │   └── ForecastCard.tsx
│   ├── types/
│   │   └── weather.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── tailwind.config.js
└── tsconfig.json

🎯 Project Purpose

This project was developed to:

Practice API integration

Improve frontend development skills

Work with TypeScript and Next.js

Build a clean and responsive UI

Create a portfolio-ready project

📄 License

This project is developed for educational and portfolio purposes only.
