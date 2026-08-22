require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const cleanJSON = (text) => {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
};

exports.generateDestination = async (destination) => {
  const prompt = `
You are a professional travel destination expert.

Generate useful and realistic travel information for:

Destination: ${destination}

Return ONLY valid JSON.

Required schema:

{
  "destination": "",
  "country": "",
  "description": "",
  "bestTimeToVisit": "",
  "currency": "",
  "language": "",
  "travelTips": [
    "",
    "",
    "",
    "",
    ""
  ],
  "topAttractions": [
    {
      "name": "",
      "description": ""
    }
  ]
}

Rules:

- Return ONLY valid JSON.
- Do NOT include markdown.
- Do NOT include explanations outside the JSON.
- Use real tourist information.
- Do NOT invent attractions.
- Description should be informative and suitable for a travel website.
- Exactly 5 travel tips.
- Exactly 6 top attractions.
- Every attraction must contain a name and short description.
- Keep attraction names concise.
- Currency should contain the commonly used currency.
- Language should contain the commonly spoken language.
- bestTimeToVisit should give a useful travel period.
`;

  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

    temperature: 0.4,
  });

  const text = response.choices[0]?.message?.content;

  if (!text) {
    throw new Error("Groq returned an empty response");
  }

  return JSON.parse(cleanJSON(text));
};


