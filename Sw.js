const C="insp-v3";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(["./","index.html","jspdf.min.js?v=2"].map(u=>c.add(new Request(u,{cache:"reload"})).catch(()=>{})))));self.skipWaiting()});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  e.respondWith(fetch(e.request).then(r=>{if(r.ok&&!u.search.includes("r=")){const k=r.clone();caches.open(C).then(c=>c.put(e.request,k))}return r})
    .catch(()=>caches.match(e.request).then(r=>r||caches.match(e.request,{ignoreSearch:true})).then(r=>r||caches.match("index.html"))));
});