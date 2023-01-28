const API_ENDPOINT = `https://api.pirateweather.net/forecast`

const PIRATE_WEATHER_API_KEY = process.env.PIRATE_WEATHER_API_KEY
const WEATHER_COORDINATES = process.env.WEATHER_COORDINATES

export const getWeather = async () => {
	return fetch(`${API_ENDPOINT}/${PIRATE_WEATHER_API_KEY}/${WEATHER_COORDINATES}`)
}
