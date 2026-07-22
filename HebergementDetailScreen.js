// Gabarit réutilisable : page de détail d'un hébergement
// Usage: <HebergementDetailScreen stay={...} onBack={fn} />
// stay = { destination, name, host, dates, photo, lat, lng, directionsUrl, copyText,
//   arrival: { weekday, day, label }, departure: { weekday, day, label }, details: string[] }

function TimelineRow({
  icon,
  accent,
  weekday,
  day,
  label,
  time
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 34,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, weekday), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: "var(--color-bg)",
      border: "1px solid var(--border-default)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      font: "var(--text-caption)",
      fontWeight: 700,
      color: "var(--text-primary)",
      marginTop: 2
    }
  }, day)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "#fff",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-card)",
      padding: 14,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: "var(--radius-icon-tile)",
      background: accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 18,
      height: 18,
      background: "#fff",
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
      fontSize: 16,
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, time))));
}
function StayMap({
  lat,
  lng
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.L) return;
    const map = window.L.map(ref.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false
    }).setView([lat, lng], 14);
    window.L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors"
    }).addTo(map);
    const icon = window.L.divIcon({
      className: "",
      html: `<div style="display:flex;flex-direction:column;align-items:center;gap:4px"><div style="width:36px;height:36px;border-radius:50%;background:var(--accent-lagoon);display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow-card);border:2px solid #fff"><div style="width:18px;height:18px;background:#fff;-webkit-mask-image:url(assets/icons/house.svg);mask-image:url(assets/icons/house.svg);-webkit-mask-size:contain;mask-size:contain;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat"></div></div><div style="background:#fff;border-radius:999px;padding:2px 8px;font:600 11px/1.3 var(--font-family-base);color:var(--text-primary);box-shadow:var(--shadow-card);white-space:nowrap">Votre séjour</div></div>`,
      iconSize: [80, 60],
      iconAnchor: [40, 40]
    });
    window.L.marker([lat, lng], {
      icon
    }).addTo(map);
    setTimeout(() => map.invalidateSize(), 50);
    return () => map.remove();
  }, [lat, lng]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      width: "100%",
      height: "100%"
    }
  });
}
function HebergementDetailScreen({
  stay,
  onBack
}) {
  const {
    Button
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard.writeText(stay.copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--color-bg)",
      minHeight: "100%",
      paddingBottom: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 160,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(StayMap, {
    lat: stay.lat,
    lng: stay.lng
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      position: "absolute",
      top: 16,
      left: 16,
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "#fff",
      border: "none",
      boxShadow: "var(--shadow-card)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 500
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
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 16px",
      marginTop: -28,
      position: "relative",
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-title)",
      fontSize: 26,
      fontWeight: 700,
      color: "var(--text-primary)",
      marginBottom: 12,
      paddingLeft: 4
    }
  }, stay.destination), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-card)",
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: stay.photo,
    alt: stay.name,
    style: {
      width: 84,
      height: 84,
      borderRadius: "var(--radius-icon-tile)",
      objectFit: "cover",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 18,
      color: "var(--text-primary)"
    }
  }, stay.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)",
      marginTop: 4
    }
  }, "Votre hôte : ", stay.host), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)",
      marginTop: 4
    }
  }, stay.dates))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-default)",
      margin: "14px 0"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: stay.directionsUrl,
    target: "_blank",
    rel: "noopener",
    style: {
      textDecoration: "none",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    fullWidth: true,
    icon: "assets/icons/map-pin.svg"
  }, "Itinéraire")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    icon: copied ? "assets/icons/circle-check.svg" : "assets/icons/copy.svg",
    onClick: copy
  }, copied ? "Copié" : "Copier"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(window.SectionLabel, {
    label: "Arrivée et départ"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(TimelineRow, {
    icon: "key-round",
    accent: "var(--accent-lagoon)",
    weekday: stay.arrival.weekday,
    day: stay.arrival.day,
    label: "Arrivée",
    time: stay.arrival.label
  }), /*#__PURE__*/React.createElement(TimelineRow, {
    icon: "clock",
    accent: "var(--accent-coral)",
    weekday: stay.departure.weekday,
    day: stay.departure.day,
    label: "Départ",
    time: stay.departure.label
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(window.SectionLabel, {
    label: "Informations pratiques"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-card)",
      boxShadow: "var(--shadow-card)",
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, stay.details.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 8,
      font: "var(--text-body)",
      color: "var(--text-primary)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent-tropical)",
      marginTop: 8,
      flexShrink: 0
    }
  }), d))))));
}
window.HebergementDetailScreen = HebergementDetailScreen;