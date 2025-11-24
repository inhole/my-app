"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const weatherRoutes_1 = __importDefault(require("./routes/weatherRoutes"));
const execPromise = (0, util_1.promisify)(child_process_1.exec);
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '5000', 10);
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 도서 관리 라우터
console.log('Book routes loaded');
app.use('/api/books', bookRoutes_1.default);
// 날씨 라우터
console.log('Weather routes loaded');
app.use('/api', weatherRoutes_1.default);
// React 빌드 파일 제공 (정적 파일만 서빙)
app.use(express_1.default.static(path_1.default.join(__dirname, 'client/build')));
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
//# sourceMappingURL=server.js.map