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
      gap: 8
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
        gap: 8,
        minHeight: 48,
        padding: "6px 8px",
        borderRadius: "var(--radius-card)",
        border: active ? "1px solid var(--accent-lagoon)" : "1px solid var(--border-default)",
        background: active ? "var(--lagoon-tint-16)" : "#fff",
        color: active ? "var(--accent-lagoon)" : "var(--text-secondary)",
        font: "var(--text-caption)",
        fontWeight: active ? 700 : 600,
        fontSize: 13,
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 16,
        height: 16,
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

// Idées : babillard personnel, stocké uniquement sur cet appareil (localStorage).
// Pas de synchronisation entre téléphones — choix assumé, pas de backend pour cette app.
const IDEES_KEY = "guadeloupe2026_idees";
function loadIdees() {
  try {
    const raw = JSON.parse(localStorage.getItem(IDEES_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch (e) {
    return [];
  }
}
function saveIdees(list) {
  try {
    localStorage.setItem(IDEES_KEY, JSON.stringify(list));
  } catch (e) {}
}
function IdeeCard({
  idee,
  onDelete
}) {
  const {
    Button
  } = window.Guadeloupe2026DesignSystem_3f20c8;
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
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 16,
      color: "var(--text-primary)"
    }
  }, idee.name), /*#__PURE__*/React.createElement("button", {
    onClick: () => onDelete(idee.id),
    "aria-label": "Supprimer",
    style: {
      width: 28,
      height: 28,
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
      width: 14,
      height: 14,
      background: "var(--text-secondary)",
      WebkitMaskImage: "url(assets/icons/x.svg)",
      maskImage: "url(assets/icons/x.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  }))), idee.note && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-primary)"
    }
  }, idee.note), /*#__PURE__*/React.createElement("a", {
    href: window.mapsUrl(idee.name + " Guadeloupe"),
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
function AddIdeeForm({
  onAdd,
  onCancel
}) {
  const {
    Button
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  const [name, setName] = React.useState("");
  const [note, setNote] = React.useState("");
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
  const submit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onAdd({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: trimmed,
      note: note.trim()
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
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "Nom de l'endroit",
    style: inputStyle
  }), /*#__PURE__*/React.createElement("textarea", {
    value: note,
    onChange: e => setNote(e.target.value),
    placeholder: "Note (optionnel)",
    rows: 2,
    style: {
      ...inputStyle,
      minHeight: 60,
      padding: "10px 12px",
      resize: "vertical",
      fontFamily: "inherit"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
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
  }, "Ajouter"))));
}
function AdressesScreen({
  D
}) {
  const {
    Button
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  const [sector, setSector] = React.useState(() => {
    const s = window.currentSector();
    return s === "de" ? "de" : "sf";
  });
  const [cat, setCat] = React.useState("epiceries");
  const [idees, setIdees] = React.useState(loadIdees);
  const [addingIdee, setAddingIdee] = React.useState(false);
  const places = window.LIEUX_PLACES.filter(p => p.category === cat && p.sector === sector);
  const addIdee = idee => {
    const next = [idee, ...idees];
    setIdees(next);
    saveIdees(next);
    setAddingIdee(false);
  };
  const deleteIdee = id => {
    const next = idees.filter(i => i.id !== id);
    setIdees(next);
    saveIdees(next);
  };
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
  }, window.ALLERGY_BANNER.body)), cat === "idees" && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-card)",
      padding: 12,
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, "Notes personnelles, gardées uniquement sur cet appareil — pas partagées automatiquement."), /*#__PURE__*/React.createElement("div", {
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
  })), cat === "idees" && /*#__PURE__*/React.createElement(React.Fragment, null, addingIdee ? /*#__PURE__*/React.createElement(AddIdeeForm, {
    onAdd: addIdee,
    onCancel: () => setAddingIdee(false)
  }) : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    onClick: () => setAddingIdee(true)
  }, "+ Ajouter une idée"), idees.length === 0 && !addingIdee && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)",
      textAlign: "center",
      padding: "12px 0"
    }
  }, "Aucune idée pour l'instant."), idees.map(i => /*#__PURE__*/React.createElement(IdeeCard, {
    key: i.id,
    idee: i,
    onDelete: deleteIdee
  })))));
}
window.AdressesScreen = AdressesScreen;