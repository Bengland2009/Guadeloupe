function TimelineStep({
  time,
  label,
  accent,
  isLast
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 10,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: accent,
      flexShrink: 0,
      marginTop: 4
    }
  }), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      width: 2,
      background: "var(--border-default)",
      minHeight: 28
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: isLast ? 0 : 16,
      flex: 1,
      display: "grid",
      gridTemplateColumns: "112px 1fr",
      columnGap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-hero-time)",
      fontSize: 20,
      fontWeight: 700,
      color: "var(--text-primary)",
      whiteSpace: "nowrap"
    }
  }, time), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 600,
      color: "var(--text-primary)",
      whiteSpace: "nowrap"
    }
  }, label)));
}
function FuelIcon({
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "22",
    x2: "15",
    y2: "22"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "9",
    x2: "14",
    y2: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 22V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 8h1.5a2 2 0 0 1 2 2v3.5a1.5 1.5 0 0 0 3 0V9a2 2 0 0 0-.59-1.41L19 5.5"
  }));
}
function TimelineMilestone({
  label,
  accent,
  isLast
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 10,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: accent,
      flexShrink: 0,
      marginTop: 4
    }
  }), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      width: 2,
      background: "var(--border-default)",
      minHeight: 28
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: isLast ? 0 : 16,
      flex: 1,
      display: "grid",
      gridTemplateColumns: "112px 1fr",
      columnGap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-start"
    }
  }, /*#__PURE__*/React.createElement(FuelIcon, {
    color: accent
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, label)));
}
function SectionCard({
  icon,
  accent,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-card)",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "var(--radius-icon-tile)",
      background: accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 17,
      height: 17,
      background: "#fff",
      WebkitMaskImage: `url(assets/icons/${icon}.svg)`,
      maskImage: `url(assets/icons/${icon}.svg)`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 16,
      color: "var(--text-primary)"
    }
  }, title)), children);
}
function CheckStep({
  text
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      background: "var(--accent-tropical)",
      WebkitMaskImage: "url(assets/icons/circle-check.svg)",
      maskImage: "url(assets/icons/circle-check.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      color: "var(--text-primary)"
    }
  }, text));
}
function CompactLine({
  label,
  detail
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 14,
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, detail));
}
function GateBadge({
  accent,
  gate
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 64,
      height: 26,
      borderRadius: "var(--radius-pill)",
      background: accent,
      color: "#fff",
      font: "var(--text-caption)",
      fontWeight: 700,
      flexShrink: 0
    }
  }, "Porte ", gate);
}
function GatePlan({
  letter,
  accent,
  icon,
  title,
  gate,
  conditions,
  note,
  isLast
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "26px 1fr 64px",
      columnGap: 10,
      alignItems: "start",
      padding: "12px 0",
      borderBottom: isLast ? "none" : "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 26,
      height: 26,
      borderRadius: "var(--radius-icon-tile)",
      background: accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 13,
      height: 13,
      background: "#fff",
      WebkitMaskImage: `url(assets/icons/${icon}.svg)`,
      maskImage: `url(assets/icons/${icon}.svg)`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 14,
      color: "var(--text-primary)",
      lineHeight: "26px"
    }
  }, letter ? `${letter} — ${title}` : title), conditions.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)",
      marginTop: 2
    }
  }, c)), note && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)",
      marginTop: 2
    }
  }, note)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-end",
      height: 26
    }
  }, /*#__PURE__*/React.createElement(GateBadge, {
    accent: accent,
    gate: gate
  })));
}
function PratiqueScreen({
  D
}) {
  const {
    Button
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  const p = D.trip.practical;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      padding: "24px 16px 100px"
    }
  }, /*#__PURE__*/React.createElement(window.ScreenHeader, {
    title: "Pratique",
    subtitle: "Départ, retour et transition"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.SectionLabel, {
    label: "Départ de Montréal"
  }), /*#__PURE__*/React.createElement(SectionCard, {
    icon: "plane",
    accent: "var(--accent-lagoon)",
    title: "Vers l'aéroport"
  }, /*#__PURE__*/React.createElement(TimelineStep, {
    time: p.depart.leave,
    label: "Quitter la maison",
    accent: "var(--accent-lagoon)"
  }), /*#__PURE__*/React.createElement(TimelineStep, {
    time: p.depart.airportArrival,
    label: "Arrivée au terminal",
    accent: "var(--accent-lagoon)"
  }), /*#__PURE__*/React.createElement(TimelineStep, {
    time: p.depart.flight,
    label: "Départ du vol",
    accent: "var(--accent-lagoon)",
    isLast: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 12,
      paddingTop: 12,
      borderTop: "1px solid var(--border-default)",
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Distance : ", p.depart.distance), /*#__PURE__*/React.createElement("span", null, "Trajet : ", p.depart.duration)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionCard, {
    icon: "car",
    accent: "var(--accent-lagoon)",
    title: "Accès à YUL"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(CompactLine, {
    label: "Taxi réservé",
    detail: "Jusqu'à l'aérogare"
  }), /*#__PURE__*/React.createElement(CompactLine, {
    label: "La veille",
    detail: "Vérifier le Planificateur de transit YUL"
  }), /*#__PURE__*/React.createElement(CompactLine, {
    label: "Si P10 recommandé",
    detail: "Demander au taxi de déposer au P10"
  }), /*#__PURE__*/React.createElement(CompactLine, {
    label: "P10 → porte 20",
    detail: "Navette en voie dédiée, environ 5 minutes"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://yuldirections.admtl.com/fr/",
    target: "_blank",
    rel: "noopener",
    style: {
      textDecoration: "none",
      display: "block",
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    icon: "assets/icons/external-link.svg"
  }, "Ouvrir le planificateur YUL")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.SectionLabel, {
    label: "Retour"
  }), /*#__PURE__*/React.createElement(SectionCard, {
    icon: "car",
    accent: "var(--accent-coral)",
    title: "Trajet vers PTP"
  }, /*#__PURE__*/React.createElement(TimelineStep, {
    time: p.retour.leave,
    label: "Quitter Deshaies",
    accent: "var(--accent-coral)"
  }), /*#__PURE__*/React.createElement(TimelineStep, {
    time: p.retour.airportArrival,
    label: "Arrivée à PTP",
    accent: "var(--accent-coral)"
  }), /*#__PURE__*/React.createElement(TimelineMilestone, {
    label: "Faire le plein",
    accent: "var(--accent-coral)"
  }), /*#__PURE__*/React.createElement(TimelineStep, {
    time: "10 h",
    label: "Retourner la voiture",
    accent: "var(--accent-coral)"
  }), /*#__PURE__*/React.createElement(TimelineStep, {
    time: p.retour.flight,
    label: "Départ du vol",
    accent: "var(--accent-coral)",
    isLast: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionCard, {
    icon: "navigation",
    accent: "var(--accent-coral)",
    title: "Sortie de YUL"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      fontWeight: 600,
      color: "var(--text-secondary)",
      marginBottom: 2
    }
  }, "Choisir selon la congestion et la longueur des files. Ne rien réserver à heure fixe."), /*#__PURE__*/React.createElement(GatePlan, {
    letter: "Plan A",
    accent: "var(--accent-lagoon)",
    icon: "car",
    title: "Taxi",
    gate: "23",
    conditions: ["Premier choix"]
  }), /*#__PURE__*/React.createElement(GatePlan, {
    letter: "Plan B",
    accent: "var(--accent-tropical)",
    icon: "car",
    title: "Limousine",
    gate: "24",
    conditions: ["Si l’attente pour les taxis paraît longue", "Sans réservation"]
  }), /*#__PURE__*/React.createElement(GatePlan, {
    letter: "Plan C",
    accent: "var(--accent-coral)",
    icon: "navigation",
    title: "P10",
    gate: "20",
    conditions: ["Si le secteur des portes est congestionné ou bloqué", "Navette dédiée · environ 5 min"],
    note: "Récupération par un proche ou un chauffeur."
  }), /*#__PURE__*/React.createElement(GatePlan, {
    accent: "var(--text-secondary)",
    icon: "car",
    title: "Uber Black",
    gate: "25",
    conditions: []
  }), /*#__PURE__*/React.createElement(GatePlan, {
    accent: "var(--text-secondary)",
    icon: "car",
    title: "Uber et Lyft réguliers",
    gate: "28",
    conditions: ["Secteur Leigh-Capreol"],
    isLast: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.SectionLabel, {
    label: `Transition du ${p.transition.date}`
  }), /*#__PURE__*/React.createElement(SectionCard, {
    icon: "luggage",
    accent: "var(--accent-tropical)",
    title: "Changement d'hébergement"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(CheckStep, {
    text: `Quitter Raisins Clairs ${p.transition.from}`
  }), /*#__PURE__*/React.createElement(CheckStep, {
    text: `Arrivée à Deshaies ${p.transition.to}`
  }), /*#__PURE__*/React.createElement(CheckStep, {
    text: "Garder les bagages avec soi"
  }), /*#__PURE__*/React.createElement(CheckStep, {
    text: "Ne rien laisser visible dans la voiture"
  })))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.SectionLabel, {
    label: "Urgences"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, p.emergency.map(n => /*#__PURE__*/React.createElement("div", {
    key: n.number,
    style: {
      background: "var(--surface-emergency)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-card)",
      padding: 16,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "var(--radius-icon-tile)",
      background: "var(--accent-emergency)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      background: "#fff",
      WebkitMaskImage: "url(assets/icons/phone.svg)",
      maskImage: "url(assets/icons/phone.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 17,
      color: "var(--text-primary)"
    }
  }, n.label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, n.number)), /*#__PURE__*/React.createElement("a", {
    href: `tel:${n.number}`,
    style: {
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "urgence",
    size: "compact",
    icon: "assets/icons/phone.svg"
  }, "Appeler")))))));
}
window.PratiqueScreen = PratiqueScreen;