export const preferencesKey = 'sragvis-vault.preferences.v1';
export const starsKey = 'sragvis-vault.constellation.v1';
export const defaults = Object.freeze({ phase:'auto', motion:true, trail:false, dragon:true });
export const phases = ['dawn','daylight','twilight','moonlight'];

export function readStore(storage,key,fallback) {
  try { return JSON.parse(storage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
export function saveStore(storage,key,value) {
  try { storage.setItem(key,JSON.stringify(value)); }
  catch { /* Private storage can be unavailable. Keep the current session usable. */ }
}
export function normalizePreferences(saved) {
  const prefs={...defaults};
  if (phases.includes(saved?.phase)) prefs.phase=saved.phase;
  for (const key of ['motion','trail','dragon']) {
    if (typeof saved?.[key]==='boolean') prefs[key]=saved[key];
  }
  return prefs;
}
export function localPhase(hour) {
  if (hour >= 5 && hour < 9) return 'dawn';
  if (hour >= 9 && hour < 17) return 'daylight';
  if (hour >= 17 && hour < 20) return 'twilight';
  return 'moonlight';
}
export function clampRect(bounds,box) {
  const w=Math.max(Math.min(320,bounds.width),Math.min(box.w,bounds.width));
  const h=Math.max(Math.min(255,bounds.height),Math.min(box.h,bounds.height));
  return {
    x:Math.max(0,Math.min(box.x,bounds.width-w)),
    y:Math.max(0,Math.min(box.y,bounds.height-h)),
    w,h,
  };
}
