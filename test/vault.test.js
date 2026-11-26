import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { apps, renderApp } from '../dist/apps.js';
import { projects, labs, stars } from '../dist/content.js';
import { articles } from '../dist/articles.js';
import { defaults, localPhase, normalizePreferences, clampRect, readStore, saveStore } from '../dist/state.js';

test('four phases use exact local-time boundaries',()=>{
  assert.deepEqual([0,4,5,8,9,16,17,19,20,23].map(localPhase),
    ['moonlight','moonlight','dawn','dawn','daylight','daylight','twilight','twilight','moonlight','moonlight']);
});
test('stale preferences normalize and storage failures preserve usability',()=>{
  assert.deepEqual(normalizePreferences({phase:'unknown',dragon:false,motion:'no'}),{...defaults,dragon:false});
  const blocked={getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}};
  assert.equal(readStore(blocked,'test','fallback'),'fallback');
  assert.doesNotThrow(()=>saveStore(blocked,'test',[]));
});
test('window bounds hold when moved or resized beyond a smaller viewport',()=>{
  assert.deepEqual(clampRect({width:800,height:600},{x:-10,y:520,w:460,h:280}),{x:0,y:320,w:460,h:280});
  assert.deepEqual(clampRect({width:290,height:240},{x:4,y:16,w:520,h:390}),{x:0,y:0,w:290,h:240});
});
test('every app and nested detail has a runnable view and generated route',async()=>{
  const context={prefs:defaults,discoveries:new Set(stars.map(([name])=>name))};
  for (const [id,[,,,path]] of Object.entries(apps)) {
    assert.ok(renderApp(id,{history:[]},context).includes('<'));
    if (path) assert.ok((await readFile(new URL(`../dist${path}/index.html`,import.meta.url),'utf8')).includes('src="/vault.js"'));
  }
  for (const [id,items] of [['projects',projects],['notes',articles],['lab',labs]]) {
    for (const {id:detail,title} of items) {
      assert.ok(renderApp(id,{detail},context).includes(title));
      assert.ok((await readFile(new URL(`../dist${apps[id][3]}/${detail}/index.html`,import.meta.url),'utf8')).includes('src="/vault.js"'));
    }
  }
  assert.match(renderApp('stars',{},context),/Celestial Explorer/);
});
test('reward files are genuine PNGs at the two advertised sizes',async()=>{
  for (const [name,w,h] of [['celestial-wallpaper',1920,1080],['celestial-wallpaper-phone',1080,1920]]) {
    const file=await readFile(new URL(`../dist/assets/${name}.png`,import.meta.url));
    assert.deepEqual([...file.subarray(0,8)],[137,80,78,71,13,10,26,10]);
    assert.equal(file.readUInt32BE(16),w);
    assert.equal(file.readUInt32BE(20),h);
  }
});
