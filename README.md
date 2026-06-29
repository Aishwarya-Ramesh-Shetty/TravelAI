✈️ TravelAI - AI Powered Smart Travel Planner

«An AI-powered full-stack travel planning platform that transforms travel bookings into personalized itineraries with OCR, AI-generated travel plans, attraction images, interactive maps, real-time weather forecasts, detailed destination guides, and travel insights.»

"React" (https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
"Node.js" (https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
"MongoDB" (https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
"Tailwind CSS" (https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
"Google Gemini" (https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=for-the-badge)
"JWT" (https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)

---

🌐 Live Demo

Frontend: https://travelai-omega.vercel.app

Backend: https://travelai-backend-5lao.onrender.com

---

📖 Overview

TravelAI is an AI-powered travel planning application that automatically extracts travel information from uploaded booking documents and generates complete day-wise travel itineraries.

Using OCR, Google Gemini AI, geocoding services, weather forecasting APIs, image search, and interactive maps, TravelAI provides travelers with a personalized travel companion that helps them plan and explore destinations more efficiently.

Instead of manually researching attractions, weather, maps, and local recommendations, users receive everything in one beautifully organized itinerary.

---

✨ Features

🔐 Authentication

- User Registration & Login
- JWT Authentication
- Protected Routes
- Secure Password Hashing

---

📄 OCR Document Processing

Upload:

- Flight Tickets
- Hotel Bookings
- Travel Confirmations
- PDF Documents
- Images

Automatically extract:

- Destination
- Travel Dates
- Flight Information
- Hotel Information
- Transportation Details

---

🤖 AI Itinerary Generation

Powered by Google Gemini AI.

Generates:

- Day-wise itinerary
- Tourist attractions
- Activities
- Estimated costs
- Best visiting time
- Travel tips

---

🖼 Smart Attraction Images

Automatically fetches beautiful destination images using the Pexels API.

Every attraction includes:

- High-quality photo
- Destination-specific search
- Automatic fallback image

---

🗺 Interactive Maps

Each attraction includes:

- OpenStreetMap integration
- Leaflet interactive maps
- Exact attraction location
- Google Maps navigation button

---

📍 Detailed Place Information

Every attraction has its own dedicated page containing:

- AI-generated description
- Historical background
- Interesting highlights
- Entry fee
- Opening hours
- Visitor tips
- Nearby attractions

---

🌦 Real-Time Weather

Weather information is generated using the attraction's precise coordinates.

Displays:

- Current temperature
- Feels like temperature
- Humidity
- Wind speed
- 5-day weather forecast

---

🌍 Accurate Geocoding

TravelAI improves location accuracy by combining:

- Attraction Name
- City
- Country

Example:

Trevi Fountain → Rome → Italy

instead of searching only "Trevi Fountain".

This significantly improves map accuracy.

---

🔗 Google Maps Integration

Each attraction includes a direct Google Maps link using:

Attraction + City + Country

ensuring accurate navigation.

---

📤 Shareable Trips

Generate unique share links for itineraries so they can easily be shared with others.

---

🏗 Tech Stack

Frontend

- React (Vite)
- React Router
- React Query
- Tailwind CSS
- Axios
- React Leaflet
- Lucide React

---

Backend

- Node.js
- Express.js
- REST APIs
- JWT Authentication
- Multer

---

Database

- MongoDB Atlas
- Mongoose

---

AI

- Google Gemini API

Used for:

- OCR data understanding
- Travel itinerary generation
- Attraction details
- Travel recommendations

---

APIs Used

- Google Gemini API
- OpenStreetMap Nominatim
- OpenStreetMap Tiles
- Open-Meteo Weather API
- Pexels Image API

---

📂 Project Structure

TravelAI/

├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── assets/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   └── server.js

---

🗄 Database Design

Collections:

- Users
- Trips

Each Trip stores:

- Destination
- Travel Dates
- Extracted Booking Data
- AI Generated Itinerary
- Place Images
- Coordinates
- City
- Country
- Weather Information
- Share Token

---

🔄 Application Workflow

1. User registers or logs in.
2. Uploads booking documents.
3. OCR extracts text.
4. Gemini AI extracts structured travel information.
5. Gemini generates a personalized itinerary.
6. Images are fetched using the Pexels API.
7. Geocoding retrieves precise coordinates for each attraction.
8. Interactive maps are generated.
9. Weather forecasts are retrieved using attraction coordinates.
10. Users can explore each attraction in detail and navigate using Google Maps.

---

🚀 Running Locally

Clone Repository

git clone <repository-url>

cd TravelAI

---

Backend

cd backend

npm install

npm run dev

---

Frontend

cd frontend

npm install

npm run dev

---

🔮 Future Enhancements

- AI Budget Planner
- Currency Converter
- Nearby Restaurants
- Public Transport Suggestions
- Hotel Recommendations
- Offline Itinerary Access
- Travel Expense Tracker
- Multi-language Support
- PDF Itinerary Export
- AI Chat Travel Assistant
- Live Flight Tracking
- Emergency Contact Information
- Local Events Recommendation
- Packing Checklist Generator

---

👩‍💻 Author

Aishwarya Shetty

If you found this project useful, consider giving it a ⭐ on GitHub!
