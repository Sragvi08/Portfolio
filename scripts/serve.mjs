import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'../dist');
const mime={ '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.webp':'image/webp','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.pdf':'application/pdf','.jpg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon' };
const { values }=parseArgs({options:{port:{type:'string'},host:{type:'string'},strictPort:{type:'boolean'}}});
const port=Number(values.port || process.env.PORT || 3000);
const host=values.host || '127.0.0.1';
createServer(async (request,response)=>{
  try {
    const pathname=decodeURIComponent(new URL(request.url,'http://localhost').pathname);
    const requested=resolve(root,'.'+pathname);
    if (!requested.startsWith(root+sep) && requested!==root) {response.writeHead(403).end();return;}
    const target=extname(requested)?requested:resolve(requested,'index.html');
    const body=await readFile(target);
    response.writeHead(200,{'Content-Type':mime[extname(target)] || 'application/octet-stream','X-Content-Type-Options':'nosniff'});
    response.end(request.method==='HEAD'?undefined:body);
  } catch {
    const fallback=await readFile(resolve(root,'404.html')).catch(()=>Buffer.from('Page unavailable'));
    response.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
    response.end(request.method==='HEAD'?undefined:fallback);
  }
}).listen(port,host,()=>console.log(`Vault preview on http://${host}:${port}`));
