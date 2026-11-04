import http from 'http';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/scratch/test-ha.html';
  const filePath = path.join(process.cwd(), reqPath.replace(/^\//, ''));

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    let contentType = 'text/plain';
    if (filePath.endsWith('.html')) contentType = 'text/html';
    else if (filePath.endsWith('.js')) contentType = 'application/javascript';
    else if (filePath.endsWith('.css')) contentType = 'text/css';
    else if (filePath.endsWith('.png')) contentType = 'image/png';
    else if (filePath.endsWith('.svg')) contentType = 'image/svg+xml';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not Found: ' + filePath);
  }
});

server.listen(4567, async () => {
  console.log('HTTP Server listening on 4567');
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const screenshotPath = path.join(process.cwd(), 'scratch', 'ha-screenshot.png');

  const args = [
    '--headless=new',
    '--disable-gpu',
    `--screenshot=${screenshotPath}`,
    '--window-size=1000,800',
    'http://localhost:4567/scratch/test-ha.html'
  ];

  const edge = spawn(edgePath, args);
  edge.on('exit', (code) => {
    console.log('Edge exited with code', code);
    if (fs.existsSync(screenshotPath)) {
      console.log('Screenshot created! Size:', fs.statSync(screenshotPath).size);
    } else {
      console.log('No screenshot file created.');
    }
    server.close();
  });
});
