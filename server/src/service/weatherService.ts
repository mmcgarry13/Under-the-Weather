import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object


interface Weather {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  date: string;
}

interface ForecastEntry {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
  dt_txt: string;
}


// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL = "https://api.openweathermap.org";
  private apiKey: string = process.env.API_KEY || "";
  private cityName: string = ""

  constructor(cityName: string) {
    this.cityName = cityName;
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<any> {
    const url = `${this.baseURL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("No Location Data Found 😭");
    return await response.json();
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates[]): Coordinates {
    if (!locationData.length) throw new Error("No Location Found 😭");
    return {
      lat: locationData[0].lat,
      lon: locationData[0].lon,
    };
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.cityName}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    return this.destructureLocationData(locationData);
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    const url = this.buildWeatherQuery(coordinates);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data 😭");
    return await response.json();
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const currentWeather = response.list[0];
    return {
      temperature: currentWeather.main.temp,
      description: currentWeather.weather[0].description,
      humidity: currentWeather.main.humidity,
      windSpeed: currentWeather.wind.speed,
      date: currentWeather.dt_txt,
    };
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(weatherData: ForecastEntry[]): Weather[] {
    return weatherData.map((entry) => ({
      temperature: entry.main.temp,
      description: entry.weather[0].description,
      humidity: entry.main.humidity,
      windSpeed: entry.wind.speed,
      date: entry.dt_txt,
    }));
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(): Promise<{ current: Weather; forecast: Weather[] }> {
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherResponse = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherResponse);
    const forecast = this.buildForecastArray(weatherResponse.list.slice(1, 6));
    return { current: currentWeather, forecast };
  }
}


export default WeatherService;
