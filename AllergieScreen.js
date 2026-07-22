function ShrimpBanIcon({
  size = 72
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    fill: "none",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "32",
    r: "29",
    fill: "#fff",
    stroke: "var(--accent-coral)",
    strokeWidth: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16,40 C15,29 21,19 32,17 C41,15 47,20 47,26 C47,30 43,32 39,30 M39,30 C37,35 30,37 25,34 M25,34 C21,38 21,40 19,40",
    stroke: "var(--accent-coral)",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M43,20 L47,16 M46,24 L50,21",
    stroke: "var(--accent-coral)",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19,36 L14,38 M22,40 L18,44 M27,42 L25,47",
    stroke: "var(--accent-coral)",
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "55",
    x2: "55",
    y2: "9",
    stroke: "var(--accent-coral)",
    strokeWidth: "4.5",
    strokeLinecap: "round"
  }));
}
function LangCard({
  texts
}) {
  const [lang, setLang] = React.useState("fr");
  const labels = {
    fr: "Français",
    en: "English",
    es: "Español"
  };
  const headline = {
    fr: "ALLERGIE",
    en: "ALLERGY",
    es: "ALERGIA"
  };
  const tag = {
    fr: "Crevettes & crustacés",
    en: "Shrimp & shellfish",
    es: "Camarones y mariscos"
  };
  const t = texts[lang];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      background: "var(--lagoon-tint-16)",
      borderRadius: "var(--radius-button)",
      padding: 4
    }
  }, Object.keys(labels).map(key => /*#__PURE__*/React.createElement("button", {
    key: key,
    onClick: () => setLang(key),
    style: {
      flex: 1,
      height: 44,
      borderRadius: "var(--radius-button)",
      border: "none",
      cursor: "pointer",
      background: lang === key ? "var(--accent-lagoon)" : "transparent",
      color: lang === key ? "#fff" : "var(--text-primary)",
      font: "var(--text-button)",
      fontSize: 14
    }
  }, labels[key]))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      background: "linear-gradient(160deg, #fff 0%, var(--coral-tint-14) 100%)",
      border: "2px solid var(--accent-coral)",
      borderRadius: 22,
      boxShadow: "var(--shadow-card)",
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 14,
      aspectRatio: "1.55 / 1"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(ShrimpBanIcon, {
    size: 60
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 24,
      height: 24,
      background: "var(--accent-coral)",
      WebkitMaskImage: "url(assets/icons/triangle-alert.svg)",
      maskImage: "url(assets/icons/triangle-alert.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 26,
      fontWeight: 800,
      color: "var(--accent-coral)",
      letterSpacing: "var(--letter-spacing-tight)",
      lineHeight: 1
    }
  }, headline[lang])), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      fontWeight: 700,
      color: "var(--text-primary)",
      marginTop: 4
    }
  }, tag[lang]))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 16,
      color: "var(--text-primary)"
    }
  }, t.body), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, t.note))));
}
function Chrono() {
  const [running, setRunning] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const startRef = React.useRef(null);
  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setElapsed(Date.now() - startRef.current), 200);
    return () => clearInterval(id);
  }, [running]);
  const toggle = () => {
    if (!running) {
      startRef.current = Date.now() - elapsed;
      setRunning(true);
    } else setRunning(false);
  };
  const s = Math.floor(elapsed / 1000);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  const {
    Button
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-hero-time)",
      fontSize: 36,
      color: "var(--text-primary)",
      minWidth: 96
    }
  }, mm, ":", ss), /*#__PURE__*/React.createElement(Button, {
    variant: running ? "secondary" : "urgence",
    onClick: toggle
  }, running ? "Arrêter" : "Démarrer le chrono"));
}
function HomeButton({
  icon,
  label,
  sub,
  tone,
  onClick
}) {
  const isEmergency = tone === "urgence";
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      background: isEmergency ? "var(--accent-emergency)" : "#fff",
      border: isEmergency ? "none" : "1px solid var(--border-default)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-card)",
      padding: 20,
      display: "flex",
      alignItems: "center",
      gap: 16,
      cursor: "pointer",
      textAlign: "left",
      minHeight: 92
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: "var(--radius-icon-tile)",
      background: isEmergency ? "rgba(255,255,255,0.22)" : "var(--lagoon-tint-16)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      background: isEmergency ? "#fff" : "var(--accent-lagoon)",
      WebkitMaskImage: `url(assets/icons/${icon}.svg)`,
      maskImage: `url(assets/icons/${icon}.svg)`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 19,
      color: isEmergency ? "#fff" : "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: isEmergency ? "rgba(255,255,255,0.85)" : "var(--text-secondary)",
      marginTop: 2
    }
  }, sub)));
}
function AllergieScreen({
  D
}) {
  const {
    Accordion
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  const [mode, setMode] = React.useState("home");
  const a = D.trip.allergy;
  if (mode === "home") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: "24px 16px 100px"
      }
    }, /*#__PURE__*/React.createElement(window.ScreenHeader, {
      title: "Allergie",
      subtitle: "Carte et urgence"
    }), /*#__PURE__*/React.createElement(HomeButton, {
      icon: "info",
      label: "Montrer la carte",
      sub: "Français · English · Español",
      tone: "info",
      onClick: () => setMode("carte")
    }), /*#__PURE__*/React.createElement(HomeButton, {
      icon: "triangle-alert",
      label: "Urgence allergique",
      sub: "Étapes, chrono et EpiPen",
      tone: "urgence",
      onClick: () => setMode("urgence")
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      padding: "24px 16px 100px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setMode("home"),
    style: {
      width: 40,
      height: 40,
      borderRadius: "var(--radius-button)",
      border: "1px solid var(--border-default)",
      background: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
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
  }, mode === "carte" ? "Carte à montrer" : "Urgence allergique")), mode === "carte" ? /*#__PURE__*/React.createElement(LangCard, {
    texts: a.texts
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-emergency)",
      borderRadius: "var(--radius-card)",
      padding: 18,
      boxShadow: "var(--shadow-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      color: "var(--accent-emergency)",
      marginBottom: 12
    }
  }, "Étapes"), a.steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "7px 0",
      font: "var(--text-body)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: "50%",
      background: "var(--accent-emergency)",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      fontWeight: 700,
      flexShrink: 0
    }
  }, i + 1), s))), /*#__PURE__*/React.createElement("a", {
    href: "tel:112",
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      width: "100%",
      height: 56,
      background: "var(--accent-emergency)",
      color: "#fff",
      border: "none",
      borderRadius: "var(--radius-button)",
      font: "var(--text-button)",
      fontSize: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      background: "#fff",
      WebkitMaskImage: "url(assets/icons/phone.svg)",
      maskImage: "url(assets/icons/phone.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  }), "Appeler le 112")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-card)",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement(Chrono, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-card)",
      padding: "0 16px"
    }
  }, /*#__PURE__*/React.createElement(Accordion, {
    title: "Utiliser l'EpiPen",
    defaultOpen: true
  }, a.epipen.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "3px 0"
    }
  }, i + 1, ". ", s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)",
      textAlign: "center"
    }
  }, "Suivre en priorité le plan d'urgence fourni par le professionnel de la santé.")));
}
window.AllergieScreen = AllergieScreen;