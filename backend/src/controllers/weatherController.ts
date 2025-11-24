import { Request, Response } from 'express';
import * as weatherService from '../services/weatherService';

const getWeather = async (req: Request, res: Response) => {
  try {
    console.log('req.params.city: ', req.params.city);
    const city = req.params.city.toLowerCase();
    const weatherData = await weatherService.getWeather(city);
    res.json(weatherData);
  } catch (error) {
    const err = error as Error;
    console.error('=== Weather API Error ===');
    console.error('Error message:', err.message);
    console.error('Error code:', (err as any).code);
    console.error('Error response:', (err as any).response?.status, (err as any).response?.statusText);
    console.error('Error stack:', err.stack);
    res.status(500).json({
      error: '서버 오류가 발생했습니다.',
      detail: err.message,
      code: (err as any).code
    });
  }
};

const getForecast = async (req: Request, res: Response) => {
  try {
    const city = req.params.city.toLowerCase();
    const forecastData = await weatherService.getForecast(city);
    res.json(forecastData);
  } catch (error) {
    const err = error as Error;
    console.error('=== Forecast API Error ===');
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    res.status(500).json({ error: '서버 오류가 발생했습니다.', detail: err.message });
  }
};

export {
  getWeather,
  getForecast,
};
