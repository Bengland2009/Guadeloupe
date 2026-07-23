// Pont Firebase pour les écrans classiques (non-module) de l'app.
// Ce fichier est un module ES (import/export natif du navigateur, aucun bundler
// nécessaire) ; il expose tout sur window.__fb pour que le reste de l'app —
// compilé en scripts classiques — puisse l'utiliser simplement.
//
// PAS UN SECRET : cet objet de config Firebase est fait pour être public
// (c'est un identifiant de projet, pas une clé d'API secrète). La vraie
// protection des données vient des règles de sécurité Firestore, qui
// limitent l'accès aux deux adresses Gmail autorisées.
const firebaseConfig = {
  apiKey: "AIzaSyC_iC6dv8ahsXorlIoT0sj8PVUQbqpBXqo",
  authDomain: "guadeloupe-2026.firebaseapp.com",
  projectId: "guadeloupe-2026",
  storageBucket: "guadeloupe-2026.firebasestorage.app",
  messagingSenderId: "320453079408",
  appId: "1:320453079408:web:2b1fd74828ec4bdcabdfb5",
};

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import {
  getFirestore, enableIndexedDbPersistence, collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, query, orderBy, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// ---------------------------------------------------------------------------
// Journal de connexion visible à l'écran.
// Le flux d'authentification peut recharger entièrement la page (redirection),
// ce qui efface toute variable en mémoire. On persiste donc chaque étape dans
// localStorage pour reconstituer la chronologie complète après le retour et
// l'afficher dans l'écran « Nos idées » — beaucoup plus fiable que d'espérer
// qu'une erreur soit levée.
// ---------------------------------------------------------------------------
const LOG_KEY = "fbAuthLog";
function fbLog(msg) {
  try {
    const t = new Date().toTimeString().slice(0, 8);
    const arr = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
    arr.push(`${t}  ${msg}`);
    while (arr.length > 25) arr.shift();
    localStorage.setItem(LOG_KEY, JSON.stringify(arr));
  } catch (_) { /* localStorage indisponible — non bloquant */ }
  window.dispatchEvent(new Event("firebase-log"));
}
window.__fbGetLog = () => {
  try { return JSON.parse(localStorage.getItem(LOG_KEY) || "[]"); } catch (_) { return []; }
};
window.__fbClearLog = () => {
  try { localStorage.removeItem(LOG_KEY); } catch (_) {}
  window.dispatchEvent(new Event("firebase-log"));
};

fbLog("bridge chargé");

// Trace persistante de chaque changement d'état d'authentification, pour voir
// si un utilisateur est bien obtenu puis, éventuellement, perdu.
onAuthStateChanged(auth, (u) => fbLog("état auth : " + (u ? u.email : "aucun (null)")));

enableIndexedDbPersistence(db).catch(() => {
  // Échec attendu si l'app est ouverte dans plusieurs onglets en même temps —
  // non bloquant, la synchronisation continue de fonctionner en ligne.
});

const IDEAS_COLLECTION = "ideas";

// Après un retour de signInWithRedirect, le résultat peut échouer
// silencieusement (domaine bloqué, cookies tiers désactivés, etc.). On capture
// l'erreur ici pour pouvoir l'afficher dans l'écran au lieu de laisser
// l'utilisateur bloqué dans une boucle "se connecter" sans explication.
window.__fbLastAuthError = null;
getRedirectResult(auth)
  .then((result) => {
    fbLog("getRedirectResult : " + (result && result.user ? "OK " + result.user.email : "aucun résultat"));
    if (result && result.user) {
      window.__fbLastAuthError = null;
    }
  })
  .catch((err) => {
    fbLog("getRedirectResult ERREUR : " + (err.code || err.message));
    window.__fbLastAuthError = { code: err.code || "inconnu", message: err.message || String(err), via: "retour-redirection" };
    window.dispatchEvent(new Event("firebase-auth-error"));
  });

// Le popup préserve le geste utilisateur (le clic) tout au long de la
// connexion, contrairement à la redirection qui quitte puis recharge
// entièrement la page — beaucoup plus fiable sur mobile. On ne bascule vers
// signInWithRedirect que si le popup est réellement impossible (bloqué par
// le navigateur ou environnement qui ne le supporte pas).
const REDIRECT_FALLBACK_CODES = new Set([
  "auth/popup-blocked",
  "auth/operation-not-supported-in-this-environment",
]);

window.__fb = {
  signIn: async () => {
    window.__fbLastAuthError = null;
    fbLog("signIn : tentative popup");
    try {
      const cred = await signInWithPopup(auth, provider);
      fbLog("popup OK : " + (cred && cred.user ? cred.user.email : "sans utilisateur ?!"));
    } catch (err) {
      if (REDIRECT_FALLBACK_CODES.has(err.code)) {
        fbLog("popup impossible (" + err.code + ") → redirection");
        try {
          await signInWithRedirect(auth, provider);
        } catch (err2) {
          fbLog("redirection ERREUR : " + (err2.code || err2.message));
          window.__fbLastAuthError = { code: err2.code || "inconnu", message: err2.message || String(err2), via: "redirect" };
          window.dispatchEvent(new Event("firebase-auth-error"));
        }
      } else if (err.code !== "auth/cancelled-popup-request") {
        // On affiche même "popup-closed-by-user", car certains navigateurs
        // mobiles déclenchent ce code à tort (faux positif) quand la page de
        // connexion Google applique des politiques de sécurité qui empêchent
        // Firebase de vérifier correctement l'état du popup.
        fbLog("popup ERREUR : " + (err.code || err.message));
        window.__fbLastAuthError = { code: err.code || "inconnu", message: err.message || String(err), via: "popup" };
        window.dispatchEvent(new Event("firebase-auth-error"));
      } else {
        fbLog("popup annulé (auth/cancelled-popup-request)");
      }
    }
  },
  signOutUser: () => signOut(auth),
  onAuthChange: (cb) => onAuthStateChanged(auth, cb),

  subscribeIdeas: (onData, onError) => {
    const q = query(collection(db, IDEAS_COLLECTION), orderBy("createdAt", "desc"));
    return onSnapshot(
      q,
      (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      onError
    );
  },
  addIdea: (data) =>
    addDoc(collection(db, IDEAS_COLLECTION), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }),
  updateIdea: (id, data) =>
    updateDoc(doc(db, IDEAS_COLLECTION, id), { ...data, updatedAt: serverTimestamp() }),
  deleteIdea: (id) => deleteDoc(doc(db, IDEAS_COLLECTION, id)),
};

window.dispatchEvent(new Event("firebase-ready"));
