// start-next.js
// Lightweight launcher that tries to execute the local `next` binary, falling back to `npm run start:prod`.

const { spawn } = require('child_process');
const path = require('path');

function spawnNode(args, opts) {
  return spawn(process.execPath, args, opts);
}

function spawnNpm(args, opts) {
  const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  return spawn(cmd, args, opts);
}

(async () => {
  try {
    const cwd = path.resolve(__dirname);
    // Try to resolve the next binary path first
    try {
      const nextBin = require.resolve('next/dist/bin/next.js', { paths: [cwd] });
      const args = [nextBin, 'start', '-H', '0.0.0.0', '-p', process.env.PORT || '3000'];
      const proc = spawnNode(args, { stdio: 'inherit', cwd, env: process.env });

      proc.on('exit', (code, signal) => {
        if (signal) process.exit(1);
        process.exit(code);
      });

      proc.on('error', (err) => {
        console.error('Failed to exec next binary:', err);
        process.exit(1);
      });

      return;
    } catch (e) {
      console.warn('Local next binary not found, falling back to `npm run start:prod`');
    }

    // Fallback: let npm resolve and run the start script
    const npmProc = spawnNpm(['run', 'start:prod'], { stdio: 'inherit', cwd, env: process.env });
    npmProc.on('exit', (code, signal) => {
      if (signal) process.exit(1);
      process.exit(code);
    });
    npmProc.on('error', (err) => {
      console.error('Failed to start Next via npm:', err);
      process.exit(1);
    });
  } catch (err) {
    console.error('Launcher error:', err.message || err);
    process.exit(1);
  }
})();
