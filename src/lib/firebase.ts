import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDptErnUWNdT9_AmHyGlOB9tTqVMTHUMsk",
    authDomain: "pet-clinic-db.firebaseapp.com",
    projectId: "pet-clinic-db",
    storageBucket: "pet-clinic-db.appspot.com",
    messagingSenderId: "148814227471",
    appId: "1:148814227471:web:707e299b47ffe16bed9b7a",
    measurementId: "G-7SH80CQWZW",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
