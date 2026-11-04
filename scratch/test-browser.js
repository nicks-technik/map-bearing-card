import http from 'http';
import fs from 'fs';
import path from 'path';
import { execSync, spawn } from 'child_process';

// 1. Create a minimal static file server
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(process.cwd(), reqPath.replace(/^\//, ''));

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    let contentType = 'text/plain';
    if (filePath.endsWith('.html')) contentType = 'text/html';
    else if (filePath.endsWith('.js') || filePath.endsWith('.ts')) contentType = 'application/javascript';
    else if (filePath.endsWith('.css')) contentType = 'text/css';
    else if (filePath.endsWith('.png')) contentType = 'image/png';
    else if (filePath.endsWith('.svg')) contentType = 'image/svg+xml';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(4455, async () => {
  console.log('Server running on http://localhost:4455');
  
  // Use edge with remote debugging to inspect console errors
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edgeProcess = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    'http://localhost:4455/index.html'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    // Connect to CDP
    const cdpRes = await fetch('http://localhost:9222/json');
    const tabs = await cdpRes.json();
    console.log('Tabs:', tabs.map(t => ({ title: t.title, url: t.url })));
  } catch (err) {
    console.error('CDP Error:', err.message);
  }

  edgeProcess.kill();
  server.close();
  process.exit(0);
});
