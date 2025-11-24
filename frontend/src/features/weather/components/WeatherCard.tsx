import React from 'react';
import { WeatherData } from '../types/weather';
import { getWeatherIcon } from '../services/weatherService';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="weather-card">
      <div className="weather-main">
        <h2>{weather.name}, {weather.sys.country}</h2>
        <div className="weather-icon-temp">
          <img
            src={getWeatherIcon(weather.weather[0].icon)}
            alt={weather.weather[0].description}
            className="weather-icon-large"
          />
          <div className="temperature">{Math.round(weather.main.temp)}°C</div>
        </div>
        <p className="weather-description">{weather.weather[0].description}</p>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">체감 온도</span>
          <span className="detail-value">{Math.round(weather.main.feels_like)}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">습도</span>
          <span className="detail-value">{weather.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">풍속</span>
          <span className="detail-value">{weather.wind.speed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">기압</span>
          <span className="detail-value">{weather.main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
