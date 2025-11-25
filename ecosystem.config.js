// PM2 설정 파일
module.exports = {
  apps: [
    {
      name: 'backend-app',
      script: '/home/ec2-user/my-app/backend/dist/server.js',
      // Ensure the process runs with backend as cwd so require() resolves backend/node_modules
      cwd: '/home/ec2-user/my-app/backend',
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
      // Run via npm to avoid invoking the .bin wrapper directly (prevents shebang/exec issues)
      // This will run the `start:prod` script from frontend/package.json which calls `next start -H 0.0.0.0 -p 3000`.
      script: 'npm',
      args: ['run', 'start:prod'],
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
