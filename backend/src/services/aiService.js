const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const cleanJSON = (text) => {
  return text.replace(/```json|```/gi, "").trim();
};

const generateWithRetry = async (prompt) => {
  const models = [
    "gemini-2.5-flash",
  ];

  let lastError;

  for (const modelName of models) {
    const model = genAI.getGenerativeModel({
      model: modelName,
    });

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const result = await model.generateContent(prompt);
        return result.response.text();
      } catch (error) {
        lastError = error;

        console.log(
          `${modelName} failed. Attempt ${attempt}`
        );

        if (
          attempt < 3 &&
          error.message.includes("503")
        ) {
          await new Promise((resolve) =>
            setTimeout(resolve, 3000)
          );
          continue;
        }

        break;
      }
    }
  }

  throw lastError;
};

exports.extractDataFromText = async (text) => {
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

  const responseText =
    await generateWithRetry(prompt);

  return JSON.parse(
    cleanJSON(responseText)
  );
};

exports.generateItinerary = async (data) => {
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


IMPORTANT:

For every activity:

- placeName should only contain the actual attraction name.
- city should contain the city where the attraction is located.
- country should contain the country.

Examples:

Trevi Fountain
city: Rome
country: Italy

Eiffel Tower
city: Paris
country: France

Sydney Opera House
city: Sydney
country: Australia

Do NOT combine multiple places into one placeName.

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
          "city": "",
          "country": "",
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

  const responseText =
    await generateWithRetry(prompt);

  return JSON.parse(
    cleanJSON(responseText)
  );
};

// exports.generatePlaceDetails = async (
//   placeName,
//   destination
// ) => {
//   const prompt = `
// Generate detailed travel information for:

// Place: ${placeName}
// Destination: ${destination}

// Return ONLY valid JSON.
// Rules:

// - Return ONLY valid JSON.
// - Do NOT use markdown.
// - Do NOT use **bold**, bullet points, or numbered lists.
// - Every field should contain detailed, natural language.
// - The "description" should be between 120 and 200 words.
// - The description should explain what the place is, why it is famous, its architecture or natural beauty, what visitors can experience there, and why it is worth visiting.
// - The history should be around 100-150 words.
// - Opening hours should be concise.
// - Entry fee should be realistic if known, otherwise "Varies".
// - Nearby attractions should contain both a name and a short description.

// Schema:
// {
//   "about": "",
//   "history": "",
//   "interestingFacts": [
//     ""
//   ],
//   "entryFee": "",
//   "openingHours": "",
//   "visitorTips": [
//     ""
//   ],
//   "nearbyAttractions": [
//     {
//       "name": "",
//       "description": ""
//     }
//   ]
// }
// `;

//   const responseText =
//     await generateWithRetry(prompt);

//   return JSON.parse(
//     cleanJSON(responseText)
//   );
// };


exports.enrichItinerary = async (itinerary) => {

  const prompt = `
You are a travel expert.

Below is a generated travel itinerary.

${JSON.stringify(itinerary)}

Your task:

For EVERY activity, enrich it with:

- description (120-180 words)
- history (80-120 words)
- highlights (3-5)
- entryFee
- openingHours
- travelTips (3-5)
- nearbyAttractions (3-5)

Rules:

- Keep every existing field unchanged.
- Do NOT remove any activities.
- Do NOT change timings.
- Return ONLY valid JSON.
- No markdown.
- No explanations.

Return the COMPLETE itinerary with these new fields added to every activity.
`;

  const responseText =
    await generateWithRetry(prompt);

  return JSON.parse(
    cleanJSON(responseText)
  );
};