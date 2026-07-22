const {
  BottomNav
} = window.Guadeloupe2026DesignSystem_3f20c8;
function App() {
  const [tab, setTab] = React.useState("accueil");
  const [ready, setReady] = React.useState(false);
  const [slow, setSlow] = React.useState(false);
  React.useEffect(() => {
    const poll = setInterval(() => {
      if (window.__TRIP__ && window.AccueilScreen) {
        setReady(true);
        clearInterval(poll);
      }
    }, 20);
    const slowTimer = setTimeout(() => setSlow(true), 6000);
    return () => {
      clearInterval(poll);
      clearTimeout(slowTimer);
    };
  }, []);
  if (!ready) {
    if (!slow) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
        font: "var(--text-body)",
        color: "var(--text-secondary)"
      }
    }, "Le chargement prend plus de temps que prévu.", /*#__PURE__*/React.createElement("br", null), "Vérifie ta connexion et recharge la page.");
  }
  const D = {
    trip: window.__TRIP__
  };
  const screens = {
    accueil: window.AccueilScreen,
    voyage: window.VoyageScreen,
    adresses: window.AdressesScreen,
    pratique: window.PratiqueScreen,
    allergie: window.AllergieScreen
  };
  const stayMeta = {
    "raisins-clairs": {
      destination: "Saint-François",
      lat: 16.24671,
      lng: -61.28691,
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=16.24671,-61.28691",
      copyText: "16.24671, -61.28691",
      photo: "assets/photos/raisins-clairs.png",
      arrival: {
        weekday: "sam.",
        day: "8",
        label: "Après 17 h"
      },
      departure: {
        weekday: "jeu.",
        day: "13",
        label: "Avant 10 h"
      },
      details: ["Deux chambres climatisées", "Deux piscines", "Plage accessible à pied", "Laveuse et sécheuse", "Stationnement privé"]
    },
    "bungalow-corossol": {
      destination: "Deshaies",
      lat: 16.275,
      lng: -61.802444,
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=16.275,-61.802444",
      copyText: "16.275, -61.802444",
      photo: "assets/photos/bungalow-corossol.png",
      arrival: {
        weekday: "jeu.",
        day: "13",
        label: "Après 15 h"
      },
      departure: {
        weekday: "mar.",
        day: "18",
        label: "Avant 10 h"
      },
      details: ["Une chambre climatisée", "Une chambre avec ventilateurs", "Piscine partagée"]
    }
  };
  let Screen = screens[tab];
  let screenProps = {
    D,
    go: setTab
  };
  if (tab.startsWith("stay-")) {
    const stayId = tab.replace("stay-", "");
    const s = window.__TRIP__.stays.find(x => x.id === stayId);
    const meta = stayMeta[stayId];
    Screen = window.HebergementDetailScreen;
    screenProps = {
      onBack: () => setTab("voyage"),
      stay: {
        id: s.id,
        destination: meta.destination,
        name: s.name,
        host: s.host,
        dates: s.period.replace(" au ", " – "),
        lat: meta.lat,
        lng: meta.lng,
        directionsUrl: meta.directionsUrl,
        copyText: meta.copyText,
        photo: meta.photo,
        arrival: meta.arrival,
        departure: meta.departure,
        details: meta.details
      }
    };
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "app-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scroll-area"
  }, /*#__PURE__*/React.createElement(Screen, screenProps)), /*#__PURE__*/React.createElement(BottomNav, {
    active: tab,
    onChange: setTab,
    iconsBase: "assets/icons"
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));