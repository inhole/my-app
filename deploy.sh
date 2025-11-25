#!/bin/bash

# 날씨 앱 EC2 배포 스크립트

set -euo pipefail

echo "🚀 배포를 시작합니다..."

ROOT_DIR="/home/ec2-user/my-app"

# 1. 이동
cd "$ROOT_DIR"

# 2. Git pull
echo "📦 Git pull 최신 코드 가져오기..."
git pull origin main

# 3. 서버 의존성 설치 (backend)
echo "📦 서버 의존성 설치 (backend)..."
if [ -d "backend" ]; then
  cd backend
  if [ -f package-lock.json ]; then
    npm ci --production
  else
    npm install --production
  fi
  # Build TypeScript server if build script exists
  if npm run | grep -q "build"; then
    npm run build || true
  fi
  cd "$ROOT_DIR"
else
  echo "⚠️ backend 디렉터리가 없습니다: $ROOT_DIR/backend"
fi

# 4. 클라이언트 의존성 설치 및 빌드 (frontend)
echo "📦 클라이언트 의존성 설치 (frontend)..."
if [ -d "frontend" ]; then
  cd frontend
  if [ -f package-lock.json ]; then
    npm ci
  else
    npm install
  fi
  echo "🔨 클라이언트 빌드 (next build)..."
  npm run build || echo "⚠️ 빌드 실패 — 이미 빌드되어 있을 수 있습니다. 계속 진행합니다."
  cd "$ROOT_DIR"
else
  echo "⚠️ frontend 디렉터리가 없습니다: $ROOT_DIR/frontend"
fi

# 5. PM2로 앱 재시작 (ecosystem 사용)
echo "🔄 PM2로 앱 재시작..."
# 안전하게 기존 프로세스를 삭제하고 설정으로 다시 시작
pm2 delete backend-app || true
pm2 delete frontend-app || true
pm2 start ecosystem.config.js --env production

# 6. PM2 저장
pm2 save

echo "✅ 배포 완료!"
echo "📊 PM2 상태 확인:"
pm2 status

# 끝
