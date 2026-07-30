// Coordonnées des hébergements — mêmes valeurs que stayMeta dans app.jsx.
// Dupliquées ici plutôt que partagées via window pour rester autonome (ces
// deux points ne changent pas).
const CARTE_HEBERGEMENTS = [{
  id: "raisins-clairs",
  name: "Raisins Clairs",
  sub: "8 – 13 août",
  lat: 16.24671,
  lng: -61.28691
}, {
  id: "bungalow-corossol",
  name: "Bungalow Corossol",
  sub: "13 – 18 août",
  lat: 16.275037,
  lng: -61.804011
}];

// Style visuel des marqueurs, cohérent avec le badge lagoon/tropical déjà
// utilisé pour catégorie/secteur ailleurs dans l'app, + coral pour les
// hébergements (même couleur que la carte "Hébergement" de l'Accueil).
// « idee » (jaune soleil) distingue les idées retenues des lieux déjà
// curatés — même icône que le bouton "Retenir" pour le lien visuel.
const MARKER_STYLES = {
  hebergement: {
    color: "var(--accent-coral)",
    icon: "house"
  },
  avoir: {
    color: "var(--accent-lagoon)",
    icon: "compass"
  },
  plages: {
    color: "var(--accent-tropical)",
    icon: "umbrella"
  },
  idee: {
    color: "var(--color-sun)",
    icon: "circle-check"
  }
};
const IDEA_CATEGORY_LABELS = {
  epiceries: "Épiceries",
  restos: "Restos",
  avoir: "À voir",
  plages: "Plages",
  evenement: "Événement"
};

// Dupliqué depuis IdeesPartageesScreen.jsx pour rester autonome (même
// logique de duplication que CARTE_HEBERGEMENTS ci-dessus). Extrait des
// coordonnées visibles dans un lien Google Maps complet, ou des coordonnées
// collées telles quelles.
function extractLatLngFromText(text) {
  if (!text) return null;
  let m = text.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
  if (m) return {
    lat: parseFloat(m[1]),
    lng: parseFloat(m[2])
  };
  m = text.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (m) return {
    lat: parseFloat(m[1]),
    lng: parseFloat(m[2])
  };
  m = text.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (m) return {
    lat: parseFloat(m[1]),
    lng: parseFloat(m[2])
  };
  m = text.trim().match(/^(-?\d{1,3}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)$/);
  if (m) return {
    lat: parseFloat(m[1]),
    lng: parseFloat(m[2])
  };
  return null;
}

// Coordonnées du lien de l'idée si présentes, sinon celles déjà résolues et
// mises en cache par le calcul de temps de route (voir useDriveMinutes dans
// IdeesPartageesScreen.jsx). Une idée sans les deux n'a simplement pas de
// position connue et n'apparaît pas sur la carte.
function ideaLatLng(idea) {
  const fromLink = extractLatLngFromText(idea.mapsUrl);
  if (fromLink) return fromLink;
  if (typeof idea.lat === "number" && typeof idea.lng === "number") return {
    lat: idea.lat,
    lng: idea.lng
  };
  return null;
}
function ideaHref(idea, pos) {
  if (idea.mapsUrl && /^https?:\/\//i.test(idea.mapsUrl)) return idea.mapsUrl;
  if (pos) return `https://www.google.com/maps?q=${pos.lat},${pos.lng}`;
  return window.mapsUrl(idea.name + " Guadeloupe");
}
function buildDivIcon(kind, size) {
  const s = MARKER_STYLES[kind];
  const px = size || 30;
  return window.L.divIcon({
    className: "",
    html: `<div style="width:${px}px;height:${px}px;border-radius:50%;background:${s.color};display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-card);border:2px solid #fff"><div style="width:${Math.round(px * 0.5)}px;height:${Math.round(px * 0.5)}px;background:#fff;-webkit-mask-image:url(assets/icons/${s.icon}.svg);mask-image:url(assets/icons/${s.icon}.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat"></div></div>`,
    iconSize: [px, px],
    iconAnchor: [px / 2, px / 2],
    popupAnchor: [0, -px / 2]
  });
}
function popupHtml(name, sub, href) {
  const subLine = sub ? `<div style="font:12px/1.4 var(--font-family-base);color:var(--text-secondary);margin-top:1px">${sub}</div>` : "";
  return `
    <div style="font-family:var(--font-family-base);min-width:160px">
      <div style="font:700 14px/1.3 var(--font-family-base);color:var(--text-primary)">${name}</div>
      ${subLine}
      <a href="${href}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;margin-top:8px;font:700 12px/1 var(--font-family-base);color:var(--accent-lagoon);text-decoration:none">Itinéraire →</a>
    </div>
  `;
}
function CarteInteractive() {
  const ref = React.useRef(null);
  const ideaLayerRef = React.useRef(null);
  const [fbReady, setFbReady] = React.useState(!!window.__fb);
  const [user, setUser] = React.useState(undefined);
  const [ideas, setIdeas] = React.useState([]);
  React.useEffect(() => {
    if (fbReady) return;
    const onFbReady = () => setFbReady(true);
    window.addEventListener("firebase-ready", onFbReady);
    return () => window.removeEventListener("firebase-ready", onFbReady);
  }, [fbReady]);
  React.useEffect(() => {
    if (!fbReady) return;
    return window.__fb.onAuthChange(u => setUser(u || null));
  }, [fbReady]);

  // Les idées retenues ne sont visibles qu'une fois connecté, comme sur
  // l'écran « Nos idées » — mêmes règles de sécurité Firestore. Sans
  // connexion, la carte reste fonctionnelle avec juste les hébergements et
  // les lieux déjà curatés.
  React.useEffect(() => {
    if (!fbReady || !user) return;
    return window.__fb.subscribeIdeas(list => setIdeas(list), () => {});
  }, [fbReady, user]);
  React.useEffect(() => {
    if (!ref.current || !window.L) return;
    const map = window.L.map(ref.current, {
      zoomControl: true,
      attributionControl: true
    }).setView([16.24, -61.55], 10);
    window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 18
    }).addTo(map);
    const allLatLngs = [];
    CARTE_HEBERGEMENTS.forEach(s => {
      window.L.marker([s.lat, s.lng], {
        icon: buildDivIcon("hebergement", 34)
      }).addTo(map).bindPopup(popupHtml(s.name, s.sub, window.mapsUrl(s.name + " Guadeloupe")));
      allLatLngs.push([s.lat, s.lng]);
    });
    (window.LIEUX_PLACES || []).forEach(p => {
      if (typeof p.lat !== "number" || typeof p.lng !== "number") return;
      if (p.category !== "avoir" && p.category !== "plages") return;
      window.L.marker([p.lat, p.lng], {
        icon: buildDivIcon(p.category, 28)
      }).addTo(map).bindPopup(popupHtml(p.name, null, window.mapsUrl(p.query)));
      allLatLngs.push([p.lat, p.lng]);
    });
    ideaLayerRef.current = window.L.layerGroup().addTo(map);
    if (allLatLngs.length > 1) {
      map.fitBounds(allLatLngs, {
        padding: [30, 30]
      });
    }
    setTimeout(() => map.invalidateSize(), 50);
    return () => map.remove();
  }, []);

  // Les épingles d'idées vivent dans leur propre calque, redessiné à chaque
  // mise à jour des données — sans recréer la carte (ça garderait sinon le
  // zoom/centre de la personne en train de la consulter).
  React.useEffect(() => {
    const layer = ideaLayerRef.current;
    if (!layer) return;
    layer.clearLayers();
    ideas.filter(idea => idea.status === "retenue").forEach(idea => {
      const pos = ideaLatLng(idea);
      if (!pos) return;
      window.L.marker([pos.lat, pos.lng], {
        icon: buildDivIcon("idee", 28)
      }).addTo(layer).bindPopup(popupHtml(idea.name, IDEA_CATEGORY_LABELS[idea.category] || null, ideaHref(idea, pos)));
    });
  }, [ideas]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "absolute",
      inset: 0
    }
  });
}
function LegendItem({
  kind,
  label
}) {
  const s = MARKER_STYLES[kind];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: s.color,
      flexShrink: 0,
      border: "2px solid #fff",
      boxShadow: "0 0 0 1px var(--border-default)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-caption)",
      fontSize: 12,
      color: "var(--text-secondary)"
    }
  }, label));
}
function CarteScreen({
  onBack
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "24px 16px 12px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      width: 40,
      height: 40,
      borderRadius: "var(--radius-button)",
      border: "1px solid var(--border-default)",
      background: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      background: "var(--text-primary)",
      WebkitMaskImage: "url(assets/icons/arrow-left.svg)",
      maskImage: "url(assets/icons/arrow-left.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, "Carte")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      padding: "0 16px 12px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(LegendItem, {
    kind: "hebergement",
    label: "Hébergement"
  }), /*#__PURE__*/React.createElement(LegendItem, {
    kind: "avoir",
    label: "À voir"
  }), /*#__PURE__*/React.createElement(LegendItem, {
    kind: "plages",
    label: "Plages"
  }), /*#__PURE__*/React.createElement(LegendItem, {
    kind: "idee",
    label: "Idée retenue"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(CarteInteractive, null)));
}
window.CarteScreen = CarteScreen;
