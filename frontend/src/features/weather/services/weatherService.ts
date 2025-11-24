import { WeatherData, ForecastItem } from '../types/weather';

export const searchWeather = async (city: string): Promise<{ weather: WeatherData; forecast: ForecastItem[] }> => {
  // 현재 날씨 가져오기
  const weatherResponse = await fetch(`/api/weather/${city}`);
  const weatherData: WeatherData = await weatherResponse.json();

  if (!weatherResponse.ok) {
    throw new Error((weatherData as any).error || '날씨 정보를 가져올 수 없습니다.');
  }

  // 5일 예보 가져오기
  const forecastResponse = await fetch(`/api/forecast/${city}`);
  const forecastData: { list: ForecastItem[] } = await forecastResponse.json();

  if (!forecastResponse.ok) {
    throw new Error('예보 정보를 가져올 수 없습니다.');
  }

  // 하루에 하나씩만 선택 (정오 데이터)
  const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);

  return { weather: weatherData, forecast: dailyForecast };
};

export const getWeatherIcon = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', weekday: 'short' });
};
