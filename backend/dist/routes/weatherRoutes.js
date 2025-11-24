"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weatherController_1 = require("../controllers/weatherController");
const router = express_1.default.Router();
router.get('/weather/:city', weatherController_1.getWeather);
router.get('/forecast/:city', weatherController_1.getForecast);
exports.default = router;
//# sourceMappingURL=weatherRoutes.js.map