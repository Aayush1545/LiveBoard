import { initializeApp,getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAMyvvbrP_zesKL_vSsL-m62bB9htAGYkY",
    authDomain: "notion-clone-47617.firebaseapp.com",
    projectId: "notion-clone-47617",
    storageBucket: "notion-clone-47617.firebasestorage.app",
    messagingSenderId: "1045867319976",
    appId: "1:1045867319976:web:c6409be31088da74c9289d"
};


const app= getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
