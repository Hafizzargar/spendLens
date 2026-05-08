const { spawn } = require('child_process');

console.log('🚀 Starting SpendLens Servers...');

// Start Backend
const backend = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev'], {
  cwd: './backend',
  stdio: 'inherit'
});

// Start Frontend
const frontend = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev'], {
  cwd: './frontend',
  stdio: 'inherit'
});

process.on('SIGINT', () => {
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
  process.exit();
});
