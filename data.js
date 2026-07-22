export const trip = {
  dates: "8 au 18 août 2026",
  flights: {
    aller: { code: "TS 894", airline: "Air Transat", date: "Sam. 8 août", from: "Montréal", fromCode: "YUL", to: "Pointe-à-Pitre", toCode: "PTP", depart: "7 h 05", arrive: "11 h 50", duration: "4h45", leaveHome: "3 h 25" },
    retour: { code: "TS 895", airline: "Air Transat", date: "Mar. 18 août", from: "Pointe-à-Pitre", fromCode: "PTP", to: "Montréal", toCode: "YUL", depart: "13 h 10", arrive: "18 h 15", duration: "5h05", leaveHouse: "8 h 45" },
  },
  car: {
    agency: "SIXT",
    pickup: "8 août à 12 h",
    dropoff: "18 août à 10 h",
    model: "Renault Captur ou similaire",
    transmission: "Transmission manuelle",
    extras: "Deux sièges d'appoint",
    mileage: "Kilométrage illimité",
    fuel: "Carburant : plein à plein",
    deposit: "Dépôt : 900 €",
    bring: ["Permis physique", "Passeport", "Bon de réservation", "Carte de crédit physique avec NIP"],
    pickupInstructions: "Après avoir récupéré tes bagages, sors du terminal côté pharmacie, puis tourne à droite. Prends la navette Sixt jusqu'à la Zone Loueurs, Les Abymes 97139. Suis les panneaux AGENCES DE LOCATION DE VOITURES.",
    returnInstructions: "Prends la première sortie sur le rond-point de l'aéroport, suis le panneau LOCATION DE VOITURES et stationne dans la zone CAR RETURN. La boîte à clés est disponible 24h/24.",
  },
  stays: [
    {
      id: "raisins-clairs", name: "Raisins Clairs", place: "Saint-François", period: "8 au 13 août",
      host: "Mongi", checkin: "Arrivée après 17 h", checkout: "Départ avant 10 h",
      details: ["Deux chambres climatisées", "Deux piscines", "Plage à pied", "Stationnement privé", "Wi-Fi", "Laveuse sans sécheuse"],
    },
    {
      id: "bungalow-corossol", name: "Bungalow Corossol", place: "Deshaies", period: "13 au 18 août",
      host: "Justine", checkin: "Arrivée après 15 h", checkout: "Départ avant 10 h",
      details: ["Plage à environ 150 mètres", "Chambre principale climatisée", "Chambre des enfants avec ventilateurs", "Piscine partagée", "Stationnement privé", "Wi-Fi", "Aucune laveuse"],
    },
  ],
  addresses: [
    { id: 1, name: "YUL · Aéroport International Pierre-Elliott-Trudeau", address: "975 boulevard Roméo-Vachon Nord, Dorval, QC H4Y 1H1", category: "Aéroport", icon: "plane", query: "Aéroport International Pierre-Elliott-Trudeau Montréal" },
    { id: 2, name: "PTP · Aéroport International Pôle Caraïbes", address: "Morne Mamiel, Les Abymes 97139, Guadeloupe", category: "Aéroport", icon: "plane", query: "Aéroport International Pôle Caraïbes Pointe-à-Pitre" },
    { id: 3, name: "SIXT Guadeloupe", address: "Zone Loueurs, Les Abymes 97139, Guadeloupe", category: "Location de voiture", icon: "car", query: "SIXT Guadeloupe Aéroport Pointe-à-Pitre" },
    { id: 4, name: "Raisins Clairs", address: "Saint-François 97118, Guadeloupe", category: "Hébergement · Saint-François", icon: "bed", query: "Raisins Clairs Saint-François Guadeloupe" },
    { id: 5, name: "Bungalow Corossol", address: "Chemin de Bornave, lieu-dit Ferry, Deshaies 97126, Guadeloupe", category: "Hébergement · Deshaies", icon: "bed", query: "Chemin de Bornave, lieu-dit Ferry, Deshaies, Guadeloupe" },
  ],
  practical: {
    depart: { leave: "3 h 25", duration: "24 à 35 minutes", distance: "24,6 km", flight: "7 h 05", airportArrival: "vers 4 h" },
    retour: { leave: "8 h 45", duration: "55 minutes à 1 h 15", flight: "13 h 10", airportArrival: "9 h 40–10 h", carReturnDeadline: "10 h pile" },
    transition: { date: "13 août", from: "avant 10 h", to: "après 15 h" },
    emergency: [{ label: "Urgence Europe", number: "112" }, { label: "SAMU", number: "15" }],
  },
  allergy: {
    child: "un enfant de notre groupe", food: "crevettes et crustacés",
    texts: {
      fr: { title: "Allergie grave aux crevettes et aux crustacés", body: "Un enfant de notre groupe est allergique aux crevettes et aux crustacés.", note: "Veuillez vérifier les ingrédients et éviter toute contamination croisée avec les aliments, les huiles, les surfaces et les ustensiles." },
      en: { title: "Severe shrimp and shellfish allergy", body: "A child in our group is allergic to shrimp and shellfish.", note: "Please check all ingredients and avoid cross-contact with food, cooking oil, surfaces and utensils." },
      es: { title: "Alergia grave a los camarones y mariscos", body: "Un niño de nuestro grupo es alérgico a los camarones y mariscos.", note: "Por favor, verifique los ingredientes y evite la contaminación cruzada con alimentos, aceite, superficies y utensilios." },
    },
    steps: ["Donner l'EpiPen", "Appeler le 112 ou le 15", "Coucher l'enfant", "Noter l'heure", "Préparer la deuxième dose"],
    epipen: ["Embout orange vers le bas", "Retirer le capuchon bleu", "Placer sur le côté extérieur de la cuisse", "Appuyer jusqu'au déclic", "Maintenir trois secondes"],
  },
};

export function getTripStatus(now = new Date()) {
  const d = (y, m, day, h = 0, mi = 0) => new Date(y, m - 1, day, h, mi);
  const start = d(2026, 8, 8, 0, 0);
  const flightOut = d(2026, 8, 8, 7, 5);
  const homeLeave = d(2026, 8, 8, 3, 25);
  const switchOut = d(2026, 8, 13, 10, 0);
  const switchIn = d(2026, 8, 13, 15, 0);
  const leaveDeshaies = d(2026, 8, 18, 8, 45);
  const carReturn = d(2026, 8, 18, 10, 0);
  const flightBack = d(2026, 8, 18, 13, 10);
  const end = d(2026, 8, 18, 18, 15);

  if (now < start) {
    const days = Math.ceil((start - now) / 86400000);
    return { title: `Départ dans ${days} jour${days > 1 ? "s" : ""}`, subtitle: "Quitter la maison à 3 h 25", badge: "8 août" };
  }
  if (now < homeLeave) return { title: "Départ dans quelques heures", subtitle: "Quitter la maison à 3 h 25", badge: "Aujourd'hui" };
  if (now < flightOut) return { title: "Vol TS 894 à 7 h 05", subtitle: "En route vers l'aéroport", badge: "Aujourd'hui" };
  if (now < switchOut) return { title: "Vous êtes à Saint-François", subtitle: "Raisins Clairs · jusqu'au 13 août", badge: "En vacances" };
  if (now < switchIn) return { title: "Quitter Deshaies… non, Raisins Clairs", subtitle: "Avant 10 h · arrivée à Deshaies après 15 h", badge: "13 août" };
  if (now < leaveDeshaies) return { title: "Vous êtes à Deshaies", subtitle: "Bungalow Corossol · jusqu'au 18 août", badge: "En vacances" };
  if (now < carReturn) return { title: "Quitter Deshaies à 8 h 45", subtitle: "Retourner la voiture à 10 h pile", badge: "18 août" };
  if (now < flightBack) return { title: "Vol TS 895 à 13 h 10", subtitle: "Retour de la voiture effectué", badge: "18 août" };
  if (now < end) return { title: "Retour vers Montréal", subtitle: "Vol TS 895 · arrivée 18 h 15", badge: "18 août" };
  return { title: "Bon retour !", subtitle: "Le voyage est terminé", badge: "Fin" };
}

export function mapsUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
