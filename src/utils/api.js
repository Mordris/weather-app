import axios from "axios";

// Fetch weather data
export const fetchWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_hours&timezone=auto`
    );
    console.log(response.data); // Debugging: Log the API response
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

// Fetch coordinates from city name
export const fetchCoordinates = async (city) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        city
      )}&format=json&limit=1`
    );
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};
