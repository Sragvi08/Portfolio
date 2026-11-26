import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { apps, escape } from '../dist/apps.js';
import { projects, labs } from '../dist/content.js';
import { articles } from '../dist/articles.js';

const dist=new URL('../dist/',import.meta.url);
const template=await readFile(new URL('index.html',dist),'utf8');
const routes=[...Object.values(apps).filter(app=>app[3]).map(([,title,,path])=>[path,title])];
for (const [path,items] of [['/projects',projects],['/labs',labs],['/blog',articles]]) {
  for (const {id,title} of items) routes.push([`${path}/${id}`,title]);
}

function page(title) {
  return template.replace('<title>Sragvi’s Vault</title>',`<title>${escape(title)} · Sragvi’s Vault</title>`);
}

for (const [route,title] of routes) {
  const target=new URL(`.${route}/`,dist);
  await mkdir(target,{recursive:true});
  await writeFile(new URL('index.html',target),page(title));
}

await writeFile(new URL('404.html',dist),page('Lost in space'));
