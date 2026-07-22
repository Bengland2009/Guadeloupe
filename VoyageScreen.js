function IconHeader({
  icon,
  accent,
  tint,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: "var(--radius-icon-tile)",
      background: accent,
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
      fontSize: 18,
      color: "var(--text-primary)"
    }
  }, label));
}
function CodeChip({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      border: "1px solid var(--border-default)",
      borderRadius: 8,
      padding: "2px 8px",
      font: "var(--text-caption)",
      fontWeight: 700,
      color: "var(--text-primary)",
      marginTop: 4
    }
  }, children);
}
function FlightBlock({
  f,
  direction,
  tone,
  accent,
  leaveLabel,
  leaveTime
}) {
  const {
    Badge
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "14px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: tone
  }, direction), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, f.date), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, "· ", f.airline, " ", f.code)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: accent
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      width: 2,
      background: "var(--border-default)",
      minHeight: 40
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: accent
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 17,
      color: "var(--text-primary)"
    }
  }, f.from), /*#__PURE__*/React.createElement(CodeChip, null, f.fromCode)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-hero-time)",
      fontSize: 30,
      color: "var(--text-primary)"
    }
  }, f.depart), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, "Prévu"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      alignSelf: "flex-start",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-pill)",
      padding: "4px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 12,
      height: 12,
      background: "var(--text-secondary)",
      WebkitMaskImage: "url(assets/icons/clock.svg)",
      maskImage: "url(assets/icons/clock.svg)",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, f.duration)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-body)",
      fontWeight: 700,
      fontSize: 17,
      color: "var(--text-primary)"
    }
  }, f.to), /*#__PURE__*/React.createElement(CodeChip, null, f.toCode)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-hero-time)",
      fontSize: 30,
      color: "var(--text-primary)"
    }
  }, f.arrive), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, "Prévu"))))));
}
function VoyageScreen({
  D,
  go
}) {
  const {
    Card,
    SectionHeader,
    Accordion,
    Button,
    Badge
  } = window.Guadeloupe2026DesignSystem_3f20c8;
  const t = D.trip;
  const stayStyle = [{
    tint: "var(--lagoon-tint-16)",
    accent: "var(--accent-lagoon)",
    tone: "lagoon",
    icon: "sun"
  }, {
    tint: "var(--coral-tint-14)",
    accent: "var(--accent-coral)",
    tone: "coral",
    icon: "sun"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22,
      padding: "24px 16px 100px"
    }
  }, /*#__PURE__*/React.createElement(window.ScreenHeader, {
    title: "Voyage",
    subtitle: "Vols et voiture"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.SectionLabel, {
    label: "Vols"
  }), /*#__PURE__*/React.createElement(Card, {
    padding: 18
  }, /*#__PURE__*/React.createElement(IconHeader, {
    icon: "plane",
    accent: "var(--accent-lagoon)",
    label: "Air Transat"
  }), /*#__PURE__*/React.createElement(FlightBlock, {
    f: t.flights.aller,
    direction: "Aller",
    tone: "lagoon",
    accent: "var(--accent-lagoon)",
    leaveLabel: "Quitter la maison",
    leaveTime: t.flights.aller.leaveHome
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-default)",
      margin: "4px 0 0"
    }
  }), /*#__PURE__*/React.createElement(FlightBlock, {
    f: t.flights.retour,
    direction: "Retour",
    tone: "coral",
    accent: "var(--accent-coral)",
    leaveLabel: "Quitter Deshaies",
    leaveTime: t.flights.retour.leaveHouse
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.SectionLabel, {
    label: "Voiture"
  }), /*#__PURE__*/React.createElement(Card, {
    padding: 18
  }, /*#__PURE__*/React.createElement(IconHeader, {
    icon: "car",
    accent: "var(--accent-tropical)",
    label: t.car.agency
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      color: "var(--text-secondary)"
    }
  }, "Prise en charge : ", t.car.pickup, " · Retour : ", t.car.dropoff), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-default)",
      margin: "14px 0 0"
    }
  }), /*#__PURE__*/React.createElement(Accordion, {
    title: "Détails du véhicule"
  }, /*#__PURE__*/React.createElement("div", null, t.car.model), /*#__PURE__*/React.createElement("div", null, t.car.transmission), /*#__PURE__*/React.createElement("div", null, t.car.extras), /*#__PURE__*/React.createElement("div", null, t.car.mileage), /*#__PURE__*/React.createElement("div", null, t.car.fuel), /*#__PURE__*/React.createElement("div", null, t.car.deposit)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      borderTop: "1px solid var(--border-default)",
      paddingTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--text-caption)",
      fontWeight: 700,
      color: "var(--text-primary)",
      marginBottom: 8
    }
  }, "À présenter"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, t.car.bring.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      font: "var(--text-body)",
      color: "var(--text-primary)"
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
  }), b)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-default)",
      margin: "16px 0 0"
    }
  }), /*#__PURE__*/React.createElement(Accordion, {
    title: "Récupérer la voiture (8 août)"
  }, t.car.pickupInstructions), /*#__PURE__*/React.createElement(Accordion, {
    title: "Retourner la voiture (18 août)"
  }, t.car.returnInstructions))), t.stays.map((s, i) => {
    const st = stayStyle[i];
    return /*#__PURE__*/React.createElement("div", {
      key: s.id
    }, /*#__PURE__*/React.createElement(window.SectionLabel, {
      label: s.name
    }), /*#__PURE__*/React.createElement(Card, {
      padding: 18
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: "var(--radius-icon-tile)",
        background: st.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 20,
        height: 20,
        background: "#fff",
        WebkitMaskImage: "url(assets/icons/house.svg)",
        maskImage: "url(assets/icons/house.svg)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat"
      }
    })), /*#__PURE__*/React.createElement(Badge, {
      tone: st.tone
    }, s.place))), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--text-caption)",
        color: "var(--text-secondary)"
      }
    }, s.period, " · Hôte ", s.host), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 20,
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--text-caption)",
        color: "var(--text-secondary)"
      }
    }, "Arrivée"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--text-body)",
        fontWeight: 700,
        fontSize: 18,
        color: "var(--text-primary)"
      }
    }, s.checkin.replace("Arrivée ", ""))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--text-caption)",
        color: "var(--text-secondary)"
      }
    }, "Départ"), /*#__PURE__*/React.createElement("div", {
      style: {
        font: "var(--text-body)",
        fontWeight: 700,
        fontSize: 18,
        color: "var(--text-primary)"
      }
    }, s.checkout.replace("Départ ", "")))), /*#__PURE__*/React.createElement("button", {
      onClick: () => go(`stay-${s.id}`),
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        background: "none",
        border: "none",
        borderTop: "1px solid var(--border-default)",
        marginTop: 14,
        paddingTop: 14,
        cursor: "pointer",
        font: "var(--text-body)",
        fontWeight: 600,
        color: "var(--text-primary)"
      }
    }, "Voir l'hébergement", /*#__PURE__*/React.createElement("div", {
      style: {
        width: 16,
        height: 16,
        background: "var(--text-secondary)",
        WebkitMaskImage: "url(assets/icons/chevron-right.svg)",
        maskImage: "url(assets/icons/chevron-right.svg)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat"
      }
    }))));
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true,
    icon: "assets/icons/map-pin.svg",
    onClick: () => go("adresses")
  }, "Voir les adresses"));
}
window.VoyageScreen = VoyageScreen;