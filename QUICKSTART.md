# EC2 배포 빠른 시작 가이드

## 🚀 5분 안에 배포하기

### 1. EC2 접속
```bash
ssh -i "your-key.pem" ubuntu@your-ec2-ip
```

### 2. 환경 설치 (처음 한 번만)
```bash
# 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# Node.js 20.x 설치
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git nginx

# PM2 설치
sudo npm install -g pm2

# PM2 자동 시작 설정
pm2 startup systemd
# 👆 출력된 명령어를 복사해서 실행하세요
```

### 3. 앱 배포

#### 방법 A: Git으로 배포 (추천)
```bash
# 저장소 클론
cd ~
git clone https://github.com/your-username/your-repo.git weather-app
cd weather-app

# 빌드 및 실행
npm install --production
cd client && npm install && npm run build && cd ..
pm2 start ecosystem.config.js
pm2 save
```

#### 방법 B: 직접 업로드
```bash
# 로컬에서 실행 (Windows Git Bash)
scp -i "your-key.pem" -r "D:/개인/ino" ubuntu@your-ec2-ip:~/weather-app

# EC2에서 실행
cd ~/weather-app
npm install --production
cd client && npm install && npm run build && cd ..
pm2 start ecosystem.config.js
pm2 save
```

### 4. Nginx 설정
```bash
# Nginx 설정 파일 생성
sudo nano /etc/nginx/sites-available/weather-app
```

**다음 내용 붙여넣기:**
```nginx
server {
    listen 80;
    server_name _;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Ctrl+O → Enter → Ctrl+X로 저장**

```bash
# 설정 활성화
sudo ln -s /etc/nginx/sites-available/weather-app /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# 방화벽 설정
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

### 5. 완료! 🎉
브라우저에서 접속:
```
http://your-ec2-public-ip
```

---

## 📋 자주 쓰는 명령어

```bash
# 앱 상태 확인
pm2 status

# 로그 확인
pm2 logs weather-app

# 앱 재시작
pm2 restart weather-app

# 코드 업데이트 (Git 사용 시)
cd ~/weather-app
git pull
./deploy.sh

# Nginx 재시작
sudo systemctl restart nginx
```

---

## ⚠️ 트러블슈팅

### 앱이 안 보여요
```bash
# 1. PM2 상태 확인
pm2 status

# 2. 로그 확인
pm2 logs weather-app --lines 50

# 3. 포트 확인
sudo lsof -i :5000

# 4. 재시작
pm2 restart weather-app
sudo systemctl restart nginx
```

### 업데이트가 안 돼요
```bash
cd ~/weather-app
git pull
cd client && npm run build && cd ..
pm2 restart weather-app
```

### 메모리 부족
```bash
# 스왑 메모리 추가
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 🔒 보안 체크리스트

- [ ] EC2 보안 그룹에서 불필요한 포트 닫기
- [ ] SSH 키 페어 안전하게 보관
- [ ] UFW 방화벽 활성화
- [ ] 정기적으로 `sudo apt update && sudo apt upgrade` 실행
- [ ] (선택) SSH 포트 22 → 다른 포트로 변경

---

## 📞 도움말

상세한 배포 가이드: `DEPLOYMENT.md` 참고

