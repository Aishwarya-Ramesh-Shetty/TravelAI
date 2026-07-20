const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const cleanJSON = (text) => {
  return text.replace(/```json|```/gi, "").trim();
};

const generateWithRetry = async (prompt) => {
  const models = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
  ];

  let lastError;

  for (const modelName of models) {
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        responseMimeType: "application/json"
      }
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

  try {
    return JSON.parse(cleanJSON(responseText));
  } catch (err) {
    console.log("FAILED IN extractDataFromText");
    console.log(cleanJSON(responseText).slice(-1000));
    throw err;
  }
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

  try {
    return JSON.parse(cleanJSON(responseText));
  } catch (err) {
    console.log("FAILED IN generateItinerary");
    console.log(cleanJSON(responseText).slice(-1000));
    throw err;
  }
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

  // Extract only the places from the itinerary
  const places = [];

  itinerary.days.forEach(day => {
    day.activities.forEach(activity => {
      places.push({
        placeName: activity.placeName,
        city: activity.city,
        country: activity.country
      });
    });
  });

  const prompt = `
You are a travel expert.

Generate travel details for the following tourist attractions.

${JSON.stringify(places)}

Return ONLY valid JSON.

Schema:

[
  {
    "placeName": "",
    "details": {
      "description": "",
      "history": "",
      "entryFee": "",
      "openingHours": "",
      "highlights": [
        "",
        "",
        ""
      ],
      "travelTips": [
        "",
        "",
        ""
      ],
      "nearbyAttractions": [
        {
          "name": "",
          "description": ""
        },
        {
          "name": "",
          "description": ""
        }
      ]
    }
  }
]

Rules:

- Return ONLY valid JSON.
- No markdown.
- No explanations.
- Do NOT include any fields other than those in the schema.
- Description should be between 50 and 70 words.
- History should be between 30 and 50 words.
- Exactly 3 highlights.
- Exactly 3 travel tips.
- Exactly 6 nearby attractions.
- Entry fee should be realistic or "Free" or "Varies".
- Opening hours should be concise.
`;

  const responseText = await generateWithRetry(prompt);

  try {

    const detailsArray = JSON.parse(cleanJSON(responseText));

    const detailsMap = new Map();

    detailsArray.forEach(item => {
      detailsMap.set(item.placeName, item.details);
    });

    itinerary.days.forEach(day => {
      day.activities.forEach(activity => {
        const details = detailsMap.get(activity.placeName);

        if (details) {
          activity.details = details;
        }
      });
    });

    return itinerary;

  } catch (err) {

    console.log("FAILED IN enrichItinerary");

    const cleaned = cleanJSON(responseText);

    console.log("Length:", cleaned.length);

    console.log(cleaned.slice(-1000));

    throw err;
  }
};