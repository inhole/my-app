// PM2 설정 파일
module.exports = {
  apps: [
    {
      name: 'backend-app',
      script: '/home/ec2-user/my-app/backend/dist/server.js',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'frontend-app',
      // Use local next binary to avoid npm wrapper issues
      script: '/home/ec2-user/my-app/frontend/node_modules/.bin/next',
      args: ['start', '-H', '0.0.0.0', '-p', '3000'],
      cwd: '/home/ec2-user/my-app/frontend',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '400M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
