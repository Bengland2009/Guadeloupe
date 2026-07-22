(() => {

const __ds_ns = (window.Guadeloupe2026DesignSystem_3f20c8 = window.Guadeloupe2026DesignSystem_3f20c8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  tone = "lagoon"
}) {
  const tones = {
    lagoon: {
      background: "var(--lagoon-tint-16)",
      color: "var(--accent-lagoon)"
    },
    tropical: {
      background: "var(--tropical-tint-14)",
      color: "var(--accent-tropical)"
    },
    coral: {
      background: "var(--coral-tint-14)",
      color: "var(--accent-coral)"
    },
    emergency: {
      background: "var(--surface-emergency)",
      color: "var(--accent-emergency)"
    },
    neutral: {
      background: "var(--color-bg)",
      color: "var(--text-secondary)"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: 26,
      padding: "0 10px",
      borderRadius: "var(--radius-pill)",
      font: "var(--text-caption)",
      fontWeight: 600,
      ...tones[tone]
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function Button({
  children,
  variant = "primary",
  size = "default",
  icon,
  fullWidth,
  disabled,
  onClick
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: size === "compact" ? 44 : "var(--min-button-height)",
    padding: "0 20px",
    borderRadius: "var(--radius-button)",
    font: "var(--text-button)",
    border: "none",
    cursor: disabled ? "default" : "pointer",
    width: fullWidth ? "100%" : undefined,
    opacity: disabled ? 0.5 : 1,
    transition: "background var(--duration-fast) var(--ease-standard)"
  };
  const variants = {
    primary: {
      background: "var(--accent-lagoon)",
      color: "#fff"
    },
    secondary: {
      background: "var(--color-card)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-default)"
    },
    urgence: {
      background: "var(--accent-emergency)",
      color: "#fff"
    },
    tropical: {
      background: "var(--accent-tropical)",
      color: "#fff"
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    style: {
      ...base,
      ...variants[variant]
    },
    disabled: disabled,
    onClick: onClick
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      background: variant === "secondary" ? "var(--text-primary)" : "#fff",
      WebkitMaskImage: `url(${icon})`,
      maskImage: `url(${icon})`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center"
    }
  }), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  padding = 20,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      background: "var(--surface-card)",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-card)",
      padding,
      cursor: onClick ? "pointer" : "default"
    }
  }, children);
}
function InfoRow({
  icon,
  label,
  value,
  tint = "var(--lagoon-tint-16)",
  accent = "var(--accent-lagoon)"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 0"
    }
  }, icon && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "var(--radius-icon-tile)",
      background: tint,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      background: accent,
      WebkitMaskImage: `url(${icon})`,
      maskImage: `url(${icon})`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 600,
      color: "var(--text-primary)",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, value)));
}
Object.assign(__ds_scope, { Card, InfoRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconTile.jsx
try { (() => {
function IconTile({
  icon,
  tint = "var(--lagoon-tint-16)",
  accent = "var(--accent-lagoon)",
  size = 44
}) {
  const glyph = size * 0.5;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: "var(--radius-icon-tile)",
      background: tint,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: glyph,
      height: glyph,
      background: accent,
      WebkitMaskImage: `url(${icon})`,
      maskImage: `url(${icon})`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center"
    }
  }));
}
Object.assign(__ds_scope, { IconTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconTile.jsx", error: String((e && e.message) || e) }); }

// components/data/TimelineItem.jsx
try { (() => {
function TimelineItem({
  icon,
  time,
  title,
  detail,
  isLast,
  tint = "var(--lagoon-tint-16)",
  accent = "var(--accent-lagoon)"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "var(--radius-icon-tile)",
      background: tint,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 20,
      height: 20,
      background: accent,
      WebkitMaskImage: `url(${icon})`,
      maskImage: `url(${icon})`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  })), !isLast && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 2,
      flex: 1,
      background: "var(--border-default)",
      marginTop: 4
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: isLast ? 0 : 20
    }
  }, time && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      fontWeight: 600,
      color: "var(--text-secondary)"
    }
  }, time), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 600,
      color: "var(--text-primary)"
    }
  }, title), detail && /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)",
      marginTop: 2
    }
  }, detail)));
}
Object.assign(__ds_scope, { TimelineItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/TimelineItem.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Accordion.jsx
try { (() => {
const {
  useState
} = React;
function Accordion({
  title,
  children,
  defaultOpen = false
}) {
  const [open, setOpen] = useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-default)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "14px 2px",
      minHeight: "var(--min-tap)",
      font: "var(--text-body)",
      fontWeight: 600,
      color: "var(--text-primary)",
      textAlign: "left"
    }
  }, title, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      background: "var(--text-secondary)",
      WebkitMaskImage: "url(assets/icons/chevron-down.svg)",
      maskImage: "url(assets/icons/chevron-down.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      transform: open ? "rotate(180deg)" : "none",
      transition: "transform var(--duration-base) var(--ease-standard)"
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 16,
      font: "var(--text-body)",
      color: "var(--text-secondary)"
    }
  }, children));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmergencyBanner.jsx
try { (() => {
function EmergencyBanner({
  title,
  detail,
  phoneLabel,
  phoneNumber
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-emergency)",
      borderRadius: "var(--radius-card)",
      padding: 18,
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 22,
      height: 22,
      background: "var(--accent-emergency)",
      WebkitMaskImage: "url(assets/icons/triangle-alert.svg)",
      maskImage: "url(assets/icons/triangle-alert.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-title)",
      fontSize: 18,
      color: "var(--accent-emergency)"
    }
  }, title)), detail && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "var(--text-body)",
      color: "var(--color-text-primary)"
    }
  }, detail), phoneNumber && /*#__PURE__*/React.createElement("a", {
    href: `tel:${phoneNumber}`,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      height: "var(--min-button-height)",
      borderRadius: "var(--radius-button)",
      background: "var(--accent-emergency)",
      color: "#fff",
      font: "var(--text-button)",
      textDecoration: "none"
    }
  }, phoneLabel || `Appeler ${phoneNumber}`));
}
Object.assign(__ds_scope, { EmergencyBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmergencyBanner.jsx", error: String((e && e.message) || e) }); }

// components/navigation/BottomNav.jsx
try { (() => {
const TABS = [{
  key: "accueil",
  label: "Accueil",
  icon: "house"
}, {
  key: "voyage",
  label: "Voyage",
  icon: "plane"
}, {
  key: "adresses",
  label: "Adresses",
  icon: "map-pin"
}, {
  key: "pratique",
  label: "Pratique",
  icon: "info"
}, {
  key: "allergie",
  label: "Allergie",
  icon: "triangle-alert"
}];
function BottomNav({
  active = "accueil",
  onChange,
  iconsBase = "assets/icons"
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
      height: 76,
      background: "var(--surface-card)",
      borderTop: "1px solid var(--border-default)",
      boxShadow: "var(--shadow-nav)",
      display: "flex",
      paddingBottom: "env(safe-area-inset-bottom)"
    }
  }, TABS.map(t => {
    const isActive = t.key === active;
    const color = t.key === "allergie" && isActive ? "var(--accent-emergency)" : isActive ? "var(--accent-lagoon)" : "var(--text-secondary)";
    return /*#__PURE__*/React.createElement("button", {
      key: t.key,
      onClick: () => onChange && onChange(t.key),
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        minHeight: "var(--min-tap)",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "8px 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 24,
        height: 24,
        background: color,
        WebkitMaskImage: `url(${iconsBase}/${t.icon}.svg)`,
        maskImage: `url(${iconsBase}/${t.icon}.svg)`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: "var(--text-caption)",
        fontWeight: isActive ? 600 : 400,
        color
      }
    }, t.label));
  }));
}
Object.assign(__ds_scope, { BottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/BottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SectionHeader.jsx
try { (() => {
function SectionHeader({
  label,
  action,
  onAction
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "4px 2px 10px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-section-label)",
      color: "var(--text-secondary)",
      textTransform: "uppercase",
      letterSpacing: "var(--letter-spacing-wide)"
    }
  }, label), action && /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      background: "none",
      border: "none",
      color: "var(--accent-lagoon)",
      font: "var(--text-caption)",
      fontWeight: 600,
      cursor: "pointer",
      padding: 4
    }
  }, action));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SectionHeader.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;
__ds_ns.Button = __ds_scope.Button;
__ds_ns.Card = __ds_scope.Card;
__ds_ns.InfoRow = __ds_scope.InfoRow;
__ds_ns.IconTile = __ds_scope.IconTile;
__ds_ns.TimelineItem = __ds_scope.TimelineItem;
__ds_ns.Accordion = __ds_scope.Accordion;
__ds_ns.EmergencyBanner = __ds_scope.EmergencyBanner;
__ds_ns.BottomNav = __ds_scope.BottomNav;
__ds_ns.SectionHeader = __ds_scope.SectionHeader;

})();
