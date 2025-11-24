export interface CityCoords {
  lat: number;
  lon: number;
  name: string;
}

export interface CachedData {
  data: any;
  timestamp: number;
}

export interface WeatherData {
  cod: number;
  name: string;
  coord: { lat: number; lon: number };
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: { speed: number; deg: number };
}

export interface ForecastData {
  cod: string;
  city: {
    name: string;
    coord: { lat: number; lon: number };
  };
  list: Array<{
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: { speed: number };
    pop: number;
  }>;
}
