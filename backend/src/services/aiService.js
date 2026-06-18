const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const cleanJSON = (text) => {
  return text.replace(/`json|`/gi, "").trim();
};

exports.extractDataFromText = async (text) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Extract travel booking information from the following text:

"${text}"

Return ONLY valid JSON.

Schema:
{
"destination": "",
"startDate": "YYYY-MM-DD",
"endDate": "YYYY-MM-DD",
"flights": [
{
"airline": "",
"flightNumber": "",
"departureCity": "",
"arrivalCity": "",
"departureTime": "",
"arrivalTime": ""
}
],
"hotels": [
{
"hotelName": "",
"checkIn": "",
"checkOut": "",
"address": ""
}
],
"transportation": []
}
`;

  const result = await model.generateContent(prompt);

  return JSON.parse(
    cleanJSON(result.response.text())
  );
};

exports.generateItinerary = async (data) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
Generate a detailed and realistic travel itinerary.

Destination: ${data.destination}
Start Date: ${data.startDate}
End Date: ${data.endDate}

Additional Context:
${JSON.stringify(data)}

Instructions:

* Return ONLY valid JSON.
* Do not include markdown.
* Do not include explanation text.
* Every activity MUST contain a placeName.
* Use real tourist attractions.
* Activities should be practical and chronological.
* Include estimated cost.
* Include best time to visit.
* Include useful travel tips.

Required Schema:

{
"tripSummary": "",
"destination": "",
"totalDays": 0,
"days": [
{
"day": 1,
"title": "",
"activities": [
{
"time": "",
"placeName": "",
"activity": "",
"estimatedCost": "",
"bestTimeToVisit": ""
}
]
}
],
"travelTips": []
}
`;

  const result = await model.generateContent(prompt);

  return JSON.parse(
    cleanJSON(result.response.text())
  );
};
