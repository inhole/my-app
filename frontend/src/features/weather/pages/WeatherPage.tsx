'use client';

import React, { useState, FormEvent } from 'react';
import SearchForm from '@features/weather/components/SearchForm';
import WeatherCard from '@features/weather/components/WeatherCard';
import ForecastCard from '@features/weather/components/ForecastCard';
import { WeatherData, ForecastItem } from '@features/weather/types/weather';
import { searchWeather } from '@features/weather/services/weatherService';

const Home: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!city.trim()) {
      setError('도시 이름을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { weather: weatherData, forecast: forecastData } = await searchWeather(city);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError((err as Error).message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🌤️ 날씨 정보</h1>
          <p>전 세계 도시의 날씨를 확인하세요</p>
        </header>

        <SearchForm city={city} setCity={setCity} onSubmit={handleSearch} loading={loading} />

        {error && <div className="error">{error}</div>}

        {weather && <WeatherCard weather={weather} />}

        {forecast && forecast.length > 0 && <ForecastCard forecast={forecast} />}

        <footer className="footer">
          <p>🌐 Open-Meteo API를 사용한 날씨 앱</p>
          <p>React + Node.js + Express + TypeScript</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
