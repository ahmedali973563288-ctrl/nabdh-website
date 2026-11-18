import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('.', import.meta.url));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.ts':'text/plain; charset=utf-8'};
const publicFiles=new Set(['/manus-routes.json','/sitemap.xml','/robots.txt','/og-nabdh.svg','/og-ai-2026.svg','/manifest.json','/icon.svg']);
const server=http.createServer(async(req,res)=>{let path=req.url?.split('?')[0]||'/';if(path==='/health') {res.writeHead(200,{'content-type':'text/plain'});return res.end('ok')}if(path==='/')path='/index.html';const base=publicFiles.has(path)?join(root,'public'):root;const file=normalize(join(base,path));if(!file.startsWith(base)){res.writeHead(403);return res.end('Forbidden')}try{const data=await readFile(file);res.writeHead(200,{'content-type':types[extname(file)]||'application/octet-stream'});res.end(data)}catch{res.writeHead(404);res.end('Not found')}});
server.listen(process.env.PORT||3000,'0.0.0.0',()=>console.log(`Nabdh listening on ${process.env.PORT||3000}`));
