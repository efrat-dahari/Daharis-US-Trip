// Minimal service worker: needed so Chrome treats the site as an installable app.
// It deliberately does NOT cache anything, so updates you upload to GitHub always
// show up immediately. It only passes through same-origin GET requests and leaves
// Firebase (cross-origin) traffic completely untouched.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(fetch(req));
});
