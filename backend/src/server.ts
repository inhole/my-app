import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import bookRoutes from './routes/bookRoutes';
import weatherRoutes from './routes/weatherRoutes';

const execPromise = promisify(exec);

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);


// Middleware
app.use(cors());
app.use(express.json());

// 도서 관리 라우터
console.log('Book routes loaded');
app.use('/api/books', bookRoutes);

// 날씨 라우터
console.log('Weather routes loaded');
app.use('/api', weatherRoutes);

// React 빌드 파일 제공 (정적 파일만 서빙)
app.use(express.static(path.join(__dirname, 'client/build')));


app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
