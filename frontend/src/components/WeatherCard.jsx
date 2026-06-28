const weatherIcons = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌦️",
  53: "🌦️",
  55: "🌧️",
  61: "🌦️",
  63: "🌧️",
  65: "🌧️",
  71: "❄️",
  73: "❄️",
  75: "❄️",
  80: "🌦️",
  81: "🌧️",
  82: "🌧️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
};

export default function WeatherCard({ weather, title }) {
  if (!weather) return null;

  const current = weather.current;

  return (
    <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl shadow-xl text-white p-8 mb-10">

      <h2 className="text-2xl font-bold mb-6">
        🌤 {title}
      </h2>

      <div className="grid lg:grid-cols-4 gap-6">

        <div>
          <div className="text-6xl mb-2">
            {weatherIcons[current.weather_code] || "🌍"}
          </div>

          <div className="text-4xl font-bold">
            {current.temperature_2m}°C
          </div>

          <div className="opacity-80">
            Feels like {current.apparent_temperature}°C
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">
            💧 Humidity
          </h3>

          <p className="text-3xl">
            {current.relative_humidity_2m}%
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">
            💨 Wind
          </h3>

          <p className="text-3xl">
            {current.wind_speed_10m} km/h
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">
            📅 Forecast
          </h3>

          <div className="flex gap-3 mt-2">

            {weather.daily.time.map((day, index) => (

              <div
                key={day}
                className="text-center"
              >

                <div className="text-2xl">
                  {weatherIcons[
                    weather.daily.weather_code[index]
                  ]}
                </div>

                <div className="text-sm mt-1">
                  {weather.daily.temperature_2m_max[index]}°
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}