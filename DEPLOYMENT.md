# 🌤️ 날씨 및 도서 관리 앱 EC2 배포 가이드

## 📋 목차
1. [EC2 인스턴스 설정](#1-ec2-인스턴스-설정)
2. [서버 환경 구축](#2-서버-환경-구축)
3. [앱 배포](#3-앱-배포)
4. [도메인 및 HTTPS 설정](#4-도메인-및-https-설정-선택사항)
5. [관리 및 모니터링](#5-관리-및-모니터링)

---

## 1. EC2 인스턴스 설정

### 1.1 EC2 인스턴스 생성
1. AWS Console → EC2 → "인스턴스 시작" 클릭
2. 설정:
   - **이름**: ino
   - **AMI**: Ubuntu Server 22.04 LTS
   - **인스턴스 타입**: t2.micro (프리티어)
   - **키 페어**: 새로 생성 또는 기존 키 선택 (다운로드 보관!)
   - **보안 그룹 설정**:
     - SSH (22) - 내 IP
     - HTTP (80) - 0.0.0.0/0
     - HTTPS (443) - 0.0.0.0/0
     - Custom TCP (3000) - 0.0.0.0/0 (Next.js 앱용)
     - Custom TCP (5000) - 0.0.0.0/0 (백엔드 API용)

### 1.2 Elastic IP 할당 (선택사항)
1. EC2 → 탄력적 IP → "탄력적 IP 주소 할당"
2. 생성된 IP를 인스턴스에 연결

### 1.3 SSH 접속
```bash
# Windows (Git Bash)
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip

# Mac/Linux
chmod 400 your-key.pem
ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
```

---

## 2. 서버 환경 구축

### 2.1 시스템 업데이트
```bash
sudo apt update
sudo apt upgrade -y
```

### 2.2 Node.js 설치 (NVM 사용)
```bash
# NVM 설치 확인 (이미 설치됨 가정)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# NVM 로드
source ~/.bashrc

# Node.js 20.x 설치
nvm install 20
nvm use 20
nvm alias default 20

# 설치 확인
node --version  # v20.x 이상
npm --version
```

### 2.3 PM2 설치 (프로세스 관리자)
```bash
sudo npm install -g pm2

# 부팅 시 자동 시작 설정
pm2 startup systemd
# 출력된 명령어를 복사해서 실행
```

### 2.4 Git 설치
```bash
sudo apt install -y git
```

### 2.5 Nginx 설치 (리버스 프록시)
```bash
sudo apt install -y nginx
```

---

## 3. 앱 배포

### 3.1 코드 업로드

#### 방법 A: Git 사용 (추천)
```bash
# GitHub에 코드 푸시 후
cd /home/ec2-user
git clone https://github.com/your-username/your-repo.git my-app
cd my-app
```

#### 방법 B: SCP 사용 (로컬에서 업로드)
```bash
# 로컬 컴퓨터에서 실행
scp -i "your-key.pem" -r D:/개인/ino ubuntu@your-ec2-public-ip:/home/ubuntu/my-app
```

### 3.2 의존성 설치 및 빌드
```bash
cd /home/ubuntu/my-app

# 백엔드 의존성 설치
npm install --production

# 프론트엔드 의존성 설치 및 빌드
cd frontend
npm install
npm run build
cd ..
```

### 3.3 PM2로 앱 실행
```bash
# 백엔드 실행
pm2 start ecosystem.config.js

# 프론트엔드 실행 (Next.js)
cd frontend
pm2 start "npm run start" --name "frontend-app"
cd ..

# 상태 확인
pm2 status

# 로그 확인
pm2 logs backend-app
pm2 logs frontend-app

# PM2 설정 저장 (재부팅 시 자동 시작)
pm2 save
```

### 3.4 방화벽 설정
```bash
# UFW 활성화 및 설정
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## 4. Nginx 설정 (포트 80으로 서비스)

### 4.1 Nginx 설정 파일 생성
```bash
sudo nano /etc/nginx/sites-available/my-app
```

### 4.2 설정 내용 입력
```nginx
# 업스트림 설정
upstream backend_api {
    server localhost:5000;
}

upstream frontend_app {
    server localhost:3000;
}

server {
    listen 80;
    server_name your-ec2-public-ip-or-domain;

    # 프론트엔드 (Next.js)
    location / {
        proxy_pass http://frontend_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 백엔드 API
    location /api/ {
        proxy_pass http://backend_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 4.3 설정 활성화
```bash
# 심볼릭 링크 생성
sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/

# 기본 설정 제거 (선택사항)
sudo rm /etc/nginx/sites-enabled/default

# 설정 테스트
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
sudo systemctl status nginx
```

---

## 5. 도메인 및 HTTPS 설정 (선택사항)

### 5.1 도메인 연결
1. 도메인 구매 (AWS Route 53, Namecheap 등)
2. DNS A 레코드 추가: `your-domain.com` → EC2 Elastic IP

### 5.2 Let's Encrypt SSL 인증서
```bash
# Certbot 설치
sudo apt install -y certbot python3-certbot-nginx

# SSL 인증서 발급 및 자동 설정
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 자동 갱신 테스트
sudo certbot renew --dry-run
```

---

## 6. 관리 및 모니터링

### 6.1 PM2 명령어
```bash
# 앱 상태 확인
pm2 status

# 로그 실시간 확인
pm2 logs backend-app
pm2 logs frontend-app

# 앱 재시작
pm2 restart backend-app
pm2 restart frontend-app

# 앱 중지
pm2 stop backend-app
pm2 stop frontend-app

# 앱 삭제
pm2 delete backend-app
pm2 delete frontend-app

# 모니터링
pm2 monit
```

### 6.2 업데이트 배포
```bash
cd /home/ubuntu/my-app

# Git 사용 시
git pull origin main

# 백엔드 재시작
pm2 restart backend-app

# 프론트엔드 재빌드 및 재시작
cd frontend
npm run build
pm2 restart frontend-app
cd ..
```

### 6.3 로그 확인
```bash
# PM2 로그
pm2 logs backend-app
pm2 logs frontend-app

# Nginx 로그
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# 시스템 로그
sudo journalctl -u nginx
```

### 6.4 디스크 용량 확인
```bash
df -h
du -sh /home/ubuntu/my-app
```

---

## 7. 트러블슈팅

### 앱이 실행되지 않는 경우
```bash
# 포트 3000, 5000 사용 확인
sudo lsof -i :3000
sudo lsof -i :5000

# PM2 로그 확인
pm2 logs backend-app --lines 100
pm2 logs frontend-app --lines 100

# Node.js 버전 확인
node --version
```

### Nginx 연결 오류
```bash
# Nginx 상태 확인
sudo systemctl status nginx

# 설정 파일 문법 확인
sudo nginx -t

# Nginx 재시작
sudo systemctl restart nginx
```

### 메모리 부족
```bash
# 메모리 사용량 확인
free -h

# 스왑 메모리 추가
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 8. 보안 강화

### 8.1 SSH 포트 변경
```bash
sudo nano /etc/ssh/sshd_config
# Port 22 → Port 2222 로 변경
sudo systemctl restart sshd
```

### 8.2 Fail2Ban 설치 (무차별 대입 공격 방어)
```bash
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## 📝 체크리스트

- [ ] EC2 인스턴스 생성 및 보안 그룹 설정
- [ ] Elastic IP 할당 (선택)
- [ ] SSH 접속 확인
- [ ] Node.js 및 PM2 설치
- [ ] 코드 업로드 (Git 또는 SCP)
- [ ] 백엔드 및 프론트엔드 의존성 설치
- [ ] 프론트엔드 빌드
- [ ] PM2로 백엔드 및 프론트엔드 실행
- [ ] Nginx 설정 및 활성화
- [ ] 브라우저에서 접속 테스트
- [ ] 도메인 연결 (선택)
- [ ] SSL 인증서 설치 (선택)
- [ ] PM2 자동 시작 설정

---

## 🌐 접속 테스트

배포 완료 후:
- **HTTP**: `http://your-ec2-public-ip`
- **프론트엔드 직접**: `http://your-ec2-public-ip:3000`
- **백엔드 API 직접**: `http://your-ec2-public-ip:5000`
- **도메인**: `http://your-domain.com`
- **HTTPS**: `https://your-domain.com` (SSL 설정 시)

---

## 💡 팁

1. **환경 변수 관리**: `.env.local` 파일로 API 키 등 관리
2. **로그 로테이션**: PM2와 Nginx 로그가 쌓이므로 정기적으로 관리
3. **백업**: 정기적으로 코드와 설정 백업
4. **모니터링**: CloudWatch 또는 PM2 Plus 사용
5. **자동 배포**: GitHub Actions로 CI/CD 파이프라인 구축

---

## 📞 문제 발생 시

1. PM2 로그 확인: `pm2 logs backend-app` / `pm2 logs frontend-app`
2. Nginx 오류 로그: `sudo tail -f /var/log/nginx/error.log`
3. 포트 확인: `sudo netstat -tlnp | grep :3000` / `sudo netstat -tlnp | grep :5000`
4. 프로세스 확인: `pm2 status`
