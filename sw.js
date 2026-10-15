/* SECC-M: funciona sin señal. El HTML se pide primero a la red (así llegan las actualizaciones) y, si no hay internet, se usa la copia guardada. */
const V='secc-5',PRE=["./", "index.html", "manifest.json", "Icon-192.png", "Icon-512.png", "Icon-maskable-512.png", "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js", "https://cdn.jsdelivr.net/npm/leaflet.gridlayer.googlemutant@0.16.0/dist/Leaflet.GoogleMutant.js", "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js", "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css", "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow+Semi+Condensed:wght@400;500;600;700&display=swap"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(PRE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const put=(r,x)=>{if(x&&(x.ok||x.type=='opaque')){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;const u=new URL(r.url),same=u.origin==location.origin,cdn=/cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(u.host);
 if(same)e.respondWith(fetch(r).then(x=>put(r,x)).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))));
 else if(cdn)e.respondWith(caches.match(r).then(m=>m||fetch(r).then(x=>put(r,x))))});
