require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.testGroq = async () => {
  const response = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",

    messages: [
      {
        role: "user",
        content:
          "Give me one short sentence describing Paris, France.",
      },
    ],
  });

  return response.choices[0]?.message?.content;
};


// Temporary test
if (require.main === module) {
  exports
    .testGroq()
    .then((result) => {
      console.log("\nGROQ RESPONSE:");
      console.log(result);
    })
    .catch((error) => {
      console.error("\nGROQ ERROR:");
      console.error(error);
    });
}