// Importa las funciones necesarias del SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase (usa tus propias credenciales)
const firebaseConfig = {
    apiKey: "AIzaSyABcI4TKWl0di5yIsMBsBGIdicaXQ34QVY",
    authDomain: "miejemplo-8b123.firebaseapp.com",
    databaseURL: "https://miejemplo-8b123-default-rtdb.firebaseio.com",
    projectId: "miejemplo-8b123",
    storageBucket: "miejemplo-8b123.firebasestorage.app",
    messagingSenderId: "134125875023",
    appId: "1:134125875023:web:177b004e9751540c519f3a"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
export const db = getFirestore(app);

// Opcional: Inicializa Analytics solo si el entorno lo permite
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    getAnalytics(app);
  }).catch((error) => {
    console.warn("Firebase Analytics no está disponible en este entorno:", error);
  });
}