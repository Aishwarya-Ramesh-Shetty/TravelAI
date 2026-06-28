const axios = require("axios");

const { getCoordinates } = require("./geocodingService");

const getWeather = async (lat, lng) => {
  try {
    const response = await axios.get(
      "https://api.open-meteo.com/v1/forecast",
      {
        params: {
          latitude: lat,
          longitude: lng,

          current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "weather_code",
            "wind_speed_10m"
          ],

          daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min"
          ],

          forecast_days: 5,
          timezone: "auto"
        }
      }
    );

    return response.data;

  } catch (err) {
    console.log("Weather API Error:", err.response?.status);
    console.log(err.response?.data);

    throw err;
  }
};

module.exports = { getWeather };