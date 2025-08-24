import axios from 'axios';

const API_KEY = 'a8b4f1c35c74fc29274531da837937caimport { getWeatherByCity } from './services/weatherService.js';'; // Reemplaza con tu API key de OpenWeatherMap
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeatherByCity(city) {
  const response = await axios.get(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
      lang: 'es',
      units: 'metric'
    }
  });
  return response.data;
}
