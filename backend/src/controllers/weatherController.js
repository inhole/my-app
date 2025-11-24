"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getForecast = exports.getWeather = void 0;
const weatherService = __importStar(require("../services/weatherService"));
const getWeather = async (req, res) => {
    try {
        console.log('req.params.city: ', req.params.city);
        const city = req.params.city.toLowerCase();
        const weatherData = await weatherService.getWeather(city);
        res.json(weatherData);
    }
    catch (error) {
        const err = error;
        console.error('=== Weather API Error ===');
        console.error('Error message:', err.message);
        console.error('Error code:', err.code);
        console.error('Error response:', err.response?.status, err.response?.statusText);
        console.error('Error stack:', err.stack);
        res.status(500).json({
            error: '서버 오류가 발생했습니다.',
            detail: err.message,
            code: err.code
        });
    }
};
exports.getWeather = getWeather;
const getForecast = async (req, res) => {
    try {
        const city = req.params.city.toLowerCase();
        const forecastData = await weatherService.getForecast(city);
        res.json(forecastData);
    }
    catch (error) {
        const err = error;
        console.error('=== Forecast API Error ===');
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
        res.status(500).json({ error: '서버 오류가 발생했습니다.', detail: err.message });
    }
};
exports.getForecast = getForecast;
//# sourceMappingURL=weatherController.js.map