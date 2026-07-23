function SectorPicker({
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      background: "var(--color-bg)",
      borderRadius: "var(--radius-button)",
      padding: 4,
      border: "1px solid var(--border-default)"
    }
  }, window.LIEUX_SECTORS.map(s => {
    const active = value === s.key;
    return /*#__PURE__*/React.createElement("button", {
      key: s.key,
      onClick: () => onChange(s.key),
      style: {
        flex: 1,
        minHeight: 44,
        borderRadius: "var(--radius-button)",
        border: "none",
        background: active ? "#fff" : "transparent",
        color: active ? "var(--accent-lagoon)" : "var(--text-secondary)",
        font: "var(--text-body)",
        fontWeight: active ? 700 : 500,
        fontSize: 14,
        cursor: "pointer",
        boxShadow: active ? "var(--shadow-card)" : "none"
      }
    }, s.label);
  }));
}
function CategoryGrid({
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      columnGap: 8,
      rowGap: 5
    }
  }, window.LIEUX_CATEGORIES.map(c => {
    const active = value === c.key;
    return /*#__PURE__*/React.createElement("button", {
      key: c.key,
      onClick: () => onChange(c.key),
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        height: 48,
        padding: "0 8px",
        borderRadius: "var(--radius-chip)",
        border: active ? "1px solid var(--accent-lagoon)" : "1px solid var(--border-default)",
        background: active ? "var(--lagoon-tint-16)" : "#fff",
        color: active ? "var(--accent-lagoon)" : "var(--text-secondary)",
        font: "var(--text-caption)",
        fontWeight: active ? 700 : 500,
        fontSize: 12,
        cursor: "pointer",
        boxShadow: "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 14,
        height: 14,
        background: active ? "var(--accent-lagoon)" : "var(--text-secondary)",
        WebkitMaskImage: `url(assets/icons/${c.icon}.svg)`,
        maskImage: `url(assets/icons/${c.icon}.svg)`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        flexShrink: 0
      }
    }), c.label);
  }));
}
function EpicerieCard({
  p
}) {
  const {
    Button
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  const distTime = [p.distance, p.time].filter(Boolean).join(" · ");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-card)",
      border: "1px solid var(--border-default)",
      padding: 14,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 16,
      color: "var(--text-primary)"
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, p.type, " · ", p.usage), distTime && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, distTime), p.note && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-primary)",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden"
    }
  }, p.note), /*#__PURE__*/React.createElement("a", {
    href: window.mapsUrl(p.query),
    target: "_blank",
    rel: "noopener",
    style: {
      textDecoration: "none",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    icon: "assets/icons/map-pin.svg"
  }, "Itinéraire")));
}
function VoirCard({
  p
}) {
  const {
    Button,
    Badge
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-card)",
      border: "1px solid var(--border-default)",
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 16,
      color: "var(--text-primary)"
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)",
      marginTop: 3
    }
  }, p.info[0], p.info[1] ? " · " + p.info[1] : ""), p.badge && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "coral"
  }, p.badge)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 8,
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      background: "none",
      border: "none",
      cursor: "pointer",
      font: "var(--text-caption)",
      fontWeight: 600,
      color: "var(--accent-lagoon)",
      padding: "6px 0",
      minHeight: 32
    }
  }, "Détails", /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      background: "var(--accent-lagoon)",
      transform: open ? "rotate(180deg)" : "none",
      WebkitMaskImage: "url(assets/icons/chevron-down.svg)",
      maskImage: "url(assets/icons/chevron-down.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  })), /*#__PURE__*/React.createElement("a", {
    href: window.mapsUrl(p.query),
    target: "_blank",
    rel: "noopener",
    style: {
      textDecoration: "none",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "compact",
    icon: "assets/icons/map-pin.svg"
  }, "Itinéraire"))), open && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-primary)",
      marginTop: 8,
      paddingTop: 8,
      borderTop: "1px solid var(--border-default)"
    }
  }, p.note));
}
function RestoCard({
  r
}) {
  const {
    Button
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-card)",
      border: "1px solid var(--border-default)",
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 16,
      color: "var(--text-primary)"
    }
  }, r.name), r.note && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)",
      marginTop: 3
    }
  }, r.note)), /*#__PURE__*/React.createElement("a", {
    href: window.mapsUrl(r.name + " Guadeloupe"),
    target: "_blank",
    rel: "noopener",
    style: {
      textDecoration: "none",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "compact",
    icon: "assets/icons/map-pin.svg"
  }, "Itinéraire"))));
}
function IdeesLinkCard({
  go
}) {
  const [fbReady, setFbReady] = React.useState(!!window.__fb);
  const [ideaCount, setIdeaCount] = React.useState(null);
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
        unsubIdeas = window.__fb.subscribeIdeas(list => setIdeaCount(list.length), () => setIdeaCount(null));
      } else {
        setIdeaCount(null);
      }
    });
    return () => {
      unsubAuth && unsubAuth();
      if (unsubIdeas) unsubIdeas();
    };
  }, [fbReady]);
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => go("idees-partagees"),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      minHeight: 50,
      padding: "0 14px",
      borderRadius: "var(--radius-chip)",
      border: "none",
      background: "var(--coral-tint-14)",
      cursor: "pointer",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      background: "var(--accent-coral)",
      WebkitMaskImage: "url(assets/icons/lightbulb.svg)",
      maskImage: "url(assets/icons/lightbulb.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 15,
      color: "var(--text-primary)",
      flex: 1
    }
  }, "Nos idées"), ideaCount !== null && /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-caption)",
      fontSize: 12,
      color: "var(--text-secondary)",
      fontWeight: 500,
      flexShrink: 0
    }
  }, ideaCount, " idée", ideaCount > 1 ? "s" : ""), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 13,
      height: 13,
      background: "var(--accent-coral)",
      WebkitMaskImage: "url(assets/icons/chevron-right.svg)",
      maskImage: "url(assets/icons/chevron-right.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      flexShrink: 0
    }
  }));
}
function AdressesScreen({
  D,
  go
}) {
  const [sector, setSector] = React.useState(() => {
    const s = window.currentSector();
    return s === "de" ? "de" : "sf";
  });
  const [cat, setCat] = React.useState("epiceries");
  const places = window.LIEUX_PLACES.filter(p => p.category === cat && p.sector === sector);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      padding: "24px 16px 100px"
    }
  }, /*#__PURE__*/React.createElement(window.ScreenHeader, {
    title: "Lieux",
    subtitle: "Suggestions utiles sur place"
  }), /*#__PURE__*/React.createElement(IdeesLinkCard, {
    go: go
  }), /*#__PURE__*/React.createElement(SectorPicker, {
    value: sector,
    onChange: setSector
  }), /*#__PURE__*/React.createElement(CategoryGrid, {
    value: cat,
    onChange: setCat
  }), cat === "epiceries" && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-card)",
      padding: 12,
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, window.EPICERIES_NOTE), cat === "restos" && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-emergency)",
      borderRadius: "var(--radius-card)",
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 16,
      height: 16,
      background: "var(--accent-emergency)",
      WebkitMaskImage: "url(assets/icons/triangle-alert.svg)",
      maskImage: "url(assets/icons/triangle-alert.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      fontWeight: 700,
      color: "var(--accent-emergency)"
    }
  }, window.ALLERGY_BANNER.title)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-primary)"
    }
  }, window.ALLERGY_BANNER.body)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, cat === "epiceries" && places.map(p => /*#__PURE__*/React.createElement(EpicerieCard, {
    key: p.id,
    p: p
  })), (cat === "avoir" || cat === "plages") && places.map(p => /*#__PURE__*/React.createElement(VoirCard, {
    key: p.id,
    p: p
  })), cat === "restos" && window.LIEUX_RESTAURANTS.map(r => /*#__PURE__*/React.createElement(RestoCard, {
    key: r.id,
    r: r
  }))));
}
window.AdressesScreen = AdressesScreen;
