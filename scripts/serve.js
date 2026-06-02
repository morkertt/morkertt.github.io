// Servidor estático mínimo p/ testar um build localmente. Uso: node serve.js <dir> <port>
const http = require('http');
const fs = require('fs');
const path = require('path');
const dir = process.argv[2];
const port = Number(process.argv[3] || 8099);
const MIME = { '.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon','.map':'application/json','.txt':'text/plain' };
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let f = path.join(dir, p);
  fs.readFile(f, (err,data)=>{
    if (err){ res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, ()=>console.log('serving', dir, 'at http://localhost:'+port));
