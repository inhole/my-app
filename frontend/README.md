# Weather and Book Management App

이 프로젝트는 Next.js를 사용하여 구축된 날씨 정보 및 도서 관리 웹 애플리케이션입니다. React 19, TypeScript, 그리고 Next.js 15를 기반으로 합니다.

## 기능

- **날씨 정보**: Open-Meteo API를 사용하여 전 세계 도시의 현재 날씨와 7일 예보를 조회
- **도서 관리**: 도서 목록의 추가, 조회, 삭제 기능
- **반응형 디자인**: 모바일과 데스크톱에서 모두 최적화된 UI

## 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **Database**: (백엔드에서 사용되는 데이터베이스)
- **API**: Axios, Open-Meteo API
- **Styling**: CSS Modules, 글로벌 CSS

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

1. 저장소를 클론합니다:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. 종속성을 설치합니다:
   ```bash
   npm install
   ```

3. 개발 서버를 실행합니다:
   ```bash
   npm run dev
   ```

   브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 앱을 확인하세요.

## 사용 가능한 스크립트

프로젝트 디렉토리에서 다음 명령어를 실행할 수 있습니다:

### `npm run dev`

개발 모드로 앱을 실행합니다.\
브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

코드를 변경하면 페이지가 자동으로 리로드됩니다.\
콘솔에서 린트 오류를 확인할 수 있습니다.

### `npm run build`

프로덕션용으로 앱을 빌드합니다.\
빌드 결과는 `.next` 폴더에 저장됩니다.

빌드가 최소화되고 파일명에 해시가 포함됩니다.\
앱이 배포 준비가 완료됩니다!

### `npm run start`

프로덕션 빌드를 로컬에서 실행합니다.\
빌드 후에만 사용할 수 있습니다.

### `npm run lint`

ESLint를 실행하여 코드 품질을 검사합니다.

### `npm test`

테스트 러너를 대화형 감시 모드로 실행합니다.\
테스트에 대한 자세한 정보는 [Next.js 테스트 문서](https://nextjs.org/docs/testing)를 참조하세요.

## 프로젝트 구조

```
src/
├── app/                      # Next.js 앱 라우터
│   ├── layout.tsx            # 전체 레이아웃
│   ├── page.tsx              # 홈페이지 (대시보드)
│   ├── globals.css           # 글로벌 스타일
│   ├── weather/page.tsx      # 날씨 페이지
│   └── book/page.tsx         # 도서 관리 페이지
├── components/               # 재사용 가능한 컴포넌트
├── features/                 # 기능별 모듈
│   └── weather/              # 날씨 관련 컴포넌트와 서비스
├── lib/                      # 유틸리티 및 API 서비스
├── hooks/                    # 커스텀 React 훅
├── store/                    # 전역 상태 관리
├── types/                    # TypeScript 타입 정의
├── styles/                   # 추가 스타일 파일
└── assets/                   # 정적 자산
```

## 배포

이 앱은 Vercel, Netlify 등 다양한 플랫폼에 배포할 수 있습니다. 자세한 배포 방법은 [Next.js 배포 문서](https://nextjs.org/docs/deployment)를 참조하세요.

## 백엔드

이 프론트엔드 앱은 별도의 백엔드 API와 연동됩니다. 백엔드 코드는 `../backend/` 디렉토리에 있습니다.

## 기여

1. 이 저장소를 포크합니다.
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`).
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`).
4. 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`).
5. Pull Request를 생성합니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.
