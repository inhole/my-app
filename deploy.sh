#!/bin/bash

# 날씨 앱 EC2 배포 스크립트

echo "🚀 배포를 시작합니다..."

# 1. Git pull (저장소를 사용하는 경우)
echo "📦 최신 코드 가져오기..."
# git pull origin main

# 2. 서버 의존성 설치
echo "📦 서버 의존성 설치..."
npm install --production

# 3. 클라이언트 빌드
echo "🔨 React 앱 빌드..."
cd client
npm install
npm run build
cd ..

# 4. PM2로 앱 재시작
echo "🔄 앱 재시작..."
pm2 restart ecosystem.config.js --update-env

# 5. PM2 저장
pm2 save

echo "✅ 배포 완료!"
echo "📊 PM2 상태 확인:"
pm2 status

