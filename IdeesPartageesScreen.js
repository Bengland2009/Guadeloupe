const KNOWN_NAMES = {
  "berthiaumebenoit@gmail.com": "Benoit",
  "jesscbrbz@gmail.com": "Jessica"
};
function displayName(email) {
  return KNOWN_NAMES[email] || (email ? email.split("@")[0] : "");
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
  const [category, setCategory] = React.useState(initial ? initial.category : window.LIEUX_CATEGORIES[0].key);
  const [sector, setSector] = React.useState(initial ? initial.sector : window.LIEUX_SECTORS[0].key);
  const [note, setNote] = React.useState(initial ? initial.note || "" : "");
  const [mapsUrl, setMapsUrl] = React.useState(initial ? initial.mapsUrl || "" : "");
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
      note: note.trim(),
      mapsUrl: mapsUrl.trim()
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
  }, window.LIEUX_CATEGORIES.map(c => {
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
  })), /*#__PURE__*/React.createElement("div", {
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
  }, "Enregistrer"))));
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
  const cat = window.LIEUX_CATEGORIES.find(c => c.key === idea.category);
  const sec = window.LIEUX_SECTORS.find(s => s.key === idea.sector);
  const href = idea.mapsUrl || window.mapsUrl(idea.name + " Guadeloupe");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-card)",
      border: "1px solid var(--border-default)",
      padding: 14,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onEdit(idea),
    style: {
      background: "none",
      border: "none",
      padding: 0,
      textAlign: "left",
      cursor: "pointer",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 16,
      color: "var(--text-primary)"
    }
  }, idea.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => onDelete(idea.id),
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
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, cat && /*#__PURE__*/React.createElement(Badge, {
    tone: "lagoon"
  }, cat.label), sec && /*#__PURE__*/React.createElement(Badge, {
    tone: "tropical"
  }, sec.label)), idea.note && /*#__PURE__*/React.createElement("div", {
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
  }, idea.status === "retenue" ? "À explorer" : "Retenir"))));
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
  React.useEffect(() => {
    if (ready) return;
    const onFbReady = () => setReady(true);
    window.addEventListener("firebase-ready", onFbReady);
    return () => window.removeEventListener("firebase-ready", onFbReady);
  }, [ready]);
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
      onClick: () => window.__fb.signIn()
    }, "Se connecter avec Google")));
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
    if (editing) window.__fb.updateIdea(editing.id, data);else window.__fb.addIdea({
      ...data,
      status: "explorer",
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
  }))));
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
