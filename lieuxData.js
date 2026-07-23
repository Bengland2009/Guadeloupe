export const sectors = [
  { key: "sf", label: "Saint-François" },
  { key: "de", label: "Deshaies" },
];

export const categories = [
  { key: "epiceries", label: "Épiceries", icon: "receipt" },
  { key: "restos", label: "Restos", icon: "utensils" },
  { key: "avoir", label: "À voir", icon: "compass" },
  { key: "plages", label: "Plages", icon: "umbrella" },
  { key: "idees", label: "Idées", icon: "sun" },
];

export function currentSector(now = new Date()) {
  const d = (day, h = 0, mi = 0) => new Date(2026, 7, day, h, mi);
  if (now >= d(8) && now < d(13, 10)) return "sf";
  if (now >= d(13, 10) && now < d(18, 13, 10)) return "de";
  return "sf";
}

export const places = [
  // À voir — Deshaies
  { id: "cascade-ecrevisses", name: "Cascade aux Écrevisses", category: "avoir", sector: "de", info: ["1 à 2 h", "Très facile"], note: "Sentier ~200 m, poussette possible, gratuit. Arriver tôt.", query: "Cascade aux Écrevisses Guadeloupe" },
  { id: "jardin-botanique", name: "Jardin Botanique de Deshaies", category: "avoir", sector: "de", info: ["1 h 30 à 2 h", "Dernière entrée 16 h 30"], note: "Quelques passages en pente.", query: "Jardin Botanique de Deshaies" },
  { id: "carbet", name: "2e Chutes du Carbet", category: "avoir", sector: "de", info: ["~1 h 30 A/R", "1,4 km · facile"], note: "Observation depuis le belvédère. Accès au pied interdit (chutes de pierres).", query: "2e Chute du Carbet Guadeloupe" },
  { id: "reserve-cousteau", name: "Réserve Cousteau", category: "avoir", sector: "de", info: ["Bateau fond de verre", "1 h 15 à 1 h 30"], note: "Prévoir 2 à 3 h au total. Réserver une heure adaptée aux enfants.", query: "Réserve Cousteau Guadeloupe" },

  // À voir — Saint-François
  { id: "pointe-chateaux", name: "Pointe des Châteaux", category: "avoir", sector: "sf", info: ["1 h à 1 h 30 (croix)", "Très exposée soleil/vent"], note: "Tôt le matin. Ne pas confondre avec le sentier complet de 10 km.", query: "Pointe des Châteaux Guadeloupe" },
  { id: "marie-galante", name: "Marie-Galante", category: "avoir", sector: "sf", info: ["Journée complète", "Effort faible"], note: "Logistique importante.", badge: "Date fixe · lun. 10 ou mer. 12 août", query: "Marie-Galante ferry Saint-François" },
  { id: "petite-terre", name: "Petite-Terre", category: "avoir", sector: "sf", info: ["Journée complète", "~45 min bateau/direction"], note: "Traversée parfois mouvementée.", badge: "À réserver", query: "Petite-Terre Guadeloupe excursion" },

  // Plages
  { id: "grande-anse", name: "Grande Anse", category: "plages", sector: "de", info: ["Demi-journée", "Non surveillée"], note: "Vagues et courant possibles — rester près du rivage avec les enfants.", query: "Grande Anse Deshaies" },
  { id: "bois-jolan", name: "Bois Jolan", category: "plages", sector: "sf", info: ["Demi-journée", "Idéal enfants"], note: "Lagon peu profond, généralement calme.", query: "Plage de Bois Jolan Guadeloupe" },
  { id: "anse-gourde", name: "Anse à la Gourde", category: "plages", sector: "sf", info: ["Demi-journée", "À traiter séparément de Bois Jolan"], note: "Vérifier les conditions de baignade le jour même.", query: "Anse à la Gourde Guadeloupe" },

  // Épiceries — Saint-François
  { id: "super-u-sf", name: "Super U Saint-François", category: "epiceries", sector: "sf", type: "Supermarché", usage: "Gros plein", time: "5 à 10 min", note: "Idéal avant le transfert vers Deshaies.", query: "Super U Saint-François Guadeloupe" },
  { id: "sf-store", name: "Saint-François Store", category: "epiceries", sector: "sf", type: "Petite surface", usage: "Dépannage", note: "Rue du Général-de-Gaulle. Épicerie générale et bazar.", query: "Saint-François Store, rue du Général-de-Gaulle, Saint-François" },
  { id: "marche-nocturne", name: "Marché nocturne", category: "epiceries", sector: "sf", type: "Marché", usage: "Produits locaux", note: "Mar. 11 août, fin d'après-midi et soirée. Vérifier les heures ou annulations le jour même.", query: "Marché nocturne Saint-François Guadeloupe" },

  // Épiceries — Deshaies
  { id: "express-market", name: "Express Market", category: "epiceries", sector: "de", type: "Supermarché", usage: "Dépannage", distance: "~3,6 km", note: "Boulevard des Poissonniers.", query: "Express Market Deshaies" },
  { id: "leclerc-ste-rose", name: "E.Leclerc Sainte-Rose", category: "epiceries", sector: "de", type: "Grande surface", usage: "Gros plein", time: "20 à 30 min", note: "Selon la circulation.", query: "E.Leclerc Sainte-Rose Guadeloupe" },
];

export const epiceriesNote = "Avant le transfert du 13 août : faire le gros plein à Saint-François. Prévoir des sacs isothermes et acheter le froid en dernier.";

export const allergyBanner = {
  title: "Allergie aux crustacés",
  body: "Aucun restaurant n'est présumé sécuritaire. Toujours confirmer directement avec la cuisine les ingrédients, sauces, surfaces, plaques et ustensiles.",
};

// Secteur non confirmé pour ces 4 restaurants : affichés dans les deux secteurs plutôt que d'inventer un secteur.
export const restaurants = [
  { id: "trezzia", name: "Trezzia Pizzeria" },
  { id: "petite-creperie", name: "La Petite Crêperie" },
  { id: "cherrys", name: "Cherry's Pizza", note: "Sert également du poisson." },
  { id: "stuffed-chicken", name: "Stuffed Chicken – Le Raisinier" },
];
