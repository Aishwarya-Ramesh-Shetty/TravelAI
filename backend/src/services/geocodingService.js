const axios = require("axios");

const getCoordinates = async (placeName) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: placeName,
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "TravelAI/1.0",
        },
      }
    );

    console.log("Searching:", placeName);
    console.log("Result:", response.data);

    if (response.data.length > 0) {
      return {
        lat: response.data[0].lat,
        lng: response.data[0].lon,
      };
    }

    return null;
  } catch (error) {
    console.error("Geocoding Error:", error.message);
    return null;
  }
};

module.exports = { getCoordinates };