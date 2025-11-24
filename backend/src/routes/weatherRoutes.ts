import express, { Router } from 'express';
import { getWeather, getForecast } from '../controllers/weatherController';

const router: Router = express.Router();

router.get('/weather/:city', getWeather);
router.get('/forecast/:city', getForecast);

export default router;
