// Coordonnées reprises des mêmes hébergements utilisés ailleurs dans l'app
// (voir app.jsx / stayMeta), pour rester cohérent avec le reste du voyage.
const WEATHER_PLACES = {
  sf: {
    lat: 16.24671,
    lng: -61.28691,
    label: "Saint-François"
  },
  de: {
    lat: 16.275037,
    lng: -61.804011,
    label: "Deshaies"
  }
};

// Règle volontairement simple, propre à la météo : bascule au tout début du
// 13 août, sans tenir compte de l'heure exacte du transfert (contrairement à
// currentSector() utilisé pour la page Lieux).
function currentWeatherPlace(now = new Date()) {
  return now < new Date(2026, 7, 13) ? "sf" : "de";
}
function weatherIconName(code) {
  if (code === 0 || code === 1) return "sun";
  if (code === 2 || code === 3 || code >= 45 && code <= 48) return "cloud";
  return "cloud-rain";
}
function WeatherBadge() {
  const [weather, setWeather] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("weatherCache") || "null");
    } catch (_) {
      return null;
    }
  });
  React.useEffect(() => {
    const place = currentWeatherPlace();
    const {
      lat,
      lng
    } = WEATHER_PLACES[place];
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code&timezone=auto`).then(res => res.ok ? res.json() : Promise.reject()).then(data => {
      const next = {
        place,
        temp: Math.round(data.current.temperature_2m),
        code: data.current.weather_code,
        fetchedAt: Date.now()
      };
      setWeather(next);
      try {
        localStorage.setItem("weatherCache", JSON.stringify(next));
      } catch (_) {}
    }).catch(() => {
      // Hors ligne ou API indisponible : on garde ce qui est déjà affiché
      // (la dernière météo mise en cache, ou rien si on n'en a encore
      // jamais obtenu).
    });
  }, []);
  if (!weather) return null;
  const label = WEATHER_PLACES[weather.place].label;
  const icon = weatherIconName(weather.code);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: "var(--lagoon-tint-16)",
      borderRadius: "var(--radius-pill)",
      padding: "6px 12px",
      whiteSpace: "nowrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 14,
      height: 14,
      background: "var(--accent-lagoon)",
      WebkitMaskImage: `url(assets/icons/${icon}.svg)`,
      maskImage: `url(assets/icons/${icon}.svg)`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-caption)",
      fontWeight: 700,
      color: "var(--accent-lagoon)"
    }
  }, weather.temp, "° ", label));
}
function toISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function EventRow({
  idea,
  tone,
  go,
  sectorLabel
}) {
  const isToday = tone === "today";
  const accent = isToday ? "var(--accent-coral)" : "var(--accent-lagoon)";
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => go("idees-partagees"),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      border: "none",
      cursor: "pointer",
      textAlign: "left",
      background: isToday ? "var(--coral-tint-14)" : "var(--lagoon-tint-10)",
      borderRadius: "var(--radius-chip)",
      padding: "10px 12px",
      marginTop: 8,
      boxSizing: "border-box"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 20,
      height: 20,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      margin: "auto",
      width: 16,
      height: 16,
      background: accent,
      WebkitMaskImage: "url(assets/icons/bell.svg)",
      maskImage: "url(assets/icons/bell.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      fontSize: 10,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.02em",
      color: accent
    }
  }, isToday ? "Aujourd'hui" : "Demain"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 13,
      color: "var(--text-primary)"
    }
  }, idea.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      fontSize: 11,
      color: "var(--text-secondary)"
    }
  }, sectorLabel(idea.sector), " · dans vos idées")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      flexShrink: 0,
      background: accent,
      WebkitMaskImage: "url(assets/icons/chevron-right.svg)",
      maskImage: "url(assets/icons/chevron-right.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  }));
}
function TodayTomorrowEvents({
  go
}) {
  const [fbReady, setFbReady] = React.useState(!!window.__fb);
  const [ideas, setIdeas] = React.useState(null); // null = pas encore de données

  React.useEffect(() => {
    if (fbReady) return;
    const onReady = () => setFbReady(true);
    window.addEventListener("firebase-ready", onReady);
    return () => window.removeEventListener("firebase-ready", onReady);
  }, [fbReady]);
  React.useEffect(() => {
    if (!fbReady) return;
    let unsubIdeas = null;
    const unsubAuth = window.__fb.onAuthChange(user => {
      if (unsubIdeas) {
        unsubIdeas();
        unsubIdeas = null;
      }
      if (user) {
        unsubIdeas = window.__fb.subscribeIdeas(list => setIdeas(list), () => setIdeas(null));
      } else {
        setIdeas(null);
      }
    });
    return () => {
      unsubAuth && unsubAuth();
      if (unsubIdeas) unsubIdeas();
    };
  }, [fbReady]);
  if (!ideas) return null;
  const todayISO = toISODate(new Date());
  const tomorrowISO = toISODate(new Date(Date.now() + 86400000));
  const todayIdeas = ideas.filter(i => (i.dates || []).includes(todayISO));
  const todayIds = new Set(todayIdeas.map(i => i.id));
  // Si un événement tombe à la fois aujourd'hui et demain (ex. sur deux
  // jours consécutifs), on ne le répète pas dans la section « Demain ».
  const tomorrowIdeas = ideas.filter(i => !todayIds.has(i.id) && (i.dates || []).includes(tomorrowISO));
  if (!todayIdeas.length && !tomorrowIdeas.length) return null;
  const sectorLabel = key => {
    const s = window.LIEUX_SECTORS.find(x => x.key === key);
    return s ? s.label : "";
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: "var(--border-default)",
      margin: "18px 0 0"
    }
  }), todayIdeas.map(i => /*#__PURE__*/React.createElement(EventRow, {
    key: i.id,
    idea: i,
    tone: "today",
    go: go,
    sectorLabel: sectorLabel
  })), tomorrowIdeas.map(i => /*#__PURE__*/React.createElement(EventRow, {
    key: i.id,
    idea: i,
    tone: "tomorrow",
    go: go,
    sectorLabel: sectorLabel
  })));
}
function AccueilScreen({
  D,
  go
}) {
  const {
    Card,
    Badge
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  const status = window.getTripStatus(now);
  const quick = [{
    key: "voyage",
    icon: "plane",
    label: "Vol",
    tint: "var(--lagoon-tint-16)",
    accent: "var(--accent-lagoon)"
  }, {
    key: "voyage",
    icon: "house",
    label: "Hébergement",
    tint: "var(--coral-tint-14)",
    accent: "var(--accent-coral)"
  }, {
    key: "adresses",
    icon: "map-pin",
    label: "Itinéraire",
    tint: "var(--tropical-tint-14)",
    accent: "var(--accent-tropical)"
  }, {
    key: "allergie",
    icon: "triangle-alert",
    label: "Allergie",
    tint: "var(--coral-tint-14)",
    accent: "var(--accent-coral)"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      paddingBottom: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 210,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://www.ags-demenagement.com/outre-mer/wp-content/uploads/sites/2/2023/03/ile-dom-tom-guadeloupe-1080x675.jpg",
    alt: "Photo de la Guadeloupe",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(180deg, rgba(24,49,79,0.42) 0%, rgba(24,49,79,0.12) 30%, rgba(24,49,79,0) 55%, var(--color-bg) 100%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 20,
      left: 16,
      right: 16,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "34",
    height: "34",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#FFC93C",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      flexShrink: 0,
      filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.45))"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 20v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m4.93 4.93 1.41 1.41"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m17.66 17.66 1.41 1.41"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 12h2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 12h2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m6.34 17.66-1.41 1.41"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m19.07 4.93-1.41 1.41"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: 700,
      color: "#fff",
      letterSpacing: "var(--letter-spacing-tight)",
      textShadow: "0 2px 12px rgba(0,0,0,0.35)"
    }
  }, "Guadeloupe 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      color: "#fff",
      fontWeight: 600,
      marginTop: 2,
      marginLeft: 2,
      textShadow: "0 2px 12px rgba(0,0,0,0.35)"
    }
  }, "8 au 18 août · Voyage familial")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px",
      marginTop: -64
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "status-card",
    style: {
      position: "relative",
      overflow: "hidden",
      borderRadius: "var(--radius-card)",
      padding: 24,
      background: "#fff",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -30,
      right: -30,
      width: 110,
      height: 110,
      borderRadius: "50%",
      background: "var(--sun-tint)",
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(WeatherBadge, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1.15,
      color: "var(--text-primary)",
      marginTop: 16
    }
  }, status.title), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      background: "var(--accent-lagoon)",
      WebkitMaskImage: "url(assets/icons/clock.svg)",
      maskImage: "url(assets/icons/clock.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-body)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, status.subtitle)), /*#__PURE__*/React.createElement(TodayTomorrowEvents, {
    go: go
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px"
    }
  }, /*#__PURE__*/React.createElement(window.SectionLabel, {
    label: "Accès rapide"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 140px)",
      gap: 14,
      justifyContent: "center",
      padding: "0 8px"
    }
  }, quick.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => go(t.key),
    className: "qa-tile",
    style: {
      "--tile-accent": t.accent,
      background: "#fff",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-card)",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      cursor: "pointer",
      border: "none",
      textAlign: "center",
      width: 140,
      height: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "qa-tile-icon-wrap",
    style: {
      width: 44,
      height: 44,
      borderRadius: "var(--radius-icon-tile)",
      background: t.accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "qa-icon",
    style: {
      width: 22,
      height: 22,
      background: "#fff",
      WebkitMaskImage: `url(assets/icons/${t.icon}.svg)`,
      maskImage: `url(assets/icons/${t.icon}.svg)`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      color: "var(--text-primary)",
      lineHeight: 1.2
    }
  }, t.label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px"
    }
  }, /*#__PURE__*/React.createElement(window.SectionLabel, {
    label: "Résumé du séjour"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      borderRadius: "var(--radius-card)",
      overflow: "hidden",
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "var(--lagoon-tint-16)",
      padding: "14px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      fontWeight: 700,
      color: "var(--accent-lagoon)",
      marginBottom: 6
    }
  }, "Étape 1"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      color: "var(--text-primary)",
      whiteSpace: "nowrap"
    }
  }, "Saint-François"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)",
      marginTop: 2
    }
  }, "8 – 13 août")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "var(--coral-tint-14)",
      padding: "14px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      fontWeight: 700,
      color: "var(--accent-coral)",
      marginBottom: 6
    }
  }, "Étape 2"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      color: "var(--text-primary)"
    }
  }, "Deshaies"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)",
      marginTop: 2
    }
  }, "13 – 18 août")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 22,
      height: 22,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-card)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      background: "var(--text-secondary)",
      WebkitMaskImage: "url(assets/icons/chevron-right.svg)",
      maskImage: "url(assets/icons/chevron-right.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      fontSize: 11,
      color: "var(--text-secondary)",
      textAlign: "center",
      opacity: 0.7
    }
  }, "Version ", window.APP_VERSION || "?"));
}
window.AccueilScreen = AccueilScreen;
