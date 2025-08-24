// Servicio del clima usando axios desde CDN
async function getWeatherByCity(city) {
    const API_KEY = 'a8b4f1c35c74fc29274531da837937ca';
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
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
// Principales ciudades de Bolivia
const bolivianCities = [
    'La Paz',
    'Santa Cruz',
    'Cochabamba'
];
// Cargar clima de ciudades bolivianas al inicio
async function loadBolivianCities() {
    const boliviaCitiesDiv = document.getElementById('boliviaCities');
    boliviaCitiesDiv.innerHTML = '<div class="loading">Cargando...</div>';
    try {
        const promises = bolivianCities.map((city)=>getWeatherByCity(city + ', Bolivia'));
        const results = await Promise.all(promises);
        boliviaCitiesDiv.innerHTML = results.map((data)=>`
      <div class="city-card">
        <h3>${data.name}</h3>
        <div class="temp">${Math.round(data.main.temp)}\xb0C</div>
        <div class="description">${data.weather[0].description}</div>
        <div class="details">
          <span>\u{1F4A7} ${data.main.humidity}%</span>
          <span>\u{1F32A}\u{FE0F} ${data.wind.speed} m/s</span>
        </div>
      </div>
    `).join('');
    } catch (error) {
        boliviaCitiesDiv.innerHTML = '<div class="error">Error al cargar ciudades de Bolivia</div>';
    }
}
// Búsqueda manual
document.getElementById('searchBtn').addEventListener('click', async ()=>{
    const city = document.getElementById('cityInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    if (!city) {
        resultDiv.innerHTML = '<div class="error">Por favor ingresa una ciudad.</div>';
        return;
    }
    resultDiv.innerHTML = '<div class="loading">Buscando...</div>';
    try {
        const data = await getWeatherByCity(city);
        resultDiv.innerHTML = `
      <div class="clima">
        <h2>${data.name}</h2>
        <div class="temp-large">${Math.round(data.main.temp)}\xb0C</div>
        <p><b>Clima:</b> ${data.weather[0].description}</p>
        <div class="weather-details">
          <div>\u{1F4A7} Humedad: ${data.main.humidity}%</div>
          <div>\u{1F32A}\u{FE0F} Viento: ${data.wind.speed} m/s</div>
          <div>\u{1F321}\u{FE0F} Sensaci\xf3n: ${Math.round(data.main.feels_like)}\xb0C</div>
        </div>
      </div>
    `;
    } catch (err) {
        if (err.response && err.response.status === 404) resultDiv.innerHTML = '<div class="error">Ciudad no encontrada.</div>';
        else resultDiv.innerHTML = '<div class="error">Ocurri\xf3 un error al consultar el clima.</div>';
    }
});
// Cargar ciudades bolivianas al cargar la página
document.addEventListener('DOMContentLoaded', loadBolivianCities);

//# sourceMappingURL=Actividad5.de158e3a.js.map
