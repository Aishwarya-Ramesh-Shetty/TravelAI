# ✈️ TravelAI

TravelAI is an AI-powered travel planning platform that transforms travel documents into personalized travel experiences. Simply upload your booking details, and TravelAI automatically extracts information, generates day-wise itineraries, fetches destination images, and visualizes attractions on an interactive map.

## 🚀 Features

### 🔐 Authentication

* Secure JWT-based authentication
* User registration and login
* Protected routes

### 📄 Smart Travel Document Processing

* Upload flight tickets, hotel bookings, and travel documents
* OCR-based text extraction
* Automatic travel information parsing using Gemini AI

### 🤖 AI-Powered Itinerary Generation

* Personalized day-wise itineraries
* Attraction recommendations
* Travel tips and suggestions
* Estimated activity costs
* Best time to visit recommendations

### 🖼️ Dynamic Destination Images

* Automatically fetches attraction images using Pexels API
* Visual itinerary experience
* High-quality travel destination photos

### 🗺️ Interactive Travel Map

* OpenStreetMap integration
* Location markers for attractions
* Interactive popups with attraction details
* Visual trip route exploration

### 📤 Sharing & Export

* Share itineraries via unique links
* Download itinerary as PDF
* Access trips from anywhere

### 🎨 Modern UI/UX

* Responsive design
* Beautiful travel-themed interface
* Interactive timeline view
* Destination-focused experience

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* React Query
* Tailwind CSS
* React Hook Form
* Axios
* React Leaflet

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* Multer

### AI & APIs

* Google Gemini AI
* OCR Processing
* Pexels API
* OpenStreetMap (Nominatim Geocoding)
* React Leaflet Maps

---

## ⚙️ Application Workflow

1. User uploads travel documents.
2. OCR extracts booking information.
3. Gemini AI processes and structures travel data.
4. AI generates a personalized itinerary.
5. Attraction images are fetched from Pexels.
6. Coordinates are fetched using OpenStreetMap.
7. Interactive map markers are generated.
8. User can explore, share, and download the itinerary.

---

## ✨ Key Highlights

* AI-generated personalized travel itineraries
* OCR-powered travel document processing
* Dynamic destination imagery
* Interactive travel maps
* End-to-end MERN stack implementation
* Real-world API integrations
* Shareable travel experiences

---

## 📂 Project Structure

```bash
TravelAI/
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   ├── context/
│   └── api/
│
├── backend/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── routes/
│   └── middleware/
│
└── README.md
```

## 🔑 Environment Variables

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PEXELS_API_KEY=your_pexels_api_key
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🏃 Running Locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔮 Future Enhancements

* AI Travel Assistant Chat
* Weather Forecast Integration
* Budget Planner
* AI Packing Checklist
* Hotel & Restaurant Recommendations
* Google Maps Navigation
* Multi-language Support

---

## 👩‍💻 Author

Aishwarya Shetty

Built using MERN Stack, Google Gemini AI, OCR, OpenStreetMap, React Leaflet, and Pexels API.
