# ✈️ TravelAI

An AI-powered travel planning platform that automatically extracts travel details from booking documents and generates personalized day-wise travel itineraries.

## 🚀 Features

* 🔐 Secure User Authentication (JWT)
* 📄 Upload Travel Documents (Flight Tickets, Hotel Bookings, etc.)
* 🔍 OCR-Based Information Extraction
* 🤖 AI-Powered Itinerary Generation using Google Gemini
* 🗺️ Day-Wise Personalized Travel Plans
* 📍 Destination Recommendations
* 🖼️ Dynamic Place Images using Pexels API
* 📤 Shareable Trip Links
* 📄 PDF Itinerary Download
* 📱 Responsive Modern UI

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* React Query
* Tailwind CSS
* Axios
* React Hook Form

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

---

## 📸 Application Workflow

1. User uploads travel booking documents.
2. OCR extracts travel information.
3. Gemini AI identifies:

   * Flights
   * Hotels
   * Transportation
   * Destination Details
4. AI generates a personalized itinerary.
5. Pexels API fetches relevant destination images.
6. User can:

   * View itinerary
   * Share trip
   * Download PDF

---

## ✨ Key Highlights

* Automated travel planning using Generative AI
* Intelligent document processing
* Dynamic destination recommendations
* Beautiful travel-focused UI
* End-to-end full-stack implementation

---

## 📂 Project Structure

```bash
TravelAI/
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── api/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── services/
│
└── README.md
```

## ⚙️ Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
PEXELS_API_KEY=your_pexels_api_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

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

## Future Enhancements

* Hotel Recommendations
* Budget Optimization
* Weather Integration
* Google Maps Integration
* Multi-language Support
* Real-Time Flight Tracking

---

## 👩‍💻 Author

Aishwarya Shetty

Built with ❤️ using MERN Stack, Google Gemini AI, OCR, and Pexels API.
