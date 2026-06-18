import axios from "axios";

export const getPlaceImage = async (placeName) => {
  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/search`,
      {
        params: {
          query: placeName,
          per_page: 1
        },
        headers: {
          Authorization: process.env.PEXELS_API_KEY
        }
      }
    );

    if (response.data.photos.length > 0) {
      return response.data.photos[0].src.large;
    }

    return null;
  } catch (error) {
    console.error("Pexels Error:", error.message);
    return null;
  }
};