/* 앱 껍데기(아이콘·화면)만 저장. 근무 데이터는 항상 새로 불러옴 */
var C='rl-shell-v5', FILES=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png','favicon.png','logo-full.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(FILES);}));self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C;}).map(function(x){return caches.delete(x);}));}));self.clients.claim();});
self.addEventListener('fetch',function(e){
  var u=new URL(e.request.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp);});return r;}).catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(r){return r||caches.match('./');});}));
});
