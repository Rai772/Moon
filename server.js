const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3001;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.mp3':  'audio/mpeg',
  '.ogg':  'audio/ogg',
  '.wav':  'audio/wav',
};

const server = http.createServer((req, res) => {
  const ext      = path.extname(req.url) || '.html';
  const fileName = ext === '.html' ? 'index.html' : path.basename(req.url);
  const filePath = path.join(__dirname, fileName);

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Novel Player: http://localhost:${PORT}`);
});
