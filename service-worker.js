const CACHE_VERSION = "guadeloupe-2026-v21";
const DS_BASE = "./_ds/guadeloupe-2026-design-system-3f20c867-6b87-4e81-a24c-d1fdc59bdb9e";

// Everything the app needs to boot and render, fully self-hosted. If any of
// these fail to fetch, the SW install fails on purpose — a partial app shell
// is worse than none.
const PRECACHE_URLS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./data.js",
  "./lieuxData.js",
  "./head-components.js",
  "./app.js",
  "./AccueilScreen.js",
  "./VoyageScreen.js",
  "./AdressesScreen.js",
  "./PratiqueScreen.js",
  "./AllergieScreen.js",
  "./HebergementDetailScreen.js",
  "./IdeesPartageesScreen.js",
  "./firebase-bridge.js",
  "./vendor/react.production.min.js",
  "./vendor/react-dom.production.min.js",
  "./vendor/leaflet.js",
  "./vendor/leaflet.css",
  "./vendor/images/marker-icon.png",
  "./vendor/images/marker-icon-2x.png",
  "./vendor/images/marker-shadow.png",
  "./vendor/images/layers.png",
  "./vendor/images/layers-2x.png",
  `${DS_BASE}/tokens/colors.css`,
  `${DS_BASE}/tokens/typography.css`,
  `${DS_BASE}/tokens/spacing.css`,
  `${DS_BASE}/tokens/radius.css`,
  `${DS_BASE}/tokens/elevation.css`,
  `${DS_BASE}/tokens/fonts.css`,
  `${DS_BASE}/tokens/base.css`,
  `${DS_BASE}/styles.css`,
  `${DS_BASE}/_ds_bundle.js`,
  "./assets/photos/raisins-clairs.jpg",
  "./assets/photos/bungalow-corossol.jpg",
  "./assets/icons/app/icon-192.png",
  "./assets/icons/app/icon-512.png",
  "./assets/icons/anchor.svg",
  "./assets/icons/arrow-left.svg",
  "./assets/icons/baby.svg",
  "./assets/icons/battery-charging.svg",
  "./assets/icons/bed.svg",
  "./assets/icons/bell.svg",
  "./assets/icons/calendar.svg",
  "./assets/icons/car.svg",
  "./assets/icons/chevron-down.svg",
  "./assets/icons/chevron-right.svg",
  "./assets/icons/circle-check.svg",
  "./assets/icons/clock.svg",
  "./assets/icons/cloud.svg",
  "./assets/icons/cloud-rain.svg",
  "./assets/icons/compass.svg",
  "./assets/icons/copy.svg",
  "./assets/icons/external-link.svg",
  "./assets/icons/heart-pulse.svg",
  "./assets/icons/hospital.svg",
  "./assets/icons/house.svg",
  "./assets/icons/info.svg",
  "./assets/icons/key-round.svg",
  "./assets/icons/lightbulb.svg",
  "./assets/icons/luggage.svg",
  "./assets/icons/map-pin.svg",
  "./assets/icons/map.svg",
  "./assets/icons/menu.svg",
  "./assets/icons/navigation.svg",
  "./assets/icons/pencil.svg",
  "./assets/icons/phone.svg",
  "./assets/icons/pill.svg",
  "./assets/icons/plane.svg",
  "./assets/icons/plug.svg",
  "./assets/icons/receipt.svg",
  "./assets/icons/shield-alert.svg",
  "./assets/icons/sun.svg",
  "./assets/icons/thermometer.svg",
  "./assets/icons/trash.svg",
  "./assets/icons/triangle-alert.svg",
  "./assets/icons/umbrella.svg",
  "./assets/icons/users.svg",
  "./assets/icons/utensils.svg",
  "./assets/icons/wallet.svg",
  "./assets/icons/wifi.svg",
  "./assets/icons/x.svg",
];

// The only remaining third-party requests: the Google Fonts CSS (the actual
// font files it references get picked up by the generic fetch handler below
// as they're requested) and the hotlinked hero photo. Warmed opportunistically
// at install time, but a failure here (network hiccup, a host blocking
// hotlinking) must NOT block the SW install — everything else the app needs
// to run is local and already in PRECACHE_URLS above.
const BEST_EFFORT_URLS = [
  "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  "https://www.ags-demenagement.com/outre-mer/wp-content/uploads/sites/2/2023/03/ile-dom-tom-guadeloupe-1080x675.jpg",
  "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js",
  "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js",
  "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      await cache.addAll(PRECACHE_URLS);
      await Promise.all(
        BEST_EFFORT_URLS.map(async (url) => {
          try {
            const res = await fetch(url, { mode: "cors" });
            if (res && (res.ok || res.type === "opaque")) await cache.put(url, res);
          } catch (_) {
            // offline during install, or the host blocks CORS/hotlinking — non-fatal
          }
        })
      );
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.filter((n) => n !== CACHE_VERSION).map((n) => caches.delete(n)));
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // HTML navigations go network-first so a new deployment is picked up on the
  // very next visit — serving the cached shell here would pin users to a stale
  // (possibly broken) version forever. The cache is only the offline fallback.
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_VERSION);
        try {
          const res = await fetch(req);
          if (res && res.ok) cache.put("./index.html", res.clone());
          return res;
        } catch (err) {
          const fallback = await cache.match("./index.html");
          if (fallback) return fallback;
          throw err;
        }
      })()
    );
    return;
  }

  // Static assets: cache-first. Safe because every deployment bumps
  // CACHE_VERSION, which re-fetches the whole precache list.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_VERSION);
      const cached = await cache.match(req, { ignoreVary: true });
      if (cached) return cached;

      const res = await fetch(req);
      if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
      return res;
    })()
  );
});
