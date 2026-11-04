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
    res.end('Not Found');
  }
});

server.listen(4570, async () => {
  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9225',
    '--disable-gpu',
    'http://localhost:4570/scratch/test-ha.html'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const listRes = await fetch('http://localhost:9225/json');
    const tabs = await listRes.json();
    const targetTab = tabs.find(t => t.url.includes('test-ha.html'));
    
    if (targetTab && targetTab.webSocketDebuggerUrl) {
      const ws = new WebSocket(targetTab.webSocketDebuggerUrl);

      ws.onopen = () => {
        let id = 1;
        const send = (method, params = {}) => {
          ws.send(JSON.stringify({ id: id++, method, params }));
        };

        send('Console.enable');
        send('Runtime.enable');

        setTimeout(() => {
          send('Runtime.evaluate', {
            expression: `
              (() => {
                const card = document.getElementById('card');
                try {
                  card._initMap();
                  return { success: true, hasMap: !!card._map };
                } catch (err) {
                  return { success: false, error: err.message, stack: err.stack };
                }
              })()
            `,
            returnByValue: true
          });
        }, 1000);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.result && msg.result.result) {
          console.log('Call _initMap Result:', JSON.stringify(msg.result.result.value, null, 2));
          edge.kill();
          server.close();
          process.exit(0);
        }
      };
    }
  } catch (err) {
    console.error('Error:', err);
    edge.kill();
    server.close();
    process.exit(1);
  }
});
