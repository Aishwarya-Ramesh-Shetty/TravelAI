# ✈️ TravelAI - AI Powered Smart Travel Planner

> A full-stack AI-powered travel planning platform that transforms travel bookings into personalized itineraries using OCR, Google Gemini AI, interactive maps, live weather forecasts, attraction images, and intelligent destination guides.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=for-the-badge)
![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-Maps-7EBC6F?style=for-the-badge)
![Open-Meteo](https://img.shields.io/badge/OpenMeteo-Weather-0099FF?style=for-the-badge)
![Pexels](https://img.shields.io/badge/Pexels-Images-05A081?style=for-the-badge)

---

## 🌐 Live Demo

**Frontend**

https://travelai-omega.vercel.app

**Backend**

https://travelai-backend-5lao.onrender.com

---

# 📖 Overview

TravelAI is an intelligent travel planning platform that automatically converts travel booking documents into complete AI-generated travel itineraries.

Users simply upload flight tickets, hotel bookings, or travel confirmations. The application extracts booking details using OCR and Google Gemini AI, generates a personalized itinerary, enriches every destination with travel information, fetches attraction images, displays interactive maps, provides live weather forecasts, and stores everything for future access.

TravelAI eliminates the need to manually research destinations by combining Artificial Intelligence, geolocation, weather forecasting, and travel planning into one seamless platform.

---

# ✨ Features

## 🔐 Authentication

- Secure User Registration
- User Login
- JWT Authentication
- Password Hashing using bcryptjs
- Persistent Login Sessions
- Protected Routes

---

## 📄 AI Document Processing

Upload:

- Flight Tickets
- Hotel Bookings
- Travel Confirmations
- PDF Documents
- Images

Automatically Extract:

- Destination
- Travel Dates
- Flight Information
- Hotel Information
- Transportation Details

---

## 🤖 AI Travel Itinerary Generation

Powered by Google Gemini AI.

Automatically Generates:

- Day-wise itinerary
- Tourist attractions
- Activities
- Estimated costs
- Best visiting time
- Travel tips

---

## 🏛 AI Destination Guide

Every attraction includes:

- Detailed Description
- Historical Background
- Interesting Highlights
- Entry Fee
- Opening Hours
- Visitor Tips
- Nearby Attractions

---

## 🖼 Smart Attraction Images

Automatically fetches beautiful attraction images using the Pexels API.

Every activity includes:

- High-quality destination image
- Attraction-specific search
- Automatic fallback image

---

## 🗺 Interactive Maps

Each attraction provides:

- OpenStreetMap integration
- Interactive Leaflet Maps
- Exact attraction location
- Google Maps navigation

---

## 🌤 Live Weather Forecast

Weather is fetched using each attraction's precise coordinates.

Displays:

- Current Temperature
- Feels Like Temperature
- Humidity
- Wind Speed
- Weather Condition
- 5-Day Forecast

---

## 📍 Intelligent Geocoding

TravelAI improves map accuracy using:

- Attraction Name
- City
- Country

Example:

```
Trevi Fountain
Rome
Italy
```

instead of searching only:

```
Trevi Fountain
```

This significantly improves location accuracy.

---

## 🔗 Google Maps Integration

Every attraction includes a direct Google Maps navigation link generated using:

- Attraction
- City
- Country

---

## 📚 Trip Management

Users can:

- Save Trips
- View Previous Trips
- Explore Detailed Attractions
- Access Maps & Weather
- Share Trips using Unique Share Links

---

# 🏗️ Tech Stack

## Frontend

- React (Vite)
- Tailwind CSS
- React Router DOM
- React Query
- Axios
- React Leaflet
- Lucide React

---

## Backend

- Node.js
- Express.js
- REST APIs
- Multer
- Express Middleware

---

## Database

- MongoDB Atlas
- Mongoose ODM

---

## Authentication

- JWT
- bcryptjs

---

## Artificial Intelligence

- Google Gemini AI

Used for:

- Booking Information Extraction
- AI Travel Itinerary Generation
- Destination Guide Generation

---

## APIs Used

- Google Gemini API
- OpenStreetMap Nominatim
- OpenStreetMap Tiles
- Open-Meteo Weather API
- Pexels Image API

---

# 📂 Project Structure

```text
TravelAI/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   │
│   └── package.json
│
└── README.md
```

---

# 🗄 Database Design

## Users

Stores:

- Name
- Email
- Password

---

## Trips

Stores:

- Destination
- Start Date
- End Date
- Extracted Booking Data
- AI Generated Itinerary
- Activity Images
- Coordinates
- City
- Country
- Share Token

---

# 🔄 Application Workflow

1. User registers or logs in.
2. Uploads travel booking documents.
3. OCR extracts text from uploaded files.
4. Google Gemini extracts structured booking information.
5. AI generates a personalized day-wise itinerary.
6. Destination images are fetched using the Pexels API.
7. OpenStreetMap generates precise attraction coordinates.
8. Interactive maps are displayed for every attraction.
9. Live weather forecasts are fetched using attraction coordinates.
10. Users explore attractions and navigate using Google Maps.

---

# 🚀 Running Locally

## Clone Repository

```bash
git clone https://github.com/Aishwarya-Ramesh-Shetty/TravelAI.git

cd TravelAI
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

GEMINI_API_KEY=

PEXELS_API_KEY=

CLIENT_URL=http://localhost:5173
```

---

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

# 📸 Screenshots

- Home Page
- Login
- Dashboard
- AI Generated Itinerary
- Attraction Details
- Weather Forecast
- Interactive Maps
- Google Maps Navigation

*(Add screenshots after completion.)*

---

# 🔮 Future Enhancements

- 🤖 AI Budget Planner
- 🍽 Nearby Restaurant Recommendations
- 🏨 Hotel Recommendations
- 💱 Currency Converter
- 📦 Packing Checklist Generator
- 📅 Trip Calendar
- 📄 PDF Itinerary Export
- 🌐 Multi-language Support
- 📱 Progressive Web App (PWA)
- 💬 AI Travel Chat Assistant
- ✈ Flight Status Tracking
- 🎉 Local Events Recommendation

---

# 👩‍💻 Author

**Aishwarya Shetty**

BE Computer Science & Engineering (Data Science)

Full Stack MERN Developer | AI-Powered Web Applications

If you found this project useful, consider giving it a ⭐ on GitHub!
