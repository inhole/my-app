export interface WeatherData {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    icon: string;
    description: string;
  }>;
  wind: { speed: number };
}

export interface ForecastItem {
  dt: number;
  main: { temp: number };
  weather: Array<{ icon: string; description: string }>;
}
