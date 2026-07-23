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
  getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import {
  getFirestore, enableIndexedDbPersistence, collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, query, orderBy, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

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
    if (result && result.user) {
      window.__fbLastAuthError = null;
    }
  })
  .catch((err) => {
    window.__fbLastAuthError = { code: err.code || "inconnu", message: err.message || String(err) };
    window.dispatchEvent(new Event("firebase-auth-error"));
  });

window.__fb = {
  signIn: () => {
    window.__fbLastAuthError = null;
    return signInWithRedirect(auth, provider);
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
