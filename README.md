# 🌤️ 날씨 및 도서 관리 웹 애플리케이션

Next.js와 Node.js를 사용하여 구축된 날씨 정보 조회 및 도서 관리 웹 애플리케이션입니다.

## 🌟 주요 기능

### 날씨 정보
- 전 세계 도시의 실시간 날씨 정보 조회
- 7일 날씨 예보
- 온도, 습도, 풍속, 체감온도 등 상세 정보 제공
- **API 키 불필요** - Open-Meteo 무료 API 사용
- 서버 측 캐싱으로 빠른 응답속도

### 도서 관리
- 도서 목록 조회, 추가, 삭제
- 제목, 저자, 출판일 관리
- 사용자 친화적 인터페이스

### 공통 기능
- 반응형 디자인 (모바일/태블릿/데스크톱 지원)
- 아름다운 UI/UX
- Next.js 앱 라우터 기반 파일 기반 라우팅

## 🛠️ 기술 스택

### Frontend
- Next.js 15.0.0 (React 19.2.0)
- TypeScript
- CSS3 (Gradient, Flexbox, Grid)

### Backend
- Node.js
- Express.js 5.1.0
- TypeScript
- Axios (API 호출)
- 인메모리 캐싱 (5분)

### API
- Open-Meteo API (날씨 정보, 무료, API 키 불필요)

## 🌍 지원 도시

**한국**: seoul, busan, incheon, daegu, daejeon, gwangju, ulsan, suwon, jeju

**해외**: tokyo, london, paris, new york

*더 많은 도시를 추가하려면 `backend/src/server.ts`의 `cityCoords` 객체를 수정하세요.*

## 📦 설치 방법

### 1. 의존성 설치

```bash
# 루트 디렉토리에서 백엔드 의존성 설치
npm install

# 프론트엔드 의존성 설치
cd frontend
npm install
cd ..
```

### 2. 개발 모드 실행

```bash
# 백엔드와 프론트엔드 동시에 실행 (포트 5000, 3000)
npm run dev
```

- 프론트엔드: http://localhost:3000
- 백엔드: http://localhost:5000

### 3. 개별 실행 (필요 시)

```bash
# 백엔드만 실행
npm run server

# 프론트엔드만 실행 (새 터미널에서)
cd frontend
npm run dev
cd ..
```

### 4. 프로덕션 빌드

```bash
# 백엔드 빌드
npm run build

# 프론트엔드 빌드
cd frontend
npm run build
cd ..
```

## 📁 프로젝트 구조

```
ino/
├── backend/               # Express 백엔드 서버
│   ├── src/
│   │   ├── server.ts      # 메인 서버 파일
│   │   ├── controllers/   # API 컨트롤러
│   │   ├── models/        # 데이터 모델
│   │   ├── routes/        # API 라우트
│   │   └── services/      # 비즈니스 로직
│   └── package.json       # 백엔드 의존성
├── frontend/              # Next.js 프론트엔드 앱
│   ├── src/
│   │   ├── app/           # Next.js 앱 라우터
│   │   │   ├── layout.tsx # 전체 레이아웃
│   │   │   ├── page.tsx   # 홈페이지 (대시보드)
│   │   │   ├── globals.css# 글로벌 스타일
│   │   │   ├── weather/   # 날씨 페이지
│   │   │   └── book/      # 도서 관리 페이지
│   │   ├── components/    # 재사용 컴포넌트
│   │   ├── features/      # 기능별 모듈
│   │   │   ├── weather/    # 날씨 관련 컴포넌트와 서비스
│   │   │   │   ├── components/       # SearchForm, WeatherCard, ForecastCard
│   │   │   │   ├── pages/            # WeatherPage.tsx
│   │   │   │   ├── services/         # weatherService.ts
│   │   │   │   └── types/            # weather.ts
│   │   │   └── book/       # 도서 관련 컴포넌트와 서비스
│   │   │       ├── components/       # BookForm, BookList, BookCard
│   │   │       ├── pages/            # BookPage.tsx
│   │   │       ├── services/         # bookService.ts
│   │   │       └── types/            # book.ts
│   │   ├── lib/           # 유틸리티 및 API 서비스
│   │   ├── hooks/         # 커스텀 훅
│   │   ├── store/         # 전역 상태
│   │   ├── types/         # TypeScript 타입
│   │   └── assets/        # 정적 자산
│   └── package.json       # 프론트엔드 의존성
├── ecosystem.config.js    # PM2 설정
├── deploy.sh              # 배포 스크립트
├── nginx.conf             # Nginx 설정 예제
├── DEPLOYMENT.md          # EC2 배포 가이드
└── README.md
```

## 🌐 API 엔드포인트

### 날씨 API
- `GET /api/weather/:city` - 특정 도시의 현재 날씨
- `GET /api/forecast/:city` - 특정 도시의 7일 예보

### 도서 API
- `GET /api/books` - 도서 목록 조회
- `POST /api/books` - 도서 추가
- `DELETE /api/books/:id` - 도서 삭제

## 🚀 사용 방법

1. 웹 애플리케이션 접속 (http://localhost:3000)
2. 대시보드에서 날씨 정보 또는 도서 관리 선택
3. 날씨 조회: 도시 이름 입력 후 검색
4. 도서 관리: 도서 정보 입력 후 추가/삭제

## 🔑 API 정보

이 프로젝트는 **Open-Meteo API**를 사용합니다.
- ✅ **API 키 불필요**
- ✅ **무료 무제한 사용** (비상업용)
- ✅ **빠른 응답속도**
- 📚 [Open-Meteo 문서](https://open-meteo.com/)

## 🚀 EC2 배포

AWS EC2에 배포하는 방법은 다음 문서를 참고하세요:

### 상세 가이드
📄 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - 단계별 배포 가이드

### 주요 명령어
```bash
# 백엔드 실행
pm2 start ecosystem.config.js

# 프론트엔드 실행
cd frontend
pm2 start "npm run start" --name "frontend-app"
cd ..

# 앱 상태 확인
pm2 status

# 로그 확인
pm2 logs my-app
pm2 logs frontend-app
```

## 📦 배포 파일

- `ecosystem.config.js` - PM2 백엔드 설정
- `deploy.sh` - 배포 자동화 스크립트
- `nginx.conf` - Nginx 설정 예제
- `.gitignore` - Git 제외 파일

## 🔧 환경 변수

필요한 경우 `.env` 파일을 생성하여 환경 변수를 설정할 수 있습니다:

```env
PORT=5000
NODE_ENV=production
```

## 📝 스크립트 설명

### 백엔드 (루트 디렉토리)
- `npm start` - 프로덕션 서버 실행
- `npm run dev` - 개발 모드에서 서버 실행 (nodemon)
- `npm run build` - TypeScript 컴파일

### 프론트엔드 (frontend/ 디렉토리)
- `npm run dev` - 개발 서버 실행
- `npm run build` - 프로덕션 빌드
- `npm run start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 실행

## 🎨 기능 상세

### 날씨 정보
- 도시명 및 국가
- 현재 온도 (°C)
- 날씨 아이콘 및 설명
- 체감 온도
- 습도
- 풍속
- 기압
- 7일 예보

### 도서 관리
- 도서 목록 조회
- 도서 추가 (제목, 저자, 출판일)
- 도서 삭제
- 입력 유효성 검사

## 🎯 특징

- **모던 아키텍처**: Next.js 앱 라우터 기반
- **타입 안전성**: TypeScript 사용
- **사용자 친화적 인터페이스**: 직관적이고 아름다운 디자인
- **실시간 데이터**: Open-Meteo API를 통한 실시간 날씨 정보
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
- 즐겨찾기 도시/도서 저장 기능
- 다국어 지원
- 시간대별 상세 예보
- 날씨 알림 기능
- 사용자 인증 및 개인 도서 목록

## 📄 라이선스

ISC

## 👨‍💻 개발자

이 프로젝트는 React, Next.js, Node.js를 학습하기 위한 교육용 프로젝트입니다.

---

Made with ❤️ using Next.js, React, Node.js, and Open-Meteo API
