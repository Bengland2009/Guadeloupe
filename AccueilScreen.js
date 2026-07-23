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
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      background: "var(--lagoon-tint-16)",
      borderRadius: "var(--radius-pill)",
      padding: "6px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 14,
      height: 14,
      background: "var(--accent-lagoon)",
      WebkitMaskImage: "url(assets/icons/calendar.svg)",
      maskImage: "url(assets/icons/calendar.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-caption)",
      fontWeight: 700,
      color: "var(--accent-lagoon)"
    }
  }, status.badge))), /*#__PURE__*/React.createElement("div", {
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
  }, status.subtitle)))), /*#__PURE__*/React.createElement("div", {
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
