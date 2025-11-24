import React from 'react';
import { ForecastItem } from '../types/weather';
import { getWeatherIcon, formatDate } from '../services/weatherService';

interface ForecastCardProps {
  forecast: ForecastItem[];
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
  return (
    <div className="forecast-section">
      <h3>5일 예보</h3>
      <div className="forecast-grid">
        {forecast.map((item, index) => (
          <div key={index} className="forecast-card">
            <p className="forecast-date">{formatDate(item.dt)}</p>
            <img
              src={getWeatherIcon(item.weather[0].icon)}
              alt={item.weather[0].description}
              className="weather-icon-small"
            />
            <p className="forecast-temp">{Math.round(item.main.temp)}°C</p>
            <p className="forecast-desc">{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
