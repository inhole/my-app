# 🌤️ 날씨 정보 웹 애플리케이션

Open-Meteo API를 사용한 실시간 날씨 정보 웹 애플리케이션입니다.

## 🌟 주요 기능

- 전 세계 도시의 실시간 날씨 정보 조회
- 7일 날씨 예보
- 온도, 습도, 풍속, 체감온도 등 상세 정보 제공
- 반응형 디자인 (모바일/태블릿/데스크톱 지원)
- 아름다운 UI/UX
- **API 키 불필요** - Open-Meteo 무료 API 사용
- 서버 측 캐싱으로 빠른 응답속도

## 🛠️ 기술 스택

### Frontend
- React 19.2.0
- CSS3 (Gradient, Flexbox, Grid)

### Backend
- Node.js
- Express.js 5.1.0
- node-fetch (API 호출)
- 인메모리 캐싱 (5분)

### API
- Open-Meteo API (무료, API 키 불필요)

## 🌍 지원 도시

**한국**: seoul, busan, incheon, daegu, daejeon, gwangju, ulsan, suwon, jeju

**해외**: tokyo, london, paris, new york

*더 많은 도시를 추가하려면 `server.js`의 `cityCoords` 객체를 수정하세요.*

## 📦 설치 방법

### 1. 의존성 설치

```bash
# 루트 디렉토리에서 서버 패키지 설치
npm install

# 클라이언트 패키지 설치
cd client
npm install
cd ..
```

### 2. 개발 모드 실행

```bash
# 서버와 클라이언트를 동시에 실행
npm run dev
```

- 클라이언트: http://localhost:3000
- 서버: http://localhost:5000

### 3. 프로덕션 빌드

```bash
npm run build
npm start
```

## 📁 프로젝트 구조

```
ino/
├── server.js              # Express 서버
├── package.json           # 서버 의존성
├── client/                # React 앱
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js         # 메인 컴포넌트
│   │   ├── App.css        # 스타일
│   │   └── index.js
│   └── package.json       # 클라이언트 의존성
└── README.md
```

## 🌐 API 엔드포인트

- `GET /api/weather/:city` - 특정 도시의 현재 날씨
- `GET /api/forecast/:city` - 특정 도시의 7일 예보

## 🚀 사용 방법

1. 웹 애플리케이션 접속
2. 검색창에 도시 이름 입력 (영문, 소문자)
   - 예: seoul, busan, tokyo, london, paris, new york
3. 검색 버튼 클릭
4. 현재 날씨와 7일 예보 확인

## 🔑 API 정보

이 프로젝트는 **Open-Meteo API**를 사용합니다.
- ✅ **API 키 불필요**
- ✅ **무료 무제한 사용** (비상업용)
- ✅ **빠른 응답속도**
- 📚 [Open-Meteo 문서](https://open-meteo.com/)

## 🚀 EC2 배포

AWS EC2에 배포하는 방법은 다음 문서를 참고하세요:

### 빠른 시작
📄 **[QUICKSTART.md](./QUICKSTART.md)** - 5분 안에 배포하기

### 상세 가이드
📄 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - 단계별 배포 가이드

### 주요 명령어
```bash
# PM2로 앱 시작
pm2 start ecosystem.config.js

# 배포 스크립트 실행
./deploy.sh

# 앱 상태 확인
pm2 status

# 로그 확인
pm2 logs weather-app
```

## 📦 배포 파일

- `ecosystem.config.js` - PM2 설정
- `deploy.sh` - 배포 자동화 스크립트
- `nginx.conf` - Nginx 설정 예제
- `.gitignore` - Git 제외 파일

## 🔧 환경 변수

필요한 경우 `.env` 파일을 생성하여 환경 변수를 설정할 수 있습니다:

```env
PORT=5000
NODE_ENV=production
```
실제 배포 시에는 다음 단계를 따라주세요:

1. [OpenWeatherMap](https://openweathermap.org/api)에서 무료 계정 생성
2. API 키 발급
3. `server.js` 파일의 `API_KEY` 변수를 본인의 키로 교체

```javascript
const API_KEY = 'YOUR_API_KEY_HERE';
```

## 📝 스크립트 설명

- `npm start` - 프로덕션 서버 실행
- `npm run server` - 개발 모드에서 서버만 실행 (nodemon)
- `npm run client` - 클라이언트만 실행
- `npm run dev` - 서버와 클라이언트 동시 실행
- `npm run build` - 프로덕션 빌드

## 🎨 기능 상세

### 현재 날씨 정보
- 도시명 및 국가
- 현재 온도 (°C)
- 날씨 아이콘 및 설명
- 체감 온도
- 습도
- 풍속
- 기압

### 5일 예보
- 날짜별 날씨 예보
- 예상 온도
- 날씨 아이콘 및 설명

## 🎯 특징

- **사용자 친화적 인터페이스**: 직관적이고 아름다운 디자인
- **실시간 데이터**: OpenWeatherMap API를 통한 실시간 날씨 정보
- **반응형 디자인**: 모든 디바이스에서 완벽하게 작동
- **에러 핸들링**: 사용자 친화적인 에러 메시지
- **로딩 상태**: 데이터 로딩 중 시각적 피드백

## 📱 지원 브라우저

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 💡 향후 개선 사항

- 위치 기반 자동 날씨 조회
- 즐겨찾기 도시 저장 기능
- 다국어 지원
- 시간대별 상세 예보
- 날씨 알림 기능

## 📄 라이선스

ISC

## 👨‍💻 개발자

이 프로젝트는 React와 Node.js를 학습하기 위한 교육용 프로젝트입니다.

---

Made with ❤️ using React, Node.js, and OpenWeatherMap API

