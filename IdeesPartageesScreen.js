const KNOWN_NAMES = {
  "berthiaumebenoit@gmail.com": "Benoit",
  "jesscbrbz@gmail.com": "Jessica"
};
function displayName(email) {
  return KNOWN_NAMES[email] || (email ? email.split("@")[0] : "");
}

// Catégories propres aux idées — distinctes de window.LIEUX_CATEGORIES (page
// Lieux), pour ne pas ajouter une 5e case à sa grille 2x2. « Événement » sert
// aux trucs ponctuels (festival, marché nocturne) plutôt qu'aux lieux fixes.
const IDEA_CATEGORIES = [{
  key: "epiceries",
  label: "Épiceries",
  icon: "receipt"
}, {
  key: "restos",
  label: "Restos",
  icon: "utensils"
}, {
  key: "avoir",
  label: "À voir",
  icon: "compass"
}, {
  key: "plages",
  label: "Plages",
  icon: "umbrella"
}, {
  key: "evenement",
  label: "Événement",
  icon: "calendar"
}];

// Coordonnées des deux hébergements — mêmes valeurs que stayMeta dans
// app.jsx / CARTE_HEBERGEMENTS dans CarteScreen.jsx.
const HEBERGEMENTS = {
  sf: {
    lat: 16.24671,
    lng: -61.28691
  },
  de: {
    lat: 16.275037,
    lng: -61.804011
  }
};

// Calcule automatiquement, en arrière-plan, le temps de route entre
// l'hébergement du secteur de l'idée et l'idée elle-même — à partir de son
// seul nom, sans que personne ait à placer une épingle sur une carte.
// Géocodage (Nominatim) + calcul d'itinéraire (OSRM), tous deux gratuits et
// sans clé. Le résultat est mis en cache sur l'idée elle-même (idea.driveMinutes)
// pour ne recalculer qu'une seule fois. En cas d'échec (nom introuvable,
// hors ligne), on n'affiche simplement rien plutôt qu'un chiffre inventé.
// Incrémenté chaque fois que le calcul (requête de géocodage, filtrage, etc.)
// change de façon à invalider les valeurs déjà mises en cache sur d'anciennes
// idées — ex. un résultat de géocodage ambigu (mauvaise « Grande Anse »)
// calculé avec une version précédente doit être recalculé, pas réutilisé tel quel.
const DRIVE_TIME_VERSION = 2;
function useDriveMinutes(idea) {
  const cached = idea.driveMinutes != null && idea.driveMinutesV === DRIVE_TIME_VERSION;
  const [minutes, setMinutes] = React.useState(cached ? idea.driveMinutes : null);
  // Diagnostic temporaire : voir docs/notes de session — aucune donnée
  // n'apparaissait chez l'utilisateur alors que la logique était validée avec
  // des réponses simulées. On expose l'erreur réelle (CORS, statut HTTP,
  // réponse inattendue) pour savoir enfin ce qui bloque en conditions réelles.
  const [debugInfo, setDebugInfo] = React.useState(null);
  React.useEffect(() => {
    if (idea.driveMinutes != null && idea.driveMinutesV === DRIVE_TIME_VERSION) {
      setMinutes(idea.driveMinutes);
      return;
    }
    const origin = HEBERGEMENTS[idea.sector];
    if (!origin || !idea.name) return;
    let cancelled = false;
    (async () => {
      let step = "géocodage";
      try {
        // countrycodes=gp évite les faux amis hors Guadeloupe (ex. un lieu du
        // même nom en France métropolitaine, vers lequel OSRM ne peut tracer
        // aucune route). Le secteur (Deshaies / Saint-François) est ajouté au
        // texte de recherche pour départager les lieux homonymes qui existent
        // à plusieurs endroits de l'île (ex. deux plages « Grande Anse »).
        const sec = window.LIEUX_SECTORS && window.LIEUX_SECTORS.find(s => s.key === idea.sector);
        const searchText = sec ? `${idea.name}, ${sec.label}, Guadeloupe` : `${idea.name}, Guadeloupe`;
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=gp&q=${encodeURIComponent(searchText)}`);
        if (!geoRes.ok) {
          if (!cancelled) setDebugInfo(`${step} : HTTP ${geoRes.status}`);
          return;
        }
        const geoData = await geoRes.json();
        if (cancelled) return;
        if (!geoData || !geoData[0]) {
          setDebugInfo(`${step} : aucun résultat pour « ${idea.name} »`);
          return;
        }
        const destLat = parseFloat(geoData[0].lat);
        const destLng = parseFloat(geoData[0].lon);
        step = "itinéraire";
        const routeRes = await fetch(`https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destLng},${destLat}?overview=false`);
        if (!routeRes.ok) {
          if (!cancelled) setDebugInfo(`${step} : HTTP ${routeRes.status}`);
          return;
        }
        const routeData = await routeRes.json();
        if (cancelled) return;
        const seconds = routeData && routeData.routes && routeData.routes[0] && routeData.routes[0].duration;
        if (seconds == null) {
          setDebugInfo(`${step} : réponse inattendue — ${JSON.stringify(routeData).slice(0, 120)}`);
          return;
        }
        const mins = Math.max(1, Math.round(seconds / 60));
        setMinutes(mins);
        setDebugInfo(null);
        if (window.__fb) window.__fb.updateIdea(idea.id, {
          driveMinutes: mins,
          driveMinutesV: DRIVE_TIME_VERSION
        });
      } catch (err) {
        if (!cancelled) setDebugInfo(`${step} : ${err && err.message ? err.message : String(err)}`);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [idea.id, idea.name, idea.sector, idea.driveMinutes, idea.driveMinutesV]);
  return {
    minutes,
    debugInfo
  };
}
function DriveTimeBadge({
  minutes,
  debugInfo
}) {
  if (minutes == null) {
    if (!debugInfo) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--text-caption)",
        fontSize: 11,
        color: "var(--accent-emergency)",
        background: "var(--surface-emergency)",
        borderRadius: "var(--radius-input)",
        padding: "6px 10px",
        alignSelf: "flex-start"
      }
    }, "Temps de route indisponible — ", debugInfo);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "var(--lagoon-tint-10)",
      borderRadius: "var(--radius-chip)",
      padding: "8px 12px",
      alignSelf: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      background: "var(--accent-lagoon)",
      WebkitMaskImage: "url(assets/icons/car.svg)",
      maskImage: "url(assets/icons/car.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: "var(--accent-lagoon)",
      lineHeight: 1
    }
  }, minutes), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-caption)",
      fontSize: 12,
      fontWeight: 600,
      color: "var(--text-secondary)"
    }
  }, "min depuis l'hébergement")));
}

// Les 11 jours du voyage (8 au 18 août 2026), pour le sélecteur de jours
// individuels — permet des événements non consécutifs (ex. 11, 12 et 14 août)
// sans supposer que tous les jours entre les deux sont concernés.
const TRIP_DAYS = Array.from({
  length: 11
}, (_, i) => `2026-08-${String(8 + i).padStart(2, "0")}`);

// Idea.dates : tableau de dates ISO ("2026-08-11"), ou absent/vide si aucune
// date n'est associée à l'idée.
function formatIdeaDates(idea) {
  const dates = idea.dates || [];
  if (!dates.length) return "";
  const days = dates.slice().sort().map(iso => Number(iso.split("-")[2]));
  return `${days.join(", ")} août`;
}
function DayPicker({
  selected,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, TRIP_DAYS.map(iso => {
    const day = Number(iso.split("-")[2]);
    const active = selected.includes(iso);
    return /*#__PURE__*/React.createElement("button", {
      key: iso,
      onClick: () => onToggle(iso),
      style: {
        minWidth: 40,
        minHeight: 40,
        borderRadius: "var(--radius-button)",
        border: active ? "1px solid var(--accent-lagoon)" : "1px solid var(--border-default)",
        background: active ? "var(--lagoon-tint-16)" : "#fff",
        color: active ? "var(--accent-lagoon)" : "var(--text-secondary)",
        font: "var(--text-caption)",
        fontWeight: active ? 700 : 500,
        fontSize: 13,
        cursor: "pointer"
      }
    }, day);
  }));
}

// Petit repère de version affiché en bas de l'écran. Permet à Benoit et Jessica
// de vérifier d'un coup d'œil qu'ils voient tous les deux la même version —
// donc que l'app s'est bien rafraîchie après une mise à jour.
function VersionTag() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      fontSize: 11,
      color: "var(--text-secondary)",
      textAlign: "center",
      opacity: 0.7,
      paddingTop: 8
    }
  }, "Version ", window.APP_VERSION || "?");
}
function StatusTabs({
  value,
  onChange,
  counts
}) {
  const tabs = [{
    key: "explorer",
    label: "À explorer"
  }, {
    key: "retenue",
    label: "Retenues"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      background: "var(--color-bg)",
      borderRadius: "var(--radius-button)",
      padding: 4,
      border: "1px solid var(--border-default)"
    }
  }, tabs.map(t => {
    const active = value === t.key;
    return /*#__PURE__*/React.createElement("button", {
      key: t.key,
      onClick: () => onChange(t.key),
      style: {
        flex: 1,
        minHeight: 44,
        borderRadius: "var(--radius-button)",
        border: "none",
        cursor: "pointer",
        background: active ? "#fff" : "transparent",
        color: active ? "var(--accent-lagoon)" : "var(--text-secondary)",
        font: "var(--text-body)",
        fontWeight: active ? 700 : 500,
        fontSize: 14,
        boxShadow: active ? "var(--shadow-card)" : "none"
      }
    }, t.label, " (", counts[t.key] || 0, ")");
  }));
}
function IdeaForm({
  initial,
  onSave,
  onCancel
}) {
  const {
    Button
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  const [name, setName] = React.useState(initial ? initial.name : "");
  const [category, setCategory] = React.useState(initial ? initial.category : IDEA_CATEGORIES[0].key);
  const [sector, setSector] = React.useState(initial ? initial.sector : window.LIEUX_SECTORS[0].key);
  const [dates, setDates] = React.useState(initial ? initial.dates || [] : []);
  const toggleDate = iso => setDates(prev => prev.includes(iso) ? prev.filter(d => d !== iso) : [...prev, iso].sort());
  const [note, setNote] = React.useState(initial ? initial.note || "" : "");
  const [mapsUrl, setMapsUrl] = React.useState(initial ? initial.mapsUrl || "" : "");
  const [infoUrl, setInfoUrl] = React.useState(initial ? initial.infoUrl || "" : "");
  const [status, setStatus] = React.useState(initial ? initial.status || "explorer" : "explorer");
  const inputStyle = {
    width: "100%",
    minHeight: 44,
    padding: "0 12px",
    borderRadius: "var(--radius-input)",
    border: "1px solid var(--border-default)",
    font: "var(--text-body)",
    color: "var(--text-primary)",
    boxSizing: "border-box"
  };
  const label = {
    font: "var(--text-caption)",
    fontWeight: 600,
    color: "var(--text-secondary)",
    marginBottom: 4
  };
  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave({
      name: trimmed,
      category,
      sector,
      dates,
      note: note.trim(),
      mapsUrl: mapsUrl.trim(),
      infoUrl: infoUrl.trim(),
      status
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-card)",
      border: "1px solid var(--accent-lagoon)",
      padding: 14,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: label
  }, "Nom de l'endroit"), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "Ex. Plage de Grande Anse",
    style: inputStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: label
  }, "Catégorie"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, IDEA_CATEGORIES.map(c => {
    const active = category === c.key;
    return /*#__PURE__*/React.createElement("button", {
      key: c.key,
      onClick: () => setCategory(c.key),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 10px",
        borderRadius: "var(--radius-pill)",
        border: active ? "1px solid var(--accent-lagoon)" : "1px solid var(--border-default)",
        background: active ? "var(--lagoon-tint-16)" : "#fff",
        color: active ? "var(--accent-lagoon)" : "var(--text-secondary)",
        font: "var(--text-caption)",
        fontWeight: active ? 700 : 500,
        fontSize: 12,
        cursor: "pointer"
      }
    }, c.label);
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: label
  }, "Secteur"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, window.LIEUX_SECTORS.map(s => {
    const active = sector === s.key;
    return /*#__PURE__*/React.createElement("button", {
      key: s.key,
      onClick: () => setSector(s.key),
      style: {
        flex: 1,
        minHeight: 40,
        borderRadius: "var(--radius-button)",
        border: active ? "1px solid var(--accent-lagoon)" : "1px solid var(--border-default)",
        background: active ? "var(--lagoon-tint-16)" : "#fff",
        color: active ? "var(--accent-lagoon)" : "var(--text-secondary)",
        font: "var(--text-caption)",
        fontWeight: active ? 700 : 500,
        fontSize: 13,
        cursor: "pointer"
      }
    }, s.label);
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: label
  }, "Date(s) (optionnel) — pour un événement ponctuel"), /*#__PURE__*/React.createElement(DayPicker, {
    selected: dates,
    onToggle: toggleDate
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: label
  }, "Note (optionnel)"), /*#__PURE__*/React.createElement("textarea", {
    value: note,
    onChange: e => setNote(e.target.value),
    rows: 2,
    style: {
      ...inputStyle,
      minHeight: 60,
      padding: "10px 12px",
      resize: "vertical",
      fontFamily: "inherit"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: label
  }, "Lien Google Maps (optionnel)"), /*#__PURE__*/React.createElement("input", {
    value: mapsUrl,
    onChange: e => setMapsUrl(e.target.value),
    placeholder: "https://maps.app.goo.gl/...",
    style: inputStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: label
  }, "Lien d'information (optionnel) — ex. page Facebook de l'événement"), /*#__PURE__*/React.createElement("input", {
    value: infoUrl,
    onChange: e => setInfoUrl(e.target.value),
    placeholder: "https://facebook.com/...",
    style: inputStyle
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: label
  }, "Statut"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, [{
    key: "explorer",
    label: "À explorer"
  }, {
    key: "retenue",
    label: "Retenue"
  }].map(s => {
    const active = status === s.key;
    return /*#__PURE__*/React.createElement("button", {
      key: s.key,
      onClick: () => setStatus(s.key),
      style: {
        flex: 1,
        minHeight: 40,
        borderRadius: "var(--radius-button)",
        border: active ? "1px solid var(--accent-lagoon)" : "1px solid var(--border-default)",
        background: active ? "var(--lagoon-tint-16)" : "#fff",
        color: active ? "var(--accent-lagoon)" : "var(--text-secondary)",
        font: "var(--text-caption)",
        fontWeight: active ? 700 : 500,
        fontSize: 13,
        cursor: "pointer"
      }
    }, s.label);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    onClick: onCancel
  }, "Annuler")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    onClick: submit
  }, initial ? "Enregistrer les modifications" : "Enregistrer"))));
}
function IdeaCard({
  idea,
  onEdit,
  onDelete,
  onToggleStatus
}) {
  const {
    Button,
    Badge
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  const cat = IDEA_CATEGORIES.find(c => c.key === idea.category);
  const sec = window.LIEUX_SECTORS.find(s => s.key === idea.sector);
  const href = idea.mapsUrl || window.mapsUrl(idea.name + " Guadeloupe");
  const {
    minutes: driveMinutes,
    debugInfo: driveDebugInfo
  } = useDriveMinutes(idea);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-card)",
      border: "1px solid var(--border-default)",
      padding: "14px 6px 14px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 16,
      color: "var(--text-primary)",
      flex: 1,
      paddingTop: 12
    }
  }, idea.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onEdit(idea),
    "aria-label": "Modifier",
    style: {
      width: 48,
      height: 48,
      flexShrink: 0,
      border: "none",
      background: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      background: "var(--text-secondary)",
      WebkitMaskImage: "url(assets/icons/pencil.svg)",
      maskImage: "url(assets/icons/pencil.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (window.confirm(`Supprimer « ${idea.name} » ? Cette action est définitive.`)) onDelete(idea.id);
    },
    "aria-label": "Supprimer",
    style: {
      width: 48,
      height: 48,
      flexShrink: 0,
      border: "none",
      background: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      background: "var(--text-secondary)",
      WebkitMaskImage: "url(assets/icons/trash.svg)",
      maskImage: "url(assets/icons/trash.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, cat && /*#__PURE__*/React.createElement(Badge, {
    tone: "lagoon"
  }, cat.label), sec && /*#__PURE__*/React.createElement(Badge, {
    tone: "tropical"
  }, sec.label), idea.dates && idea.dates.length > 0 && /*#__PURE__*/React.createElement(Badge, {
    tone: "coral"
  }, formatIdeaDates(idea))), /*#__PURE__*/React.createElement(DriveTimeBadge, {
    minutes: driveMinutes,
    debugInfo: driveDebugInfo
  }), idea.note && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-primary)"
    }
  }, idea.note), idea.createdByEmail && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, "Ajouté par ", displayName(idea.createdByEmail)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    target: "_blank",
    rel: "noopener",
    style: {
      textDecoration: "none",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    icon: "assets/icons/map-pin.svg"
  }, "Itinéraire")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "tropical",
    fullWidth: true,
    icon: "assets/icons/circle-check.svg",
    onClick: () => onToggleStatus(idea)
  }, idea.status === "retenue" ? "À explorer" : "Retenir"))), idea.infoUrl && /*#__PURE__*/React.createElement("a", {
    href: idea.infoUrl,
    target: "_blank",
    rel: "noopener",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    icon: "assets/icons/external-link.svg"
  }, "Plus d'infos")));
}
function IdeesPartageesScreen({
  onBack
}) {
  const {
    Button
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  const [ready, setReady] = React.useState(!!window.__fb);
  const [user, setUser] = React.useState(undefined); // undefined = encore inconnu
  const [ideas, setIdeas] = React.useState([]);
  const [permError, setPermError] = React.useState(false);
  const [status, setStatus] = React.useState("explorer");
  const [formOpen, setFormOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [authError, setAuthError] = React.useState(window.__fbLastAuthError || null);
  React.useEffect(() => {
    if (ready) return;
    const onFbReady = () => setReady(true);
    window.addEventListener("firebase-ready", onFbReady);
    return () => window.removeEventListener("firebase-ready", onFbReady);
  }, [ready]);
  React.useEffect(() => {
    const onAuthError = () => setAuthError(window.__fbLastAuthError || null);
    window.addEventListener("firebase-auth-error", onAuthError);
    return () => window.removeEventListener("firebase-auth-error", onAuthError);
  }, []);
  React.useEffect(() => {
    if (!ready) return;
    return window.__fb.onAuthChange(u => setUser(u || null));
  }, [ready]);
  React.useEffect(() => {
    if (!ready || !user) return;
    setPermError(false);
    const unsub = window.__fb.subscribeIdeas(list => setIdeas(list), () => setPermError(true));
    return unsub;
  }, [ready, user]);
  if (!ready || user === undefined) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "24px 16px 100px"
      }
    }, /*#__PURE__*/React.createElement(BackHeader, {
      onBack: onBack,
      title: "Nos idées de voyage"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--text-body)",
        color: "var(--text-secondary)",
        textAlign: "center",
        padding: "40px 0"
      }
    }, "Chargement…"));
  }
  if (!user) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "24px 16px 100px"
      }
    }, /*#__PURE__*/React.createElement(BackHeader, {
      onBack: onBack,
      title: "Nos idées de voyage"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card)",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        alignItems: "center",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 52,
        height: 52,
        borderRadius: "var(--radius-icon-tile)",
        background: "var(--lagoon-tint-16)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 26,
        height: 26,
        background: "var(--accent-lagoon)",
        WebkitMaskImage: "url(assets/icons/sun.svg)",
        maskImage: "url(assets/icons/sun.svg)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--text-body)",
        fontWeight: 700,
        fontSize: 18,
        color: "var(--text-primary)"
      }
    }, "Un babillard partagé, juste pour vous deux"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--text-caption)",
        color: "var(--text-secondary)"
      }
    }, "Connecte-toi avec Google pour voir et ajouter des idées de voyage, synchronisées entre vos deux téléphones."), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      fullWidth: true,
      onClick: () => {
        sessionStorage.setItem("returnToTab", "idees-partagees");
        window.__fb.signIn();
      }
    }, "Se connecter avec Google"), authError && /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--text-caption)",
        color: "var(--accent-emergency)",
        background: "var(--surface-emergency)",
        borderRadius: "var(--radius-input)",
        padding: 10,
        textAlign: "left",
        width: "100%",
        boxSizing: "border-box"
      }
    }, "La dernière tentative de connexion a échoué", authError.via ? ` (${authError.via})` : "", " : ", authError.code, " — ", authError.message)), /*#__PURE__*/React.createElement(VersionTag, null));
  }
  if (permError) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "24px 16px 100px"
      }
    }, /*#__PURE__*/React.createElement(BackHeader, {
      onBack: onBack,
      title: "Nos idées de voyage"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-emergency)",
        borderRadius: "var(--radius-card)",
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--text-body)",
        fontWeight: 700,
        color: "var(--accent-emergency)"
      }
    }, "Accès non autorisé"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--text-caption)",
        color: "var(--text-primary)"
      }
    }, "Le compte ", user.email, " n'est pas autorisé pour ce babillard. Reconnecte-toi avec le compte Google de Benoit ou Jessica."), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      fullWidth: true,
      onClick: () => window.__fb.signOutUser()
    }, "Se déconnecter")));
  }
  const filtered = ideas.filter(i => (i.status || "explorer") === status);
  const counts = {
    explorer: ideas.filter(i => (i.status || "explorer") === "explorer").length,
    retenue: ideas.filter(i => i.status === "retenue").length
  };
  const openNew = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = idea => {
    setEditing(idea);
    setFormOpen(true);
  };
  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
  };
  const save = data => {
    // En édition, on ne touche pas à createdByEmail (auteur d'origine conservé
    // automatiquement puisqu'on ne l'inclut pas dans la mise à jour) — on
    // ajoute seulement qui a modifié l'idée. updatedAt est déjà horodaté par
    // updateIdea côté pont Firebase.
    if (editing) window.__fb.updateIdea(editing.id, {
      ...data,
      lastModifiedByEmail: user.email
    });else window.__fb.addIdea({
      ...data,
      createdByEmail: user.email
    });
    closeForm();
  };
  const toggleStatus = idea => window.__fb.updateIdea(idea.id, {
    status: idea.status === "retenue" ? "explorer" : "retenue"
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      padding: "24px 16px 100px"
    }
  }, /*#__PURE__*/React.createElement(BackHeader, {
    onBack: onBack,
    title: "Nos idées de voyage"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, "Connecté comme ", displayName(user.email)), /*#__PURE__*/React.createElement("button", {
    onClick: () => window.__fb.signOutUser(),
    style: {
      background: "none",
      border: "none",
      color: "var(--accent-lagoon)",
      font: "var(--text-caption)",
      fontWeight: 600,
      cursor: "pointer",
      padding: 4
    }
  }, "Déconnexion")), /*#__PURE__*/React.createElement(StatusTabs, {
    value: status,
    onChange: setStatus,
    counts: counts
  }), formOpen ? /*#__PURE__*/React.createElement(IdeaForm, {
    initial: editing,
    onSave: save,
    onCancel: closeForm
  }) : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    onClick: openNew
  }, "+ Ajouter une idée"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, filtered.length === 0 && !formOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)",
      textAlign: "center",
      padding: "12px 0"
    }
  }, status === "explorer" ? "Aucune idée à explorer pour l'instant." : "Aucune idée retenue pour l'instant."), filtered.map(i => /*#__PURE__*/React.createElement(IdeaCard, {
    key: i.id,
    idea: i,
    onEdit: openEdit,
    onDelete: window.__fb.deleteIdea,
    onToggleStatus: toggleStatus
  }))), /*#__PURE__*/React.createElement(VersionTag, null));
}
function BackHeader({
  onBack,
  title
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
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
  }, title));
}
window.IdeesPartageesScreen = IdeesPartageesScreen;
