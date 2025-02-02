import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const historyService = new HistoryService();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({ error: "City name is required" });
    }

    const weatherService = new WeatherService(city);
    const weatherData = await weatherService.getWeatherForCity();

    res.status(200).json(weatherData);
    return;
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch weather data", details: error.message });
    return;
  }
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await historyService.getCities();
    res.status(200).json(history);
  } catch (error: any) {
    res.status(500).json({ error: "Failed to fetch search history", details: error.message });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "City ID is required!!!" });
    }

    await historyService.removeCity(id);
    res.status(200).json({ message: "City removed from search history" });
    return
  } catch (error: any) {
    res.status(500).json({ error: "Failed to delete city from history 😭", details: error.message });
    return
  }
});

export default router;
