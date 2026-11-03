const { spawn } = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const children = [];
let stopping = false;

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill();
  process.exitCode = code;
}

for (const [name, script, args] of [
  ['API', 'node_modules/json-server/lib/cli/bin.js', ['--watch', 'db.json', '--host', 'localhost', '--port', '3000']],
  ['Web', 'node_modules/@angular/cli/bin/ng.js', ['serve', '--host', 'localhost', '--port', '4200']]
]) {
  const child = spawn(process.execPath, [path.join(root, script), ...args], {
    cwd: root, stdio: ['ignore', 'inherit', 'inherit'], windowsHide: true
  });
  children.push(child);
  child.on('error', error => { console.error(`${name}: ${error.message}`); stop(1); });
  child.on('exit', code => { if (!stopping) { console.error(`${name} stopped (${code}).`); stop(code || 1); } });
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
