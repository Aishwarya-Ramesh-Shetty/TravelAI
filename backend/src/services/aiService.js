const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const cleanJSON = (text) => {
  return text.replace(/```json|```/gi, "").trim();
};

exports.extractDataFromText = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});
  const prompt = `
    Extract travel booking info from this text: "${text}".
    Return ONLY valid JSON.
    Schema:
    {
      "destination": "",
      "startDate": "YYYY-MM-DD",
      "endDate": "YYYY-MM-DD",
      "flights": [{"airline": "", "flightNumber": "", "departureCity": "", "arrivalCity": "", "departureTime": "", "arrivalTime": ""}],
      "hotels": [{"hotelName": "", "checkIn": "", "checkOut": "", "address": ""}],
      "transportation": []
    }
  `;

  const result = await model.generateContent(prompt);
  return JSON.parse(cleanJSON(result.response.text()));
};

exports.generateItinerary = async (data) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const prompt = `
    Generate a travel itinerary for ${data.destination} from ${data.startDate} to ${data.endDate}.
    Context: ${JSON.stringify(data)}.
    Return ONLY valid JSON.
    Schema:
    {
      "tripSummary": "",
      "destination": "",
      "totalDays": 0,
      "days": [{ "day": 1, "title": "", "activities": [{ "time": "", "activity": "" }] }],
      "travelTips": []
    }
  `;

  const result = await model.generateContent(prompt);
  return JSON.parse(cleanJSON(result.response.text()));
};