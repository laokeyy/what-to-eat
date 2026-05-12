// Open-Meteo free weather API - no key required
export interface WeatherData {
  temperature: number      // Celsius
  weatherCode: number      // WMO code
  isRaining: boolean
  windSpeed: number
  condition: 'clear' | 'cloudy' | 'rain' | 'snow' | 'fog' | 'storm'
}

let cached: WeatherData | null = null
let cacheTime = 0
const CACHE_DURATION = 30 * 60 * 1000 // 30 min

function wmoToCondition(code: number): WeatherData['condition'] {
  if (code === 0) return 'clear'
  if (code <= 3) return 'cloudy'
  if (code <= 67) return 'rain'
  if (code <= 77) return 'snow'
  if (code <= 49 || code === 99) return 'fog'
  return 'storm'
}

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  if (cached && Date.now() - cacheTime < CACHE_DURATION) return cached

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,wind_speed_10m,rain&forecast_days=1`
    const res = await fetch(url)
    const data = await res.json()
    const current = data.current

    const weather: WeatherData = {
      temperature: current.temperature_2m,
      weatherCode: current.weather_code,
      isRaining: (current.rain || 0) > 0 || (current.weather_code >= 51 && current.weather_code <= 67),
      windSpeed: current.wind_speed_10m,
      condition: wmoToCondition(current.weather_code),
    }

    cached = weather
    cacheTime = Date.now()
    return weather
  } catch {
    // Fallback: return neutral weather
    return {
      temperature: 20,
      weatherCode: 0,
      isRaining: false,
      windSpeed: 5,
      condition: 'clear',
    }
  }
}

// Get user location via browser Geolocation API
export function getUserLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => reject(new Error('Location denied')),
      { enableHighAccuracy: false, timeout: 5000 }
    )
  })
}

// Default location: Beijing
const DEFAULT_LOCATION = { lat: 39.9042, lon: 116.4074 }

export async function getWeatherForUser(): Promise<WeatherData> {
  try {
    const loc = await getUserLocation()
    return await getWeather(loc.lat, loc.lon)
  } catch {
    return await getWeather(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon)
  }
}

// Weather suggestions for display
export function getWeatherTip(weather: WeatherData): string {
  if (weather.condition === 'rain' && weather.temperature < 10)
    return '🌧️ 又冷又下雨，来碗热汤暖暖身子吧'
  if (weather.condition === 'rain')
    return '🌧️ 下雨天，不想出门的话点个配送快的'
  if (weather.temperature > 35)
    return '🔥 太热了！冷面、凉皮、沙拉都是不错的选择'
  if (weather.temperature > 30)
    return '☀️ 天气有点热，来点清爽的'
  if (weather.temperature < 5)
    return '❄️ 今天好冷，火锅、砂锅、热汤面来一套'
  if (weather.temperature < 15)
    return '🍂 有点凉，吃点热乎的暖和一下'
  return '🌤️ 天气不错，吃啥都行'
}
