#!/bin/bash

# 기존 서버 상태 체크 스크립트

echo "======================================"
echo "   EC2 서버 상태 체크"
echo "======================================"
echo ""

# 1. OS 정보
echo "📋 OS 정보:"
cat /etc/os-release | grep -E "^(NAME|VERSION)="
echo ""

# 2. 메모리 사용량
echo "💾 메모리 사용량:"
free -h
echo ""

# 3. 디스크 사용량
echo "💿 디스크 사용량:"
df -h | grep -E "^/dev|Filesystem"
echo ""

# 4. CPU 정보
echo "🖥️  CPU 정보:"
lscpu | grep -E "^(Model name|CPU\(s\)|Thread)"
echo ""

# 5. Docker 상태
echo "🐳 Docker 컨테이너:"
if command -v docker &> /dev/null; then
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    echo ""
    echo "Docker 리소스 사용량:"
    docker stats --no-stream
else
    echo "Docker가 설치되어 있지 않습니다."
fi
echo ""

# 6. Nginx 상태
echo "🌐 Nginx 상태:"
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx 실행 중"
    nginx -v
else
    echo "❌ Nginx 실행되지 않음"
fi
echo ""

# 7. 포트 사용 현황
echo "🔌 주요 포트 사용 현황:"
sudo netstat -tlnp | grep -E ":(80|443|5000|8080|3306)" || echo "netstat가 설치되지 않았습니다. sudo yum install -y net-tools"
echo ""

# 8. Node.js 설치 여부
echo "📦 Node.js 상태:"
if command -v node &> /dev/null; then
    echo "✅ Node.js 설치됨: $(node --version)"
    echo "   npm: $(npm --version)"
else
    echo "❌ Node.js가 설치되어 있지 않습니다."
fi
echo ""

# 9. PM2 설치 여부
echo "⚙️  PM2 상태:"
if command -v pm2 &> /dev/null; then
    echo "✅ PM2 설치됨: $(pm2 --version)"
    pm2 list
else
    echo "❌ PM2가 설치되어 있지 않습니다."
fi
echo ""

# 10. 스왑 메모리
echo "💫 스왑 메모리:"
swapon --show || echo "스왑 메모리가 설정되지 않았습니다."
echo ""

# 11. Nginx 설정 파일
echo "📄 Nginx 설정 파일:"
if [ -d "/etc/nginx/conf.d" ]; then
    ls -la /etc/nginx/conf.d/
elif [ -d "/etc/nginx/sites-available" ]; then
    ls -la /etc/nginx/sites-available/
else
    echo "Nginx 설정 디렉토리를 찾을 수 없습니다."
fi
echo ""

# 12. 시스템 부하
echo "📊 시스템 부하 (1분, 5분, 15분):"
uptime
echo ""

echo "======================================"
echo "   체크 완료!"
echo "======================================"
echo ""
echo "💡 다음 단계:"
echo "1. 메모리가 부족하면 스왑 메모리 추가"
echo "2. Node.js가 없으면 설치"
echo "3. 포트 80/443이 사용 중이면 서브도메인 설정 필요"
echo ""

