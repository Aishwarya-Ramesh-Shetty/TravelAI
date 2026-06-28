const { getWeather } = require("../services/weatherService");

exports.getWeather = async (req, res) => {
  try {

    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        message: "Latitude and longitude are required"
      });
    }

    const weather =
      await getWeather(lat, lng);

    res.json(weather);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};