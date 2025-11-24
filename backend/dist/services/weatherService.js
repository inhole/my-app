"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getForecast = exports.getWeather = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const weatherModel_1 = require("../models/weatherModel");
const execPromise = (0, util_1.promisify)(child_process_1.exec);
// WMO Weather Code를 설명으로 변환하는 함수
function getWeatherDescription(code) {
    const weatherCodes = {
        0: '맑음',
        1: '대체로 맑음',
        2: '부분적으로 흐림',
        3: '흐림',
        45: '안개',
        48: '짙은 안개',
        51: '가벼운 이슬비',
        53: '이슬비',
        55: '강한 이슬비',
        61: '약한 비',
        63: '비',
        65: '강한 비',
        71: '약한 눈',
        73: '눈',
        75: '강한 눈',
        77: '진눈깨비',
        80: '약한 소나기',
        81: '소나기',
        82: '강한 소나기',
        85: '약한 눈 소나기',
        86: '눈 소나기',
        95: '천둥번개',
        96: '우박을 동반한 천둥번개',
        99: '강한 우박을 동반한 천둥번개',
    };
    return weatherCodes[code] || '알 수 없음';
}
// WMO Weather Code를 OpenWeatherMap 아이콘 코드로 변환
function getWeatherIcon(code) {
    const iconMap = {
        0: '01d', // 맑음
        1: '02d', // 대체로 맑음
        2: '03d', // 부분적으로 흐림
        3: '04d', // 흐림
        45: '50d', // 안개
        48: '50d', // 짙은 안개
        51: '09d', // 가벼운 이슬비
        53: '09d', // 이슬비
        55: '09d', // 강한 이슬비
        61: '10d', // 약한 비
        63: '10d', // 비
        65: '10d', // 강한 비
        71: '13d', // 약한 눈
        73: '13d', // 눈
        75: '13d', // 강한 눈
        77: '13d', // 진눈깨비
        80: '09d', // 약한 소나기
        81: '09d', // 소나기
        82: '09d', // 강한 소나기
        85: '13d', // 약한 눈 소나기
        86: '13d', // 눈 소나기
        95: '11d', // 천둥번개
        96: '11d', // 우박을 동반한 천둥번개
        99: '11d', // 강한 우박을 동반한 천둥번개
    };
    return iconMap[code] || '01d';
}
// 도시명으로 국가 코드 반환
function getCountryCode(city) {
    const countryMap = {
        'seoul': 'KR',
        'busan': 'KR',
        'incheon': 'KR',
        'daegu': 'KR',
        'daejeon': 'KR',
        'gwangju': 'KR',
        'ulsan': 'KR',
        'suwon': 'KR',
        'jeju': 'KR',
        'tokyo': 'JP',
        'london': 'GB',
        'paris': 'FR',
        'new york': 'US',
    };
    return countryMap[city] || '';
}
const getWeather = async (city) => {
    const cacheKey = `weather_${city}`;
    // 캐시 확인
    const cachedData = (0, weatherModel_1.getCachedData)(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    // 도시 좌표 찾기
    const coords = weatherModel_1.cityCoords[city];
    if (!coords) {
        throw new Error('지원하지 않는 도시입니다. (seoul, busan, tokyo, london 등 사용 가능)');
    }
    // Open-Meteo API 호출 (API 키 불필요) - HTTP 사용, curl로 우회
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`;
    console.log('API 호출 중 (curl 사용)...');
    // curl을 사용하여 데이터 가져오기
    const { stdout } = await execPromise(`curl -s -m 10 "${url}"`);
    const data = JSON.parse(stdout);
    console.log('data: ', data);
    if (data && data.current) {
        // OpenWeatherMap 형식으로 변환
        const weatherData = {
            cod: 200,
            name: coords.name,
            coord: { lat: coords.lat, lon: coords.lon },
            sys: {
                country: getCountryCode(city)
            },
            main: {
                temp: data.current.temperature_2m,
                feels_like: data.current.apparent_temperature,
                humidity: data.current.relative_humidity_2m,
                pressure: 1013,
            },
            weather: [{
                    id: data.current.weather_code,
                    main: getWeatherDescription(data.current.weather_code),
                    description: getWeatherDescription(data.current.weather_code),
                    icon: getWeatherIcon(data.current.weather_code),
                }],
            wind: {
                speed: data.current.wind_speed_10m,
                deg: data.current.wind_direction_10m,
            },
        };
        (0, weatherModel_1.setCachedData)(cacheKey, weatherData);
        return weatherData;
    }
    else {
        throw new Error('날씨 데이터를 가져올 수 없습니다.');
    }
};
exports.getWeather = getWeather;
const getForecast = async (city) => {
    const cacheKey = `forecast_${city}`;
    // 캐시 확인
    const cachedData = (0, weatherModel_1.getCachedData)(cacheKey);
    if (cachedData) {
        return cachedData;
    }
    // 도시 좌표 찾기
    const coords = weatherModel_1.cityCoords[city];
    if (!coords) {
        throw new Error('지원하지 않는 도시입니다.');
    }
    // Open-Meteo API 호출 (7일 예보) - HTTP 사용, curl로 우회
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto&forecast_days=7`;
    console.log('예보 API 호출 중 (curl 사용)...');
    // curl을 사용하여 데이터 가져오기
    const { stdout } = await execPromise(`curl -s -m 10 "${url}"`);
    const data = JSON.parse(stdout);
    if (data && data.daily) {
        // OpenWeatherMap 형식으로 변환
        const forecastData = {
            cod: '200',
            city: {
                name: coords.name,
                coord: { lat: coords.lat, lon: coords.lon },
            },
            list: data.daily.time.map((time, index) => ({
                dt: new Date(time).getTime() / 1000,
                dt_txt: time,
                main: {
                    temp: (data.daily.temperature_2m_max[index] + data.daily.temperature_2m_min[index]) / 2,
                    temp_max: data.daily.temperature_2m_max[index],
                    temp_min: data.daily.temperature_2m_min[index],
                },
                weather: [{
                        id: data.daily.weather_code[index],
                        main: getWeatherDescription(data.daily.weather_code[index]),
                        description: getWeatherDescription(data.daily.weather_code[index]),
                        icon: getWeatherIcon(data.daily.weather_code[index]),
                    }],
                wind: {
                    speed: data.daily.wind_speed_10m_max[index],
                },
                pop: data.daily.precipitation_sum[index] > 0 ? 1 : 0,
            }))
        };
        (0, weatherModel_1.setCachedData)(cacheKey, forecastData);
        return forecastData;
    }
    else {
        throw new Error('예보 데이터를 가져올 수 없습니다.');
    }
};
exports.getForecast = getForecast;
//# sourceMappingURL=weatherService.js.map