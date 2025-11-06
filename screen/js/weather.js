// weather.js - fetches current weather from Open-Meteo (no API key)
// docs: https://open-meteo.com/
const weatherCodeToIcon = code => {
  // simplified mapping
  if (code === 0) return '☀️';
  if (code <= 3) return '⛅';
  if (code <= 48) return '🌫️';
  if (code <= 67) return '❄️';
  if (code <= 77) return '❄️';
  if (code <= 86) return '🌨️';
  if (code <= 99) return '⛈️';
  return '🌤️';
};

export async function startWeather({ targetTempId = 'weatherTemp', targetIconId = 'weatherIcon', latitude = 43.238949, longitude = 76.889709, timezone = 'Asia/Almaty' } = {}) {
  const tempEl = document.getElementById(targetTempId);
  const iconEl = document.getElementById(targetIconId);

  if (!tempEl || !iconEl) return;

  const endpoint = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=${encodeURIComponent(timezone)}`;

  async function fetchWeather() {
    try {
      const res = await fetch(endpoint, {cache: "no-cache"});
      if (!res.ok) throw new Error('weather fetch failed');
      const data = await res.json();
      if (!data.current_weather) throw new Error('no weather data');

      const { temperature, weathercode } = data.current_weather;
      tempEl.textContent = `${Math.round(temperature)}°C`;
      iconEl.textContent = weatherCodeToIcon(weathercode);
    } catch (err) {
      // fallback: show N/A and a static icon
      tempEl.textContent = `—°C`;
      iconEl.textContent = '⛅';
      console.warn('Weather update failed', err);
    }
  }

  // initial
  await fetchWeather();
  // refresh every 15 minutes
  setInterval(fetchWeather, 15 * 60 * 1000);
}
