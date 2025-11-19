import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchWeather = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError('도시 이름을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 현재 날씨 가져오기
      const weatherResponse = await fetch(`/api/weather/${city}`);
      const weatherData = await weatherResponse.json();

      if (!weatherResponse.ok) {
        throw new Error(weatherData.error || '날씨 정보를 가져올 수 없습니다.');
      }

      setWeather(weatherData);

      // 5일 예보 가져오기
      const forecastResponse = await fetch(`/api/forecast/${city}`);
      const forecastData = await forecastResponse.json();

      if (forecastResponse.ok) {
        // 하루에 하나씩만 선택 (정오 데이터)
        const dailyForecast = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);
        setForecast(dailyForecast);
      }

    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric', weekday: 'short' });
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🌤️ 날씨 정보</h1>
          <p>전 세계 도시의 날씨를 확인하세요</p>
        </header>

        <form onSubmit={searchWeather} className="search-form">
          <input
            type="text"
            placeholder="도시 이름을 입력하세요 (seoul, busan, tokyo, london, paris, new york 등)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? '검색 중...' : '검색'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {weather && (
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
        )}

        {forecast && forecast.length > 0 && (
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
        )}

        <footer className="footer">
          <p>🌐 Open-Meteo API를 사용한 날씨 앱</p>
          <p>React + Node.js + Express</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

