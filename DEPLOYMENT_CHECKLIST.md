# EC2 배포 체크리스트

## ✅ 배포 전 준비 (로컬)

- [ ] 코드가 정상 작동하는지 테스트
  ```bash
  npm run dev
  # http://localhost:3000 에서 테스트
  ```

- [ ] Git 저장소에 푸시 (Git 사용 시)
  ```bash
  git add .
  git commit -m "Ready for deployment"
  git push origin main
  ```

- [ ] 배포 파일 확인
  - [ ] `server.js`
  - [ ] `package.json`
  - [ ] `ecosystem.config.js`
  - [ ] `deploy.sh`
  - [ ] `nginx.conf`
  - [ ] `client/` 폴더

---

## ✅ AWS EC2 설정

- [ ] EC2 인스턴스 생성
  - [ ] Ubuntu Server 22.04 LTS 선택
  - [ ] t2.micro (프리티어) 선택
  - [ ] 키 페어 생성 및 다운로드 (.pem 파일 안전하게 보관)

- [ ] 보안 그룹 설정
  - [ ] SSH (22) - 내 IP만 허용
  - [ ] HTTP (80) - 0.0.0.0/0 (모든 IP)
  - [ ] HTTPS (443) - 0.0.0.0/0 (SSL 사용 시)
  - [ ] Custom TCP (5000) - 0.0.0.0/0 (테스트용, 나중에 제거 가능)

- [ ] Elastic IP 할당 (선택사항, 고정 IP가 필요한 경우)

- [ ] SSH 접속 테스트
  ```bash
  ssh -i "your-key.pem" ubuntu@your-ec2-public-ip
  ```

---

## ✅ 서버 환경 구축 (EC2에서 실행)

- [ ] 시스템 업데이트
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```

- [ ] Node.js 설치
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt install -y nodejs
  node --version  # 확인
  ```

- [ ] Git 설치
  ```bash
  sudo apt install -y git
  ```

- [ ] PM2 설치
  ```bash
  sudo npm install -g pm2
  pm2 --version  # 확인
  ```

- [ ] Nginx 설치
  ```bash
  sudo apt install -y nginx
  sudo systemctl status nginx  # 확인
  ```

- [ ] PM2 자동 시작 설정
  ```bash
  pm2 startup systemd
  # 출력된 명령어를 복사해서 실행
  ```

---

## ✅ 앱 배포

### Git 사용하는 경우

- [ ] 저장소 클론
  ```bash
  cd ~
  git clone https://github.com/your-username/your-repo.git weather-app
  cd weather-app
  ```

### 직접 업로드하는 경우

- [ ] 로컬에서 파일 업로드
  ```bash
  # 로컬 컴퓨터에서 실행
  scp -i "your-key.pem" -r "D:/개인/ino" ubuntu@your-ec2-ip:~/weather-app
  ```

### 공통 작업

- [ ] 서버 의존성 설치
  ```bash
  cd ~/weather-app
  npm install --production
  ```

- [ ] 클라이언트 빌드
  ```bash
  cd client
  npm install
  npm run build
  cd ..
  ```

- [ ] PM2로 앱 시작
  ```bash
  pm2 start ecosystem.config.js
  pm2 status  # 상태 확인
  pm2 logs weather-app  # 로그 확인
  ```

- [ ] PM2 설정 저장
  ```bash
  pm2 save
  ```

- [ ] 직접 포트로 접속 테스트
  ```
  http://your-ec2-public-ip:5000
  ```

---

## ✅ Nginx 설정

- [ ] Nginx 설정 파일 생성
  ```bash
  sudo nano /etc/nginx/sites-available/weather-app
  ```

- [ ] 설정 내용 입력
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
  (Ctrl+O, Enter, Ctrl+X로 저장)

- [ ] 설정 활성화
  ```bash
  sudo ln -s /etc/nginx/sites-available/weather-app /etc/nginx/sites-enabled/
  sudo rm /etc/nginx/sites-enabled/default
  ```

- [ ] Nginx 설정 테스트
  ```bash
  sudo nginx -t
  ```

- [ ] Nginx 재시작
  ```bash
  sudo systemctl restart nginx
  sudo systemctl status nginx
  ```

- [ ] 방화벽 설정
  ```bash
  sudo ufw allow ssh
  sudo ufw allow 'Nginx Full'
  sudo ufw --force enable
  sudo ufw status
  ```

- [ ] HTTP로 접속 테스트
  ```
  http://your-ec2-public-ip
  ```

---

## ✅ 최종 테스트

- [ ] 브라우저에서 앱 접속
  ```
  http://your-ec2-public-ip
  ```

- [ ] 날씨 검색 테스트
  - [ ] seoul 검색
  - [ ] tokyo 검색
  - [ ] london 검색

- [ ] PM2 모니터링
  ```bash
  pm2 monit
  ```

- [ ] 로그 확인
  ```bash
  pm2 logs weather-app
  ```

---

## ✅ 선택사항

### 도메인 연결

- [ ] 도메인 구매
- [ ] DNS A 레코드 설정: your-domain.com → EC2 IP
- [ ] Nginx 설정에서 server_name 수정
  ```bash
  sudo nano /etc/nginx/sites-available/weather-app
  # server_name your-domain.com;
  sudo nginx -t
  sudo systemctl restart nginx
  ```

### SSL 인증서 (HTTPS)

- [ ] Certbot 설치
  ```bash
  sudo apt install -y certbot python3-certbot-nginx
  ```

- [ ] SSL 인증서 발급
  ```bash
  sudo certbot --nginx -d your-domain.com -d www.your-domain.com
  ```

- [ ] 자동 갱신 테스트
  ```bash
  sudo certbot renew --dry-run
  ```

- [ ] HTTPS로 접속 테스트
  ```
  https://your-domain.com
  ```

### 보안 강화

- [ ] Fail2Ban 설치
  ```bash
  sudo apt install -y fail2ban
  sudo systemctl enable fail2ban
  sudo systemctl start fail2ban
  ```

- [ ] 불필요한 포트 닫기 (보안 그룹에서 5000 포트 제거)

---

## ✅ 모니터링 및 유지보수

- [ ] PM2 상태 정기 확인
  ```bash
  pm2 status
  ```

- [ ] 디스크 용량 확인
  ```bash
  df -h
  ```

- [ ] 시스템 업데이트
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```

- [ ] 로그 정리
  ```bash
  pm2 flush  # PM2 로그 삭제
  ```

---

## 🚨 문제 발생 시

### 앱이 시작되지 않음

```bash
pm2 logs weather-app --lines 100
cd ~/weather-app
npm install
pm2 restart weather-app
```

### Nginx 오류

```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
sudo systemctl restart nginx
```

### 포트 충돌

```bash
sudo lsof -i :5000
pm2 delete weather-app
pm2 start ecosystem.config.js
```

### 메모리 부족

```bash
free -h
# 스왑 추가 필요시 QUICKSTART.md 참고
```

---

## 📞 도움말

- 빠른 시작: `QUICKSTART.md`
- 상세 가이드: `DEPLOYMENT.md`
- README: `README.md`

---

## ✨ 배포 완료!

모든 체크리스트를 완료했다면 배포가 완료된 것입니다!

**접속 URL**: `http://your-ec2-public-ip`

축하합니다! 🎉

