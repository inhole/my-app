// PM2 설정 파일
module.exports = {
  apps: [
    {
      name: 'backend-app',
      script: './backend/dist/server.js',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    },
    {
      name: 'frontend-app',
      // Use npm to run the production start script in the frontend folder
      script: 'npm',
      args: 'run start:prod',
      cwd: './frontend',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '400M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
