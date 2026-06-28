const axios = require("axios");
const cache = require("./geocodeCache");

const getCoordinates = async (placeName) => {
  try {
    const key = placeName.toLowerCase();

    // Check cache first
    if (cache.has(key)) {
      console.log("Using cached coordinates:", placeName);
      return cache.get(key);
    }

    console.log("Searching:", placeName);

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

    console.log("Result:", response.data);

    if (response.data.length > 0) {
      const coords = {
        lat: response.data[0].lat,
        lng: response.data[0].lon,
      };

      // Save in cache
      cache.set(key, coords);

      return coords;
    }

    return null;
  } catch (error) {
    console.error("Geocoding Error:", error.message);
    return null;
  }
};

module.exports = { getCoordinates };