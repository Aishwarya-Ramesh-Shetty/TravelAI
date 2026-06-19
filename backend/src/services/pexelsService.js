const axios = require("axios");

const getPlaceImage = async (placeName, destination) => {
  try {
    const response = await axios.get(
      "https://api.pexels.com/v1/search",
      {
        params: {
          query: `${placeName} ${destination} landmark tourism`,
          per_page: 1,
        },
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );

    console.log("Searching:", placeName);
    console.log("Photos found:", response.data.photos.length);

    if (response.data.photos.length > 0) {
      return response.data.photos[0].src.large2x;
    }

    return null;
  } catch (error) {
    console.error(
      "Pexels Error:",
      error.response?.data || error.message
    );

    return null;
  }
};

module.exports = { getPlaceImage };